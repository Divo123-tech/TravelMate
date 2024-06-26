import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface {
  googleId: string;
  email: string;
  picture: string;
  name?: string;
  passport?: string;
  countryOfOrigin?: string;
  trips?: [string];
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
  trips: {
    type: [String],
    default: [],
  },
});

export default mongoose.model<UserInterface>("users", userSchema);
