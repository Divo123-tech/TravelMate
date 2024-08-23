const ServerAPI = "/api"; // Base URL for the server API

import axios from "axios"; // Axios for making HTTP requests
import { PassportType, TripType, UserType } from "../types/types"; // Importing TypeScript types

/**
 * Opens a new window to initiate Google authentication.
 */
export const googleAuthenticate = () => {
  try {
    // Redirects to the Google authentication route on the server
    window.open(`${ServerAPI}/auth/google/`, "_self");
  } catch (err) {
    // If an error occurs, the function simply returns
    return;
  }
};

/**
 * Logs out the current user from Google authentication.
 */
export const logOutAPI = async () => {
  try {
    // Sends a POST request to log out and clear the session
    await axios.post(`${ServerAPI}/auth/google/logout`, {
      withCredentials: true, // Includes credentials (cookies) with the request
    });
  } catch (err) {
    // If an error occurs, the function simply returns
    return;
  }
};

/**
 * Updates user details on the server.
 * @param name - The new name for the user.
 * @param passport - The updated passport information.
 * @param currencyUsed - The currency used by the user.
 * @returns The updated user object.
 */
export const editUserDetails = async (
  name: string,
  passport: PassportType,
  currencyUsed: string
): Promise<UserType> => {
  const url = `${ServerAPI}/users`; // Endpoint to update user details
  const body = {
    name,
    passport,
    currencyUsed,
  };
  const { data } = await axios.put(url, body, { withCredentials: true });
  return data; // Returns the updated user data
};

/**
 * Retrieves the current user's details from the server.
 * @returns The current user object or null if not authenticated.
 */
export const getCurrentUser = async (): Promise<UserType | null> => {
  try {
    const url = `${ServerAPI}/users`; // Endpoint to get the current user's details
    const { data } = await axios.get(url, { withCredentials: true });
    return data; // Returns the current user data
  } catch (err: any) {
    // If an error occurs, return null
    return null;
  }
};

/**
 * Searches for a user by email and a specified search criterion.
 * @param email - The email of the user to search for.
 * @param searchBy - The criterion for searching (e.g., 'email', 'name').
 * @returns The user object or null if not found.
 */
export const searchUserDetails = async (
  email: string,
  searchBy: string
): Promise<UserType | null> => {
  try {
    const url = `${ServerAPI}/users/${email}?searchBy=${searchBy}`; // Endpoint to search for a user
    const { data } = await axios.get(url, { withCredentials: true });
    return data; // Returns the found user data
  } catch (err: any) {
    // If an error occurs, return null
    return null;
  }
};

/**
 * Deletes a trip by its ID.
 * @param tripId - The ID of the trip to delete.
 * @returns The deleted trip object.
 */
export const deleteTrip = async (tripId: string): Promise<TripType> => {
  const url = `${ServerAPI}/users/trips/${tripId}`; // Endpoint to delete a trip
  const { data } = await axios.delete(url, { withCredentials: true });
  return data; // Returns the deleted trip data
};

/**
 * Retrieves details of a trip by its ID.
 * @param tripId - The ID of the trip to retrieve.
 * @returns The trip details.
 */
export const getTripDetails = async (tripId: string) => {
  const url = `${ServerAPI}/users/trips/${tripId}`; // Endpoint to get trip details
  const { data } = await axios.get(url, { withCredentials: true });
  return data; // Returns the trip details
};

/**
 * Creates a new trip with the specified details.
 * @param name - The name of the new trip.
 * @param startDate - The start date of the trip.
 * @param endDate - The end date of the trip.
 * @returns The newly created trip object.
 */
export const createNewTrip = async (
  name: string,
  startDate: string,
  endDate: string
) => {
  const url = `${ServerAPI}/users/trips`; // Endpoint to create a new trip
  const body = {
    name,
    startDate,
    endDate,
  };
  const { data } = await axios.post(url, body, { withCredentials: true });
  return data; // Returns the newly created trip data
};

/**
 * Adds a collaborator to a trip.
 * @param userId - The ID of the user to add as a collaborator.
 * @param tripId - The ID of the trip to add the collaborator to.
 * @param collaborator - The email or ID of the collaborator.
 * @param searchBy - The criterion for finding the collaborator (e.g., 'email', 'id').
 * @returns The updated trip object or null if the operation fails.
 */
export const addCollaborator = async (
  userId: string,
  tripId: string,
  collaborator: string,
  searchBy: string
): Promise<TripType | null> => {
  let url = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`; // Endpoint to add a collaborator
  const body = {
    collaborator,
    searchBy,
  };
  const { data } = await axios.post(url, body, { withCredentials: true });
  return data; // Returns the updated trip data
};

/**
 * Removes a collaborator from a trip.
 * @param userId - The ID of the user to remove as a collaborator.
 * @param tripId - The ID of the trip to remove the collaborator from.
 * @param collaborator - The email or ID of the collaborator.
 * @param searchBy - The criterion for finding the collaborator (e.g., 'email', 'id').
 * @returns The updated trip object or null if the operation fails.
 */
export const deleteCollaborator = async (
  userId: string,
  tripId: string,
  collaborator: string,
  searchBy: string
): Promise<TripType | null> => {
  try {
    let url = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`; // Endpoint to remove a collaborator
    const body = {
      collaborator,
      searchBy,
    };
    const { data } = await axios.put(url, body, { withCredentials: true });
    return data; // Returns the updated trip data
  } catch (err: any) {
    // If an error occurs, return null
    return null;
  }
};
