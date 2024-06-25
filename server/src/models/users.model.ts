import mongoose, { Schema, Document } from "mongoose";

export interface TripInterface {
  startDate: Date;
  endDate: Date;
  countries: string[];
  states?: string[];
  cities?: string[];
  activities?: string[];
  flights?: string[];
  hotels?: string[];
}

export interface UserInterface {
  googleId: string;
  email: string;
  picture: string;
  name?: string;
  passport?: string;
  countryOfOrigin?: string;
  friends?: [string];
  trips?: [TripInterface];
}

const userSchema: Schema<UserInterface> = new Schema<UserInterface>({
  googleId: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  picture: {
    required: true,
    type: String,
  },
  name: {
    type: String,
    default: "",
  },
  passport: {
    type: String,
    default: "",
  },
  countryOfOrigin: {
    type: String,
    default: "",
  },
  friends: {
    type: [String],
    default: [],
  },
  trips: {
    type: [{}],
    default: [],
  },
});

export default mongoose.model<UserInterface>("users", userSchema);
