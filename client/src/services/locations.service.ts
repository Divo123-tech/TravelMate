const ServerAPI = "/api"; // Base URL for the server API
import axios from "axios";
import { timeZoneType } from "../types/types"; // Importing types for type safety
import { cachedApiCall } from "../utils/apiCache"; // Utility function for caching API responses

/**
 * Retrieves all countries based on continent, pagination, search query, and limit.
 * @param continent - The continent to filter countries by.
 * @param page - The page number for pagination.
 * @param searchQuery - The query to search countries by.
 * @param limit - The maximum number of countries to return.
 * @returns The list of countries or null if the operation fails.
 */
export const getAllCountries = async (
  continent: string,
  page?: number,
  searchQuery?: string,
  limit?: number
) => {
  // Create a cache key based on parameters
  const cacheKey = `countries_${continent}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/countries/${continent}?`; // Base URL for fetching countries

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return {
        total: 0,
        data: [],
      };
    }
  });
};

/**
 * Retrieves a country by its name.
 * @param countryName - The name of the country to retrieve.
 * @returns The country data or null if the operation fails.
 */
export const getCountryByName = (countryName: string) => {
  // Create a cache key specific to the country name
  const cacheKey = `country_${countryName}`;
  const url = `${ServerAPI}/locations/country/${countryName}`; // URL to fetch a specific country

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return null; // Return null if an error occurs
    }
  });
};

/**
 * Retrieves visa information between two countries.
 * @param countryCodeFrom - The code of the country the visa is from.
 * @param countryCodeTo - The code of the country the visa is for.
 * @returns The visa information or null if the operation fails.
 */
export const getCountryVisa = async (
  countryCodeFrom: string,
  countryCodeTo: string
) => {
  const url = `${ServerAPI}/locations/visa/${countryCodeFrom}/${countryCodeTo}`; // URL for visa information

  // Create a cache key specific to the visa information
  return cachedApiCall(`visa_${countryCodeFrom}_${countryCodeTo}`, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return null; // Return null if an error occurs
    }
  });
};

/**
 * Retrieves the exchange rate between two currencies.
 * @param currencyFrom - The currency to convert from.
 * @param currencyTo - The currency to convert to.
 * @returns The exchange rate or null if the operation fails.
 */
export const getCountryExchange = async (
  currencyFrom: string,
  currencyTo: string
) => {
  const url = `${ServerAPI}/locations/exchange/${currencyFrom}/${currencyTo}`; // URL for exchange rate information

  // Create a cache key specific to the exchange rate
  return cachedApiCall(`exchange_${currencyFrom}_${currencyTo}`, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return null; // Return null if an error occurs
    }
  });
};

export type stateType = {
  name: string; // Name of the state
  code: string; // Code of the state (e.g., abbreviation)
  countryName: string; // Name of the country the state belongs to
  countryCode: string; // Code of the country (e.g., ISO code)
};

/**
 * Retrieves all states in a country with pagination and search query.
 * @param country - The country to filter states by.
 * @param page - The page number for pagination.
 * @param searchQuery - The query to search states by.
 * @param limit - The maximum number of states to return.
 * @returns The list of states or null if the operation fails.
 */
export const getAllStates = async (
  country: string,
  page?: number,
  searchQuery?: string,
  limit?: number
) => {
  // Create a cache key based on parameters
  const cacheKey = `states_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/states/${country}?`; // Base URL for fetching states

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return {
        total: 0,
        data: [],
      };
    }
  });
};

/**
 * Retrieves a state by its name and country.
 * @param name - The name of the state to retrieve.
 * @param country - The country the state belongs to.
 * @returns The state data or null if the operation fails.
 */
export const getStateByName = (name: string, country: string) => {
  // Create a cache key specific to the state and country
  const cacheKey = `state_${country}_${name}`;
  const url = `${ServerAPI}/locations/state/${country}/${name}`; // URL to fetch a specific state

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return null; // Return null if an error occurs
    }
  });
};

export type cityType = {
  name: string; // Name of the city
  country: string; // Country where the city is located
  state: string; // State where the city is located
};

/**
 * Retrieves all cities in a state and country with pagination and search query.
 * @param state - The state to filter cities by.
 * @param country - The country to filter cities by.
 * @param page - The page number for pagination.
 * @param searchQuery - The query to search cities by.
 * @param limit - The maximum number of cities to return.
 * @returns The list of cities or null if the operation fails.
 */
export const getAllCities = async (
  state: string,
  country: string,
  page?: number,
  searchQuery?: string,
  limit?: number
) => {
  // Create a cache key based on parameters
  const cacheKey = `cities_${state}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/cities/${state}/${country}?`; // Base URL for fetching cities

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return {
        total: 0,
        data: [],
      };
    }
  });
};

/**
 * Retrieves a city by its name, state, and country.
 * @param name - The name of the city to retrieve.
 * @param country - The country where the city is located.
 * @param state - The state where the city is located.
 * @returns The city data or null if the operation fails.
 */
export const getCityByName = (name: string, country: string, state: string) => {
  // Create a cache key specific to the city, state, and country
  const cacheKey = `city_${country}_${state}_${name}`;
  const url = `${ServerAPI}/locations/city/${country}/${state}/${name}`; // URL to fetch a specific city

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return null; // Return null if an error occurs
    }
  });
};

/**
 * Retrieves the time zone information for a city and country.
 * @param city - The city to retrieve time zone information for.
 * @param country - The country where the city is located.
 * @returns The time zone information or null if the operation fails.
 */
export const getLocationTime = async (
  city: string,
  country: string
): Promise<timeZoneType> => {
  const url = `${ServerAPI}/locations/time/${city}/${country}`; // URL for fetching time zone information

  // Fetch data from the API
  const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
  return data; // Return the time zone information
};

/**
 * Retrieves all hotels in a city and country with pagination and search query.
 * @param city - The city to filter hotels by.
 * @param country - The country to filter hotels by.
 * @param page - The page number for pagination.
 * @param searchQuery - The query to search hotels by.
 * @returns The list of hotels or null if the operation fails.
 */
export const getAllHotels = async (
  city: string,
  country: string,
  page?: number,
  searchQuery?: string
) => {
  // Create a cache key based on parameters
  const cacheKey = `hotels_${city}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/hotels/${city}/${country}?`; // Base URL for fetching hotels

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      // Log any errors that occur during the API call
      console.error(`Error fetching hotels from ${url}:`, err);
      return null; // Return null if an error occurs
    }
  });
};

/**
 * Retrieves all airports in a city and country with pagination and search query.
 * @param city - The city to filter airports by.
 * @param country - The country to filter airports by.
 * @param page - The page number for pagination (optional).
 * @param searchQuery - The query to search airports by (optional).
 * @returns The list of airports or null if the operation fails.
 */
export const getAllAirports = async (
  city: string,
  country: string,
  page?: number,
  searchQuery?: string
) => {
  // Create a cache key based on parameters
  const cacheKey = `airports_${city}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/airports/${city}/${country}?`; // Base URL for fetching airports

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return {
        total: 0,
        data: [],
      };
    }
  });
};

/**
 * Retrieves all attractions in a city and country with pagination and search query.
 * @param city - The city to filter attractions by.
 * @param country - The country to filter attractions by.
 * @param category - The category of attractions to retrieve.
 * @param page - The page number for pagination (optional).
 * @param searchQuery - The query to search attractions by (optional).
 * @returns The list of attractions or null if the operation fails.
 */
export const getAllAttractions = (
  city: string,
  country: string,
  category: string,
  page?: number,
  searchQuery?: string
) => {
  // Create a cache key based on parameters
  const cacheKey = `${category}_${city}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/attractions/${city}/${country}?category=${category}&`; // Base URL for fetching attractions

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return {
        total: 0,
        data: [],
      };
    }
  });
};

/**
 * Retrieves all videos related to a city with pagination and search query.
 * @param city - The city to filter videos by.
 * @param page - The page number for pagination (optional).
 * @param searchQuery - The query to search videos by (optional).
 * @returns The list of videos or null if the operation fails.
 */
export const getAllVideos = (
  city: string,
  page?: number,
  searchQuery?: string
) => {
  // Create a cache key based on parameters
  const cacheKey = `videos_${city}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/videos/${city}?`; // Base URL for fetching videos

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return {
        total: 0,
        data: [],
      };
    }
  });
};

/**
 * Retrieves flight information based on various parameters.
 * @param origin - The starting location for flights.
 * @param destination - The destination location for flights.
 * @param departureDate - The date of departure.
 * @param adults - The number of adults traveling.
 * @param nonstop - Whether or not the flight should be nonstop.
 * @param children - The number of children traveling.
 * @param travelClass - The class of travel (e.g., economy, business).
 * @param currency - The currency for the flight prices.
 * @param maxPrice - The maximum price for the flights.
 * @param page - The page number for pagination (optional).
 * @returns The list of flights or null if the operation fails.
 */
export const getAllFlights = async (
  origin: string,
  destination: string,
  departureDate: string,
  adults: number,
  nonstop: boolean,
  children: number,
  travelClass: string,
  currency: string,
  maxPrice: number,
  page?: number
) => {
  // Create a cache key based on parameters
  const cacheKey = `flights_${origin}_${destination}_${departureDate}_${adults}_${nonstop}_${children}_${travelClass}__${currency}_${maxPrice}_${page}`;
  let url = `${ServerAPI}/locations/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&nonstop=${nonstop}&children=${children}&travelClass=${travelClass}&currency=${currency}&maxPrice=${maxPrice}&`; // Base URL for fetching flights

  // Append query parameters if provided
  if (page) {
    url += `page=${page}&`;
  }

  // Fetch data from the API with caching and error handling
  return cachedApiCall(cacheKey, async () => {
    try {
      const { data } = await axios.get(url, { withCredentials: true }); // Send a GET request with credentials
      return data; // Return the response data
    } catch (err: any) {
      return {
        total: 0,
        data: [],
      };
    }
  });
};
