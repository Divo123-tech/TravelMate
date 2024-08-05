import mongoose from "mongoose";
import tripsModel from "../models/trips.model.js";

const addTrip = async (
  tripToAdd: {
    name: string;
    startDate: string;
    endDate: string;
  },
  userId: mongoose.Types.ObjectId
) => {
  try {
    const tripAdded = await tripsModel.create({ ...tripToAdd, owner: userId });
    return tripAdded;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getTripDetails = async (tripId: string) => {
  try {
    return await tripsModel
      .findById(tripId)
      .populate({ path: "owner", select: "googleId _id email picture name" })
      .populate({
        path: "collaborators",
        select: "googleId _id email picture name",
      })
      .sort({ startDate: -1 }) // Add this line to sort by startDate in descending order
      .exec();
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteTrip = async (tripId: string) => {
  try {
    return await tripsModel.findByIdAndDelete(tripId);
  } catch (err: any) {
    throw new Error(err);
  }
};

const addCollaborator = async (
  tripId: string,
  collaboratorId: mongoose.Types.ObjectId
) => {
  try {
    const trip = await tripsModel
      .findByIdAndUpdate(
        tripId,
        { $push: { collaborators: collaboratorId } },
        { new: true }
      )
      .populate({ path: "owner", select: "googleId _id email picture name" })
      .populate({
        path: "collaborators",
        select: "googleId _id email picture name",
      });
    return trip;
  } catch (err: any) {
    throw new Error(err);
  }
};

const removeCollaborator = async (
  tripId: string,
  collaboratorId: mongoose.Types.ObjectId
) => {
  try {
    const trip = await tripsModel
      .findByIdAndUpdate(
        tripId,
        { $pull: { collaborators: collaboratorId } },
        { new: true }
      )
      .populate({ path: "owner", select: "googleId _id email picture name" })
      .populate({
        path: "collaborators",
        select: "googleId _id email picture name",
      });
    return trip;
  } catch (err: any) {
    throw new Error(err);
  }
};

const addLocationToTrip = async (
  tripId: string,
  location: {},
  locationType: string
) => {
  try {
    return await tripsModel.findByIdAndUpdate(
      tripId,
      { $addToSet: { [locationType]: location } },
      { new: true }
    );
  } catch (err: any) {
    throw new Error(err);
  }
};

const removeLocationFromTrip = async (
  tripId: string,
  location: {},
  locationType: string
) => {
  try {
    return await tripsModel.findByIdAndUpdate(
      tripId,
      { $pull: { [locationType]: location } },
      { new: true }
    );
  } catch (err: any) {
    throw new Error(err);
  }
};

const editTripDetails = async (
  tripId: string,
  name: string,
  startDate: string,
  endDate: string
) => {
  try {
    return await tripsModel.findByIdAndUpdate(
      tripId,
      { $set: { name: name, startDate: startDate, endDate: endDate } },
      { new: true }
    );
  } catch (err: any) {
    throw new Error(err);
  }
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
