const ServerAPI = "http://localhost:3000/";
import axios from "axios";
import { PassportType, UserType } from "../types/types";
export const fetchCountries = async (continent: string) => {
  const url = ServerAPI + `locations/countries/${continent}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const editUserDetails = async (
  googleId: string,
  name: string,
  passport: PassportType,
  currencyUsed: string
) => {
  const url = ServerAPI + "users/details";
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

export const getUserDetails = async () => {
  try {
    const url = `http://localhost:3000/users/current`;
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
