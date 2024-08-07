const ServerAPI = "http://localhost:3000";
import axios from "axios";
import { PassportType, TripType, UserType } from "../types/types";
export const googleAuthenticate = () => {
  try {
    window.open(`${ServerAPI}/auth/google/`, "_self");
  } catch (err) {
    return;
  }
};

export const logOutAPI = async () => {
  try {
    await axios.post(`${ServerAPI}/auth/google/logout`, {
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
  const { data } = await axios.put(url, body, { withCredentials: true });
  return data;
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
  const url = `${ServerAPI}/users/${userId}/trips/${tripId}`;
  const { data } = await axios.delete(url, { withCredentials: true });
  return data;
};

export const getTripDetails = async (userId: string, tripId: string) => {
  const url = `${ServerAPI}/users/${userId}/trips/${tripId}`;
  const { data } = await axios.get(url, { withCredentials: true });
  return data;
};

export const createNewTrip = async (
  name: string,
  startDate: string,
  endDate: string,
  userId: string
) => {
  const url = `${ServerAPI}/users/${userId}/trips`;
  const body = {
    name,
    startDate,
    endDate,
  };
  const { data } = await axios.post(url, body, { withCredentials: true });
  return data;
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
    return null;
  }
};
