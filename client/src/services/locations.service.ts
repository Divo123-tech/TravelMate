const ServerAPI = "http://localhost:3000";
import axios from "axios";
import { timeZoneType } from "../types/types";
import { cachedApiCall } from "../utils/apiCache";
export const getAllCountries = async (
  continent: string,
  page?: number,
  searchQuery?: string,
  limit?: number
) => {
  const cacheKey = `countries_${continent}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/countries/${continent}?`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export const getCountryByName = (countryName: string) => {
  try {
    const cacheKey = `country_${countryName}`;
    const url = `${ServerAPI}/locations/country/${countryName}`;
    return cachedApiCall(cacheKey, async () => {
      const { data } = await axios.get(url, { withCredentials: true });
      return data;
    });
  } catch (err: any) {
    return null;
  }
};

export const getCountryVisa = async (
  countryCodeFrom: string,
  countryCodeTo: string
) => {
  const url = `${ServerAPI}/locations/visa/${countryCodeFrom}/${countryCodeTo}`;
  const { data } = await axios.get(url, { withCredentials: true });
  return data;
};

export const getCountryExchange = async (
  currencyFrom: string,
  currencyTo: string
) => {
  const url = `${ServerAPI}/locations/exchange/${currencyFrom}/${currencyTo}`;
  const { data } = await axios.get(url, { withCredentials: true });
  return data;
};
export type stateType = {
  name: string;
  code: string;
  countryName: string;
  countryCode: string;
};
export const getAllStates = async (
  country: string,
  page?: number,
  searchQuery?: string,
  limit?: number
) => {
  const cacheKey = `states_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/states/${country}?`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export const getStateByName = (name: string, country: string) => {
  const cacheKey = `state_${country}_${name}`;
  const url = `${ServerAPI}/locations/state/${country}/${name}`;
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export type cityType = {
  name: string;
  country: string;
  state: string;
};

export const getAllCities = async (
  state: string,
  country: string,
  page?: number,
  searchQuery?: string,
  limit?: number
) => {
  const cacheKey = `cities_${state}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/cities/${state}/${country}?`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export const getCityByName = (name: string, country: string, state: string) => {
  const cacheKey = `city_${country}_${state}_${name}`;
  const url = `${ServerAPI}/locations/city/${country}/${state}/${name}`;
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export const getLocationTime = async (
  city: string,
  country: string
): Promise<timeZoneType> => {
  const url = `${ServerAPI}/locations/time/${city}/${country}`;
  const { data } = await axios.get(url, { withCredentials: true });
  return data;
};

export const getAllHotels = async (
  city: string,
  country: string,
  page?: number,
  searchQuery?: string
) => {
  const cacheKey = `hotels_${city}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/hotels/${city}/${country}?`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export const getAllAirports = async (
  city: string,
  country: string,
  page?: number,
  searchQuery?: string
) => {
  const cacheKey = `airports_${city}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/airports/${city}/${country}?`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export const getAllAttractions = (
  city: string,
  country: string,
  category: string,
  page?: number,
  searchQuery?: string
) => {
  const cacheKey = `${category}_${city}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/attractions/${city}/${country}?category=${category}&`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};

export const getAllVideos = (
  city: string,
  page?: number,
  searchQuery?: string
) => {
  const cacheKey = `videos_${city}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/videos/${city}?`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    console.log(data);
    return data;
  });
};

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
  let url = `${ServerAPI}/locations/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&nonstop=${nonstop}&children=${children}&travelClass=${travelClass}&currency=${currency}&maxPrice=${maxPrice}&`;
  const cacheKey = `flights_${origin}_${destination}_${departureDate}_${adults}_${nonstop}_${children}_${travelClass}__${currency}_${maxPrice}_${page}`;
  if (page) {
    url += `page=${page}&`;
  }
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  });
};
