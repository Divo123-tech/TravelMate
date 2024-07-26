import mongoose, { Schema } from "mongoose";
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
  owner: mongoose.Types.ObjectId;
  collaborators?: mongoose.Types.ObjectId[];
  startDate: string;
  endDate?: string;
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
    ref: "users",
  },
  collaborators: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users",
  },
  startDate: {
    required: true,
    type: String,
  },
  endDate: {
    type: String,
    required: true,
  },
  countries: {
    default: [],
    type: [{}],
  },
  states: {
    default: [],
    type: [{}],
  },
  cities: {
    default: [],
    type: [{}],
  },
  activities: {
    default: [],
    type: [{}],
  },
  flights: {
    default: [],
    type: [{}],
  },
  hotels: {
    default: [],
    type: [{}],
  },
});

export default mongoose.model<TripInterface>("trips", tripSchema);
