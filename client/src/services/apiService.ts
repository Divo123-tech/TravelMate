const ServerAPI = "http://localhost:3000";
import axios from "axios";
import { PassportType, TripType, UserType } from "../types/types";

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
  const { data } = await axios.get(url, { withCredentials: true });
  return data;
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
  const { data } = await axios.get(url, { withCredentials: true });
  return data;
};
