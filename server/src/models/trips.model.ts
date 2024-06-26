import mongoose, { Schema, Document } from "mongoose";
import {
  countryType,
  stateType,
  cityType,
  flightType,
  hotelType,
  attractionType,
} from "../services/locations.service.js";

export interface TripInterface {
  name: string;
  owner: mongoose.Schema.Types.ObjectId;
  collaborators?: mongoose.Schema.Types.ObjectId[];
  startDate: Date;
  endDate?: Date;
  countries?: countryType[];
  states?: stateType[];
  cities?: cityType[];
  activities?: attractionType[];
  flights?: flightType[];
  hotels?: hotelType[];
}

const tripSchema: Schema<TripInterface> = new Schema<TripInterface>({
  name: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  collaborators: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  startDate: {
    required: true,
    default: new Date(),
    type: Date,
  },
  countries: {
    default: [],
    type: [String],
  },
  states: {
    default: [],
    type: [String],
  },
  cities: {
    default: [],
    type: [String],
  },
  activities: {
    default: [],
    type: [String],
  },
  flights: {
    default: [],
    type: [String],
  },
  hotels: {
    default: [],
    type: [String],
  },
});

export default mongoose.model<TripInterface>("trips", tripSchema);
