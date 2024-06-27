import mongoose, { Schema, Document, mongo } from "mongoose";

export interface UserInterface {
  googleId: string;
  email: string;
  picture: string;
  name?: string;
  passport?: string;
  countryOfOrigin?: string;
  trips?: [mongoose.Types.ObjectId];
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
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

export default mongoose.model<UserInterface>("users", userSchema);
