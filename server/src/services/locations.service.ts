import axios from "axios";

const countriesTOKEN = "884|oAmLCk0nENRVkaWHi4XlQ0y7joyW0BHhSZW28vh0";
const AmadeusToken = "fxjsxE2r7QaM4TGOruFIvIJPf9Bv";
export interface CountriesInterface {
  name: string;
  iso2: string;
  flag: string;
}

const getAllCountries = async (
  continent: string,
  page: string
): Promise<CountriesInterface[]> => {
  const url = `https://restfulcountries.com/api/v1/countries?continent=${continent}&per_page=15&page=${page}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + countriesTOKEN,
      },
    });

    if (!response.data.data) {
      throw new Error("failed to get countries");
    }

    return response.data.data.map((country: any) => {
      return {
        name: country.name,
        iso2: country.iso2,
        flag: country.href.flag,
      };
    });
  } catch (err: any) {
    throw new Error("No Countries Found");
  }
};

const getAllStates = async (country: string): Promise<string[]> => {
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
    return response.data.data.states.map((state: any) => {
      return state.name;
    });
  } catch (err: any) {
    throw new Error("No States Found");
  }
};

const getAllCities = async (
  state: string,
  country: string
): Promise<string[]> => {
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
    return response.data.data;
  } catch (err: any) {
    throw new Error("No Cities Found");
  }
};

const getCoords = async (city: string, countryCode: string) => {
  const API_KEY = "DAHOjQWWz9QXdO7GC5H1F0qT7UEJVvH8";
  const url = `https://api.tomtom.com/search/2/structuredGeocode.json?key=${API_KEY}&municipality=${city}&countryCode=${countryCode}`;
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return response.data.results[0].position;
};

const getAllAirports = async (city: string, countryCode: string) => {
  const apiKey = "jcrhq4rQeiVW0U+R+Whmog==YKWRBGrFM7D1QC4b";
  const url = `https://api.api-ninjas.com/v1/airports?city=${city}&country=${countryCode}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    const airportsData = response.data.filter((airport: any) => {
      return airport.iata != "";
    });
    if (airportsData.length == 0) throw new Error("No Airports found");
    return airportsData.map((airport: any) => {
      return {
        name: airport.name,
        iata: airport.iata,
      };
    });
  } catch (err: any) {
    throw new Error("No Airports Found");
  }
};

type travelClassType = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
export interface FlightInterface {
  origin: string;
  destination: string;
  departureDate: string;
  adults: number;
  nonstop: boolean;
  children?: number;
  infants?: number;
  maxPrice?: number;
  travelClass?: travelClassType;
}

const populateURLWithOptionalParams = (
  params: any[],
  url: string,
  paramNames: string[]
): string => {
  for (let i = 0; i < params.length; i++) {
    params[i] ? (url += `&${paramNames[i]}=${params[i]}`) : "";
  }
  return url;
};

const convertTime = (depTimeRaw: string) => {
  let [hours, minutes] = depTimeRaw.split(":").map(Number);
  let totalMinutesDep = hours * 60 + minutes;
  let timeCut = 400;
  totalMinutesDep -= timeCut;
  let h = Math.floor(totalMinutesDep / 60);
  let m = totalMinutesDep % 60;
  let depTimeConverted = h.toString() + m.toString();
  return depTimeConverted;
};

const durationToMinutes = (duration: string): number => {
  // Use a regular expression to extract hours and minutes
  let match = duration.match(/PT(\d+H)?(\d+M)?/);

  if (match) {
    // Extract hours and minutes, defaulting to 0 if they are not present
    let hours = match[1] ? parseInt(match[1].replace("H", ""), 10) : 0;
    let minutes = match[2] ? parseInt(match[2].replace("M", ""), 10) : 0;

    // Calculate total minutes
    return hours * 60 + minutes;
  } else {
    throw new Error("Invalid duration format");
  }
};

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
) => {
  let url = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonstop}&currencyCode=SGD`;

  const updatedUrl = populateURLWithOptionalParams(
    [children, infants, maxPrice, travelClass],
    url,
    ["children", "infants", "maxPrice", "travelClass"]
  );

  try {
    const response = await axios.get(updatedUrl, {
      headers: {
        Authorization: `Bearer ${AmadeusToken}`,
      },
    });
    const data = response.data.data;
    return data.map((flight: any) => {
      return {
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

const getAllHotels = async (
  city: string,
  countryCode: string
): Promise<{
  name: string;
  id: string;
  url: string;
}> => {
  const { lat, lon } = await getCoords(city, countryCode);

  const url = `https://api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=10&radiusUnit=KM&hotelSource=ALL`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AmadeusToken}`,
      },
    });
    return response.data.data.map((hotel: any) => {
      return {
        name: hotel.name,
        id: hotel.hotelId,
        url: `https://www.tripadvisor.com/Search?q=${hotel.name.replaceAll(
          " ",
          "+"
        )}`,
      };
    });
  } catch (err: any) {
    throw new Error(err);
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
};
