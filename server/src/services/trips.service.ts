import mongoose from "mongoose";
import tripsModel, { TripInterface } from "../models/trips.model.js";

const addTrip = async (userId: mongoose.Types.ObjectId, tripName: string) => {
  try {
    const tripAdded = await tripsModel.create({
      name: tripName,
      owner: userId,
    });
    return tripAdded;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getTripDetails = async (tripId: string) => {
  try {
    return await tripsModel.findById(tripId);
  } catch (err: any) {
    throw new Error(err);
  }
};

export default {
  addTrip,
  getTripDetails,
};
