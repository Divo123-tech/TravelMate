const ServerAPI = "http://localhost:3000";
import axios from "axios";
import { PassportType, TripType, UserType, timeZoneType } from "../types/types";
import { cachedApiCall } from "../utils/apiCache";
export const googleAuthenticate = () => {
  try {
    window.open(`http://localhost:3000/auth/google/`, "_self");
  } catch (err) {
    return;
  }
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

export const getCurrentUser = async (): Promise<UserType | null> => {
  try {
    const url = `${ServerAPI}/users/current`;
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err: any) {
    return null;
  }
};

export const searchUserDetails = async (
  email: string,
  searchBy: string
): Promise<UserType | null> => {
  try {
    const url = `${ServerAPI}/users/${email}?searchBy=${searchBy}`;
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err: any) {
    return null;
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

export const addCollaborator = async (
  userId: string,
  tripId: string,
  collaborator: string,
  searchBy: string
): Promise<TripType | null> => {
  let url = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`;
  const body = {
    collaborator,
    searchBy,
  };
  const { data } = await axios.post(url, body, { withCredentials: true });
  return data;
};

export const deleteCollaborator = async (
  userId: string,
  tripId: string,
  collaborator: string,
  searchBy: string
): Promise<TripType | null> => {
  try {
    let url = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`;
    const body = {
      collaborator,
      searchBy,
    };
    const { data } = await axios.put(url, body, { withCredentials: true });
    return data;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
