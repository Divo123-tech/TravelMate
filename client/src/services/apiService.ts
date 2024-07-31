const ServerAPI = "http://localhost:3000";
import axios from "axios";
import { PassportType, TripType, UserType, timeZoneType } from "../types/types";
import { cachedApiCall } from "../utils/apiCache";
export const googleAuthenticate = () => {
  window.open(`http://localhost:3000/auth/google/`, "_self");
};

export const logOutAPI = async () => {
  try {
    await axios.post("http://localhost:3000/auth/google/logout", {
      withCredentials: true,
    });
  } catch (error) {
    return;
  }
};
export const editUserDetails = async (
  googleId: string,
  name: string,
  passport: PassportType,
  currencyUsed: string
): Promise<UserType> => {
  const url = ServerAPI + "/users/details";
  const body = {
    googleId,
    name,
    passport,
    currencyUsed,
  };
  try {
    const response = await axios.put(url, body, { withCredentials: true });
    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getUserDetails = async (): Promise<UserType> => {
  try {
    const url = `${ServerAPI}/users/current`;
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteTrip = async (
  userId: string,
  tripId: string
): Promise<TripType> => {
  try {
    const url = `${ServerAPI}/users/${userId}/trips/${tripId}`;
    const { data } = await axios.delete(url, { withCredentials: true });
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getTripDetails = async (userId: string, tripId: string) => {
  try {
    const url = `${ServerAPI}/users/${userId}/trips/${tripId}`;
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const createNewTrip = async (
  name: string,
  startDate: string,
  endDate: string,
  userId: string
) => {
  try {
    const url = `${ServerAPI}/users/${userId}/trips`;
    console.log(startDate);
    const body = {
      name,
      startDate,
      endDate,
    };
    const { data } = await axios.post(url, body, { withCredentials: true });
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

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
    console.log(data);
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
  console.log(url);
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    console.log(data);
    return data;
  });
};

export const getAllRestaurants = (
  city: string,
  country: string,
  page?: number,
  searchQuery?: string
) => {
  const cacheKey = `restaurants_${city}_${country}_${page}_${searchQuery}`;
  let url = `${ServerAPI}/locations/attractions/${city}/${country}?category=restaurants&`;
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

export const getAllVideos = (
  city: string,
  page?: number,
  searchQuery?: string
) => {
  const cacheKey = `videos_${city}_${page}_${searchQuery}`;
  console.log(city);
  let url = `${ServerAPI}/locations/videos/${city}?`;
  if (page) {
    url += `page=${page}&`;
  }
  if (searchQuery) {
    url += `searchQuery=${searchQuery}&`;
  }
  console.log(url);
  return cachedApiCall(cacheKey, async () => {
    const { data } = await axios.get(url, { withCredentials: true });
    console.log(data);
    return data;
  });
};

const getAllFlights = async (
  origin: string,
  destination: string,
  departureDate: string,
  adults: number,
  nonstop: boolean,
  children: number,
  travelClass: string
) => {
  let url = `${ServerAPI}/locations/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&nonstop=${nonstop}&children=${children}&travelClass=${travelClass}`;
};