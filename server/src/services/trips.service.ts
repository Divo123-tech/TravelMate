import mongoose from "mongoose";
import tripsModel from "../models/trips.model.js";

// Function to add a new trip
const addTrip = async (
  tripToAdd: {
    name: string;
    startDate: string;
    endDate: string;
  },
  userId: mongoose.Types.ObjectId
) => {
  // Create a new trip document and associate it with the userId
  const tripAdded = await tripsModel.create({ ...tripToAdd, owner: userId });
  return tripAdded;
};

// Function to get trip details by tripId
const getTripDetails = async (tripId: string) => {
  return await tripsModel
    .findById(tripId)
    .populate({ path: "owner", select: "googleId _id email picture name" })
    .populate({
      path: "collaborators",
      select: "googleId _id email picture name",
    })
    .sort({ startDate: -1 }) // Sort by startDate in descending order (note: sorting might not be needed here unless applied to an array)
    .exec();
};

// Function to delete a trip by tripId
const deleteTrip = async (tripId: string) => {
  return await tripsModel.findByIdAndDelete(tripId);
};

// Function to add a collaborator to a trip
const addCollaborator = async (
  tripId: string,
  collaboratorId: mongoose.Types.ObjectId
) => {
  const trip = await tripsModel
    .findByIdAndUpdate(
      tripId,
      { $push: { collaborators: collaboratorId } }, // Push new collaborator to the array
      { new: true }
    )
    .populate({ path: "owner", select: "googleId _id email picture name" })
    .populate({
      path: "collaborators",
      select: "googleId _id email picture name",
    });
  return trip;
};

// Function to remove a collaborator from a trip
const removeCollaborator = async (
  tripId: string,
  collaboratorId: mongoose.Types.ObjectId
) => {
  const trip = await tripsModel
    .findByIdAndUpdate(
      tripId,
      { $pull: { collaborators: collaboratorId } }, // Pull the collaborator from the array
      { new: true }
    )
    .populate({ path: "owner", select: "googleId _id email picture name" })
    .populate({
      path: "collaborators",
      select: "googleId _id email picture name",
    });
  return trip;
};

// Function to add a location (e.g., city, state, country) to a trip
const addLocationToTrip = async (
  tripId: string,
  location: object,
  locationType: string
) => {
  try {
    return await tripsModel.findByIdAndUpdate(
      tripId,
      { $addToSet: { [locationType]: location } }, // Add location to a specific field using $addToSet to prevent duplicates
      { new: true }
    );
  } catch (err: any) {
    throw new Error(err);
  }
};

// Function to remove a location from a trip
const removeLocationFromTrip = async (
  tripId: string,
  location: object,
  locationType: string
) => {
  return await tripsModel.findByIdAndUpdate(
    tripId,
    { $pull: { [locationType]: location } }, // Pull the location from the specific field
    { new: true }
  );
};

// Function to edit trip details like name, startDate, and endDate
const editTripDetails = async (
  tripId: string,
  name: string,
  startDate: string,
  endDate: string
) => {
  return await tripsModel.findByIdAndUpdate(
    tripId,
    { $set: { name: name, startDate: startDate, endDate: endDate } },
    { new: true }
  );
};

export default {
  addTrip,
  getTripDetails,
  deleteTrip,
  addCollaborator,
  removeCollaborator,
  addLocationToTrip,
  removeLocationFromTrip,
  editTripDetails,
};
