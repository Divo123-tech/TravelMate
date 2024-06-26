//import axios
import axios from "axios";
//import getAmadeusToken as it refreshes every 30 minutes
import { getAmadeusToken } from "../utils/amadeusKey.js";

//create an interface for the Counrties Interface
export type countryType = {
  name: string;
  iso2: string;
  flag: string;
  currency: string;
};

//function that returns an array of countries within a given continent
const getAllCountries = async (continent: string): Promise<countryType[]> => {
  const url = `https://restfulcountries.com/api/v1/countries?continent=${continent}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.COUNTRIES_KEY}`,
      },
    });

    //if data doesn't exist throw an error
    if (!response.data.data) {
      throw new Error("failed to get countries");
    }
    //Map the data of the response to fit the country interface
    return response.data.data.map((country: any) => {
      return {
        name: country.name,
        iso2: country.iso2,
        flag: country.href.flag,
        currency: country.currency,
      };
    });
    //error handling
  } catch (err: any) {
    throw new Error("No Countries Found");
  }
};

export type stateType = {
  name: string;
  code: string;
  countryName: string;
  countryCode: string;
};

//function to get all states within a given country
const getAllStates = async (country: string): Promise<stateType[]> => {
  const url = "https://countriesnow.space/api/v0.1/countries/states";
  try {
    const response = await axios.post(
      url,
      { country },
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    );
    //if data doesn't exist throw an error
    if (!response.data.data) {
      throw new Error("failed to get states");
    }
    //Map the data of the response to return just the name
    return response.data.data.states.map((state: any) => {
      return {
        name: state.name,
        code: state.state_code,
        countryName: response.data.name,
        countryCode: response.data.iso3,
      };
    });
    //error handling
  } catch (err: any) {
    throw new Error("No States Found");
  }
};

export type cityType = {
  name: string;
  country: string;
  state: string;
};

//function to get all the cities within a given state and country
const getAllCities = async (
  state: string,
  country: string
): Promise<cityType[]> => {
  const url = "https://countriesnow.space/api/v0.1/countries/state/cities";
  try {
    const response = await axios.post(
      url,
      {
        country,
        state,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    );
    //if data doesn't exist throw an error
    if (!response.data.data) {
      throw new Error("failed to get states");
    }

    return response.data.data.map((city: any) => {
      return {
        name: city,
        country,
        state,
      };
    });
    //error handling
  } catch (err: any) {
    throw new Error("No Cities Found");
  }
};

//helper function that gets coordinates of a city from a given country
const getCoords = async (
  city: string,
  countryCode: string
): Promise<{ lat: number; lon: number }> => {
  const url = `https://api.tomtom.com/search/2/structuredGeocode.json?key=${process.env.TOMTOM_KEY}&municipality=${city}&countryCode=${countryCode}`;
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
    },
  });
  //returns an object {lat: number, lon: number}
  return response.data.results[0].position;
};

//create AirportInterface for the output
type airportType = {
  name: string;
  city: string;
  countryCode: string;
  iata: string;
};

//function to get All airports within a given city and country
const getAllAirports = async (
  city: string,
  countryCode: string
): Promise<airportType[]> => {
  const url = `https://api.api-ninjas.com/v1/airports?city=${city}&country=${countryCode}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "X-Api-Key": process.env.APININJA_KEY,
      },
    });
    //if data doesn't exist throw an error
    if (!response.data) {
      throw new Error("failed to get airports");
    }

    //filter the airports that are actually commercial and not air bases
    const airportsData = response.data.filter((airport: any) => {
      return airport.iata != "";
    });
    //if data doesn't exist throw an error
    if (airportsData.length == 0) throw new Error("No Airports found");
    //Map the data of the response to fit the airport interface
    console.log(airportsData);
    return airportsData.map((airport: any) => {
      return {
        name: airport.name,
        iata: airport.iata,
        city,
        countryCode,
      };
    });
    //error handling
  } catch (err: any) {
    throw new Error("No Airports Found");
  }
};

//helper function for the flights function that populates the URL with the optional query parameters
const populateURLWithOptionalParams = (
  params: any[],
  url: string,
  paramNames: string[]
): string => {
  //iterate through the params array
  for (let i = 0; i < params.length; i++) {
    //if the paramete exists add it to the url
    params[i] ? (url += `&${paramNames[i]}=${params[i]}`) : "";
  }
  return url;
};

//helper function that converts raw time of the flight to a url friendly time string
const convertTime = (timeRaw: string): string => {
  let [hours, minutes] = timeRaw.split(":").map(Number);
  let totalMinutesDep = hours * 60 + minutes;
  return totalMinutesDep.toString();
};

//function that converts a duration into minutes for the flight URL
const durationToMinutes = (duration: string): number => {
  // Use a regular expression to extract hours and minutes
  let match = duration.match(/PT(\d+H)?(\d+M)?/);

  if (match) {
    // Extract hours and minutes, defaulting to 0 if they are not present
    let hours = match[1] ? parseInt(match[1].replace("H", ""), 10) : 0;
    let minutes = match[2] ? parseInt(match[2].replace("M", ""), 10) : 0;

    // Calculate total minutes
    return hours * 60 + minutes;
    //error handling
  } else {
    throw new Error("Invalid duration format");
  }
};

//create the flight url that will redirect to the skyscanner site
const getFlightURL = (
  flight: any,
  children: number,
  infants: number
): string => {
  const departureInfo = flight.itineraries[0].segments[0].departure;
  const depIata = flight.itineraries[0].segments[0].departure.iataCode;
  const numOfSegments = flight.itineraries[0].segments.length - 1;
  const arrivalInfo = flight.itineraries[0].segments[numOfSegments].arrival;
  const arrIata = arrivalInfo.iataCode;
  const dateformatted = departureInfo.at.substring(2, 10).split("-").join("");
  const depTime = convertTime(departureInfo.at.substring(11, 16));
  const arrTime = convertTime(arrivalInfo.at.substring(11, 16));
  const cabin = flight.travelerPricings[0].fareDetailsBySegment[0].cabin;
  const duration = durationToMinutes(flight.itineraries[0].duration);
  let finalUrl = `https://www.skyscanner.com/transport/flights/${depIata}/${arrIata}/${dateformatted}/?adultsv2=1&cabinclass=${cabin}&departure-times=${depTime}-${arrTime}&duration=${duration}&childrenv2=`;
  //iterate through the parameters and populate the url accordingly
  for (let i = 0; i < children; i++) {
    if (i == 0) {
      finalUrl += "8";
    } else {
      finalUrl += "%7C" + 8;
    }
  }
  for (let i = 0; i < infants; i++) {
    finalUrl += "%7C" + 1;
  }
  return finalUrl;
};

//initialize the travelClassType which can only be 4 strings
type travelClassType = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

//create a flight interface to output
export type flightType = {
  origin: string;
  destination: string;
  duration: string;
  stops: string;
  departureDate: string;
  arrivalDate: string;
  cabin: string;
  url: string;
};
//function that gets all flights on various parameters
const getAllFlights = async (
  origin: string,
  destination: string,
  departureDate: string,
  adults: number = 1,
  nonstop: boolean = false,
  children?: number,
  infants?: number,
  maxPrice?: number,
  travelClass?: travelClassType
): Promise<flightType[]> => {
  let url = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonstop}&currencyCode=SGD`;

  //update the url
  const updatedUrl = populateURLWithOptionalParams(
    [children, infants, maxPrice, travelClass],
    url,
    ["children", "infants", "maxPrice", "travelClass"]
  );

  try {
    const response = await axios.get(updatedUrl, {
      headers: {
        Authorization: `Bearer ${await getAmadeusToken()}`,
      },
    });
    //if data doesn't exist throw an error
    if (!response.data.data) {
      throw new Error("failed to get flights");
    }
    //Map the data of the response to fit the flight interface
    return response.data.data.map((flight: any) => {
      return {
        origin,
        destination,
        duration: flight.itineraries[0].duration.substring(2),
        stops: flight.itineraries[0].segments.length - 1,
        departureDate: flight.itineraries[0].segments[0].departure.at,
        arrivalDate:
          flight.itineraries[0].segments[
            flight.itineraries[0].segments.length - 1
          ].arrival.at,
        cabin: flight.travelerPricings[0].fareDetailsBySegment[0].cabin,
        url: getFlightURL(flight, children || 0, infants || 0),
      };
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

//create a hotel interface to output
export type hotelType = {
  name: string;
  id: string;
  url: string;
  city: string;
  countryCode: string;
};

//function that returns an array of all hotels within a city and country code
const getAllHotels = async (
  city: string,
  countryCode: string
): Promise<hotelType[]> => {
  //use destructuring to get the latitude and longitude from getCoords
  const { lat, lon } = await getCoords(city, countryCode);

  const url = `https://api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=10&radiusUnit=KM&hotelSource=ALL`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await getAmadeusToken()}`,
      },
    });

    //if data doesn't exist throw an error
    if (!response.data.data) {
      throw new Error("failed to get hotels");
    }

    //Map the data of the response to fit the hotel interface
    return response.data.data.map((hotel: any) => {
      return {
        name: hotel.name,
        id: hotel.hotelId,
        url: `https://www.tripadvisor.com/Search?q=${hotel.name.replaceAll(
          " ",
          "+"
        )}`,
        city,
        countryCode,
      };
    });
    //error handling
  } catch (err: any) {
    throw new Error(err);
  }
};

//create an interface for the attractions output
export type attractionType = {
  name: string;
  id: string;
  address: string;
  city: string;
  countryCode: string;
  country: string;
  url: string;
};

//function that returns an array of attractions from a given city or country
const getAllAttractions = async (
  city: string,
  countryCode: string,
  category: string
): Promise<attractionType[]> => {
  try {
    const { lon, lat } = await getCoords(city, countryCode);

    //trip advisor
    const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C${lon}&key=${process.env.TRIPADV_KEY}&category=${category}&language=en`;

    const response = await axios.get(url, {
      headers: { accept: "application/json" },
    });

    //if data doesn't exist throw an error
    if (!response.data.data) {
      throw new Error("failed to get attractions");
    }

    //Map the data of the response to fit the attraction interface

    return response.data.data.map((destination: any) => {
      return {
        name: destination.name,
        id: destination.location_id,
        address: destination.address_obj.address_string,
        city,
        countryCode,
        country: destination.address_obj.country,
        url: `https://www.tripadvisor.com/Search?q=${destination.name.replaceAll(
          " ",
          "+"
        )}+${city}`,
      };
    });
    //error handling
  } catch (err: any) {
    throw new Error(err);
  }
};

//create an interface for the videos output
type videoType = {
  url: string;
  title: string;
  views: string;
};

//function that returns an array of videos
const getYoutubeVideos = async (city: string): Promise<videoType[]> => {
  try {
    const response = await axios.get(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=Things to do in ${city}`,
      {
        headers: {
          "x-rapidapi-key": process.env.YT_KEY,
          "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
        },
      }
    );
    //if data doesn't exist throw an error
    if (!response.data.contents) {
      throw new Error("failed to get videos");
    }
    //takes only the first 10 videos and maps the results to fit the video interface
    return response.data.contents.slice(0, 10).map((video: any) => {
      return {
        url: `https://www.youtube.com/embed/${video.video.videoId}`,
        title: video.video.title,
        views: video.video.viewCountText,
      };
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

//create an interface for the Country Details output
interface CountryDetailsInterface {
  visaStatus: string;
  visaDuration: string;
  conversionRate: number;
  holidays: [{ date: string; name: string }];
}

//function that returns details of a country
const getCountryDetails = async (
  countryCodeFrom: string,
  countryCodeTo: string,
  currencyFrom: string,
  currencyTo: string
): Promise<CountryDetailsInterface> => {
  //get the current year
  const currentYear = new Date().getFullYear();
  const holidayURL = `https://date.nager.at/api/v3/publicholidays/${currentYear}/${countryCodeTo}`;
  const visaURL = `https://rough-sun-2523.fly.dev/api/${countryCodeFrom}/${countryCodeTo}`;
  const excRateURL = `https://v6.exchangerate-api.com/v6/${process.env.EXCRATE_KEY}/pair/${currencyFrom}/${currencyTo}`;
  try {
    const publicholidays = (await axios.get(holidayURL)).data.slice(0, 5);
    const visaStatus = (await axios.get(visaURL)).data;
    const exchangeRate = (await axios.get(excRateURL)).data;
    return {
      visaStatus: visaStatus.category,
      visaDuration: visaStatus.dur,
      conversionRate: exchangeRate.conversion_rate,
      holidays: publicholidays.map((holiday: any) => {
        return {
          date: holiday.date,
          name: `${holiday.localName} | ${holiday.name}`,
        };
      }),
    };
  } catch (err) {
    throw new Error("failed to get details");
  }
};

export default {
  getAllCountries,
  getAllStates,
  getAllCities,
  getCoords,
  getAllAirports,
  getAllFlights,
  getAllHotels,
  getAllAttractions,
  getYoutubeVideos,
  getCountryDetails,
};
