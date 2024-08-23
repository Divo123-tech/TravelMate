// Import necessary modules and functions
import axios from "axios";
import { getAmadeusToken } from "../utils/amadeusKey.js"; // Ensure token management

// Define the Country interface for type safety
export type countryType = {
  name: string;
  iso2: string;
  currency: string;
  capital: string;
  continent: string;
  type: string;
};

// Utility function for paginating arrays
const paginateArray = <T>(array: T[], page: number, pageSize: number): T[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
};

// Function to fetch all countries within a given continent
const getAllCountries = async (
  continent: string,
  page: number = 1,
  searchQuery?: string,
  limit?: number
): Promise<{ total: number; data: countryType[] }> => {
  // Base URL for fetching countries
  let url = `https://restfulcountries.com/api/v1/countries`;

  // Append continent to URL if not fetching all continents
  if (continent !== "all") {
    url += `?continent=${continent}`;
  }

  try {
    // Fetch data from the API
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.COUNTRIES_KEY}`, // Ensure the key is set in the environment
      },
    });

    let countriesArray = data.data;

    // Filter countries if searchQuery is provided
    if (searchQuery) {
      countriesArray = countriesArray.filter((country: any) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Return the paginated result
    return {
      total: countriesArray.length,
      data: paginateArray(countriesArray, page, limit || 20).map(
        (country: any) => ({
          name: country.name,
          iso2: country.iso2,
          currency: country.currency,
          capital: country.capital,
          continent: country.continent,
          type: "countries",
        })
      ),
    };
  } catch (err: any) {
    // Error handling with specific message
    throw new Error("No Countries Found");
  }
};

// Function to fetch country details by name
const getCountryByName = async (name: string): Promise<countryType> => {
  try {
    const url = `https://restfulcountries.com/api/v1/countries/${name}`;

    // Fetch country data by name
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.COUNTRIES_KEY}`,
      },
    });

    const country = data.data;

    // Return the country details
    return {
      name: country.name,
      iso2: country.iso2,
      currency: country.currency,
      capital: country.capital,
      continent: country.continent,
      type: "countries",
    };
  } catch (err) {
    throw new Error("No Country Found"); // Specific error handling
  }
};

// Define the State interface for type safety
export type stateType = {
  name: string;
  code: string;
  countryName: string;
  countryCode: string;
  type: string;
};

// Function to fetch all states within a given country
const getAllStates = async (
  country: string,
  page: number = 1,
  searchQuery?: string
): Promise<{ total: number; data: stateType[] }> => {
  const url = "https://countriesnow.space/api/v0.1/countries/states";

  try {
    // POST request to fetch states
    const response = await axios.post(
      url,
      { country },
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity, // Handle large responses
      }
    );

    let statesArray = response.data.data.states;

    // Filter states if searchQuery is provided
    if (searchQuery) {
      statesArray = statesArray.filter((state: any) =>
        state.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Return the paginated result
    return {
      total: statesArray.length,
      data: paginateArray(statesArray, page, 10).map((state: any) => ({
        name: state.name,
        code: state.state_code,
        countryName: response.data.data.name,
        countryCode: response.data.data.iso2,
        type: "states",
      })),
    };
  } catch (err: any) {
    throw new Error("No States Found"); // Specific error handling
  }
};

// Utility function for binary search (for efficient searching within sorted arrays)
const binarySearch = (arr: any[], target: string): any => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = target.localeCompare(
      arr[mid].name || arr[mid],
      undefined,
      {
        sensitivity: "base", // Locale-sensitive comparison
      }
    );

    if (comparison === 0) {
      return arr[mid]; // Found the target
    } else if (comparison < 0) {
      right = mid - 1; // Target is in the left half
    } else {
      left = mid + 1; // Target is in the right half
    }
  }

  return null; // Target not found
};

// Function to fetch state details by name
const getStateByName = async (
  name: string,
  country: string
): Promise<stateType> => {
  try {
    const url = "https://countriesnow.space/api/v0.1/countries/states";

    // POST request to fetch states
    const response = await axios.post(
      url,
      { country },
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity, // Handle large responses
      }
    );

    // Use binary search to find the state by name
    const state = binarySearch(response.data.data.states, name);
    if (state) {
      return {
        name: state.name,
        code: state.state_code,
        countryName: response.data.data.name,
        countryCode: response.data.data.iso2,
        type: "states",
      };
    } else {
      throw new Error("No State Found");
    }
  } catch (err) {
    throw new Error("No State Found"); // Specific error handling
  }
};

// Define the City interface for type safety
export type cityType = {
  name: string;
  country: string;
  state: string;
  type: string;
};

// Function to fetch all cities within a given state and country
const getAllCities = async (
  state: string,
  country: string,
  page: number = 1,
  searchQuery?: string
): Promise<{ total: number; data: cityType[] }> => {
  const url = "https://countriesnow.space/api/v0.1/countries/state/cities";

  try {
    // POST request to fetch cities
    const { data } = await axios.post(
      url,
      {
        country,
        state,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity, // Handle large responses
      }
    );

    // If data doesn't exist, throw an error
    if (!data.data) {
      throw new Error("Failed to get cities");
    }

    let citiesArray = data.data;

    // Filter cities if searchQuery is provided
    if (searchQuery) {
      citiesArray = citiesArray.filter((city: any) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Return the paginated result
    return {
      total: citiesArray.length,
      data: paginateArray(citiesArray, page, 10).map((city: any) => ({
        name: city,
        country,
        state,
        type: "cities",
      })),
    };
  } catch (err: any) {
    throw new Error("No Cities Found"); // Specific error handling
  }
};

// Function to fetch city details by name
const getCityByName = async (name: string, country: string, state: string) => {
  try {
    const url = "https://countriesnow.space/api/v0.1/countries/state/cities";

    // POST request to fetch cities
    const { data } = await axios.post(
      url,
      {
        country,
        state,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity, // Handle large responses
      }
    );

    let citiesArray = data.data;

    // Use binary search to find the city by name
    const city = binarySearch(citiesArray, name);
    if (city) {
      return {
        name: city,
        state,
        country,
        type: "cities",
      };
    } else {
      throw new Error("No City Found");
    }
  } catch (err: any) {
    throw new Error("No City Found"); // Specific error handling
  }
};

//helper function that gets coordinates of a city from a given country
const getCoords = async (
  city: string,
  country: string
): Promise<{ lat: number; lon: number }> => {
  const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;
  const { data } = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "X-Api-Key": process.env.APININJA_KEY,
    },
  });
  //returns an object {lat: number, lon: number}
  return {
    lat: data[0].latitude,
    lon: data[0].longitude,
  };
};

//create AirportInterface for the output
type airportType = {
  name: string;
  region: string;
  city: string;
  iata: string;
};

//function to get All airports within a given city and country
const getAllAirports = async (
  city: string,
  region: string,
  page: number = 1,
  searchQuery?: string
): Promise<{ total: number; data: airportType[] }> => {
  try {
    let url = `https://api.api-ninjas.com/v1/airports?city=${city}`;
    let response = await axios.get(url, {
      headers: {
        "X-Api-Key": process.env.APININJA_KEY,
      },
    });

    // Filter commercial airports
    let airportsArray = response.data.filter(
      (airport: any) => airport.iata !== ""
    );

    if (airportsArray.length === 0) {
      url = `https://api.api-ninjas.com/v1/airports?region=${region}`;
      response = await axios.get(url, {
        headers: {
          "X-Api-Key": process.env.APININJA_KEY,
        },
      });

      airportsArray = response.data.filter(
        (airport: any) => airport.iata !== ""
      );
    }

    // Apply search query if provided
    if (searchQuery) {
      airportsArray = airportsArray.filter((airport: any) =>
        airport.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (airportsArray.length === 0) {
      throw new Error("No Airports Found");
    }

    // Pagination
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    return {
      total: airportsArray.length,
      data: airportsArray.slice(startIndex, endIndex).map((airport: any) => ({
        name: airport.name,
        iata: airport.iata,
        region,
        city: airport.city,
      })),
    };
    //error handling
  } catch (error: any) {
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
export const convertTime = (timeRaw: string): string => {
  let [hours, minutes] = timeRaw.split(":").map(Number);
  let totalMinutesDep = hours * 60 + minutes;
  return totalMinutesDep.toString();
};

//function that converts a duration into minutes for the flight URL
export const durationToMinutes = (duration: string): number => {
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

//create a flight interface to output
export type flightType = {
  origin: string;
  destination: string;
  departureDate: string;
  adults: number;
  nonstop: boolean;
  currency: string;
  children?: number;
  infants?: number;
  maxPrice?: number;
  travelClass?: string;
  page?: number;
};
//function that gets all flights on various parameters
const getAllFlights = async (
  origin: string,
  destination: string,
  departureDate: string,
  adults: number = 1,
  nonstop: boolean = false,
  currencyCode: string,
  children?: number,
  infants?: number,
  maxPrice?: number,
  travelClass?: string,
  page: number = 1
): Promise<{ total: number; data: flightType[] }> => {
  let url = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonstop}&currencyCode=${currencyCode}`;

  //update the url
  const updatedUrl = populateURLWithOptionalParams(
    [children, infants, maxPrice, travelClass],
    url,
    ["children", "infants", "maxPrice", "travelClass"]
  );

  const { data } = await axios.get(updatedUrl, {
    headers: {
      Authorization: `Bearer ${await getAmadeusToken()}`,
    },
  });
  //if data doesn't exist throw an error
  if (!data.data) {
    throw new Error("failed to get flights");
  }

  const flightsArray = data.data;

  // Calculate the start and end indices for pagination
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  //Map the data of the response to fit the flight interface
  return {
    total: flightsArray.length,
    data: flightsArray.slice(startIndex, endIndex).map((flight: any) => {
      return {
        origin,
        destination,
        duration: flight.itineraries[0].duration
          .substring(2)
          .replace(/H(?!$)/g, "H "),
        stops: flight.itineraries[0].segments.length - 1,
        departureDate: flight.itineraries[0].segments[0].departure.at,
        arrivalDate:
          flight.itineraries[0].segments[
            flight.itineraries[0].segments.length - 1
          ].arrival.at,
        cabin: flight.travelerPricings[0].fareDetailsBySegment[0].cabin,
        url: getFlightURL(flight, children || 0, infants || 0),
        price: Number(flight.price.grandTotal),
        airline:
          data.dictionaries.carriers[
            flight.itineraries[0].segments[0].carrierCode
          ],
        currency: currencyCode,
        type: "flights",
      };
    }),
  };
};

//create a hotel interface to output
export type hotelType = {
  name: string;
  id: string;
  url: string;
  city: string;
  country: string;
  type: string;
};

//function that returns an array of all hotels within a city and country code
const getAllHotels = async (
  city: string,
  country: string,
  page: number = 1,
  searchQuery?: string
): Promise<{ total: number; data: hotelType[] }> => {
  try {
    //use destructuring to get the latitude and longitude from getCoords
    const { lat, lon } = await getCoords(city, country);

    const url = `https://api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=10&radiusUnit=KM&hotelSource=ALL`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await getAmadeusToken()}`,
      },
    });

    let hotelsArray = data.data;

    // Filter and map the data only if searchQuery is provided
    if (searchQuery) {
      hotelsArray = hotelsArray.filter((hotel: any) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    //Map the data of the response to fit the hotel interface
    return {
      total: hotelsArray.length,
      data: hotelsArray.slice(startIndex, endIndex).map((hotel: any) => {
        return {
          name: hotel.name
            .toLowerCase()
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          id: hotel.hotelId,
          url: `https://www.tripadvisor.com/Search?q=${hotel.name.replaceAll(
            " ",
            "+"
          )}`,
          city,
          country,
          type: "hotels",
        };
      }),
    };
  } catch (error: any) {
    throw new Error("No Hotels Found");
  }
};

//create an interface for the attractions output
export type attractionType = {
  name: string;
  id: string;
  address: string;
  city: string;
  country: string;
  url: string;
  type: string;
};

//function that returns an array of attractions from a given city or country
const getAllAttractions = async (
  city: string,
  country: string,
  category: string,
  page: number = 1,
  searchQuery?: string
): Promise<{ total: number; data: attractionType[] }> => {
  try {
    const { lon, lat } = await getCoords(city, country);

    //trip advisor
    const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C${lon}&key=${process.env.TRIPADV_KEY}&category=${category}&language=en`;

    const { data } = await axios.get(url, {
      headers: { accept: "application/json" },
    });

    let attractionsArray = data.data;

    // Filter and map the data only if searchQuery is provided
    if (searchQuery) {
      attractionsArray = attractionsArray.filter((attraction: any) =>
        attraction.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    //Map the data of the response to fit the attraction interface

    return {
      total: attractionsArray.length,
      data: attractionsArray
        .slice(startIndex, endIndex)
        .map((destination: any) => {
          return {
            name: destination.name,
            id: destination.location_id,
            address: destination.address_obj.address_string,
            city,
            country: destination.address_obj.country,
            url: `https://www.tripadvisor.com/Search?q=${destination.name.replaceAll(
              " ",
              "+"
            )}+${city}`,
            type: "activities",
          };
        }),
    };
  } catch (error) {
    throw new Error("No Attractions Found");
  }
};

//create an interface for the videos output
export type videoType = {
  url: string;
  title: string;
  views: string;
  channel: string;
  date: string;
  length: string;
  type: string;
};

//function that returns an array of videos
const getYoutubeVideos = async (
  city: string,
  page: number = 1,
  searchQuery?: string
): Promise<{ total: number; data: videoType[] }> => {
  try {
    const { data } = await axios.get(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=Things to do in ${city}`,
      {
        headers: {
          "x-rapidapi-key": process.env.YT_KEY,
          "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
        },
      }
    );

    let videosArray = data.contents;

    // Filter and map the data only if searchQuery is provided
    if (searchQuery) {
      videosArray = videosArray.filter((video: any) =>
        video.video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    //takes only the first 10 videos and maps the results to fit the video interface
    return {
      total: videosArray.length,
      data: videosArray.slice(startIndex, endIndex).map((video: any) => {
        return {
          url: `https://www.youtube.com/embed/${video.video.videoId}`,
          title: video.video.title,
          channel: video.video.channelName,
          views: video.video.viewCountText,
          date: video.video.publishedTimeText,
          length: video.video.lengthText,
          type: "videos",
        };
      }),
    };
  } catch (err) {
    throw new Error("No Videos Found");
  }
};

//create an interface for the Country Details output
type CountryVisaType = {
  visaStatus: string;
  visaDuration: string;
};

//function that returns details of a country
const getCountryVisa = async (
  countryCodeFrom: string,
  countryCodeTo: string
): Promise<CountryVisaType> => {
  //get the current year
  const visaURL = `https://rough-sun-2523.fly.dev/api/${countryCodeTo}/${countryCodeFrom}`;

  const visaStatus = (await axios.get(visaURL)).data;
  return {
    visaStatus: visaStatus.category,
    visaDuration: visaStatus.dur,
  };
};

// Function to get the exchange rate between two currencies
const getCountryExchangeRate = async (
  currencyFrom: string,
  currencyTo: string
) => {
  // Construct the URL to fetch the exchange rate data
  const excRateURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyFrom.toLowerCase()}.json`;

  try {
    // Fetch the exchange rate data from the API
    const exchangeRate = (await axios.get(excRateURL)).data;

    // Return the exchange rate from currencyFrom to currencyTo
    return exchangeRate[currencyFrom.toLowerCase()][currencyTo.toLowerCase()];
  } catch (err) {
    // Handle errors by throwing a specific error message
    throw new Error("Failed to get exchange rate details");
  }
};

// Define a type for timezone information
type timeZoneType = {
  date: string;
  time: string;
  timeZone: string;
};

// Function to get the current time and timezone of a location
const getLocationTime = async (
  city: string,
  country: string
): Promise<timeZoneType> => {
  // Get the coordinates (latitude and longitude) of the city
  const { lat, lon } = await getCoords(city, country);

  // Fetch the current time and timezone based on the coordinates
  const response = await axios.get(
    `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`
  );

  // Return the current date, time, and timezone
  return {
    date: response.data.date,
    time: response.data.time,
    timeZone: response.data.timeZone,
  };
};

export default {
  getAllCountries,
  getCountryByName,
  getAllStates,
  getStateByName,
  getAllCities,
  getCityByName,
  getCoords,
  getAllAirports,
  getAllFlights,
  getAllHotels,
  getAllAttractions,
  getYoutubeVideos,
  getCountryVisa,
  getCountryExchangeRate,
  getLocationTime,
};
