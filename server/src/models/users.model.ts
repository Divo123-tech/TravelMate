import mongoose, { Schema, Document, mongo } from "mongoose";

interface PassportInterface {
  code: string;
  name: string;
}

export interface UserInterface {
  _id: mongoose.Types.ObjectId;
  googleId: string;
  email: string;
  picture: string;
  name?: string;
  passport?: PassportInterface;
  currencyUsed?: string;
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
    type: Object,
    default: {},
  },
  currencyUsed: {
    type: String,
    default: "",
  },
  trips: {
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: "trips",
  },
});

export default mongoose.model<UserInterface>("users", userSchema);
