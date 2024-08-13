import mongoose, { Schema } from "mongoose";

// Interface for passport information
interface PassportInterface {
  code: string; // Passport code
  name: string; // Passport name
}

// Main user interface
export interface UserInterface {
  _id: mongoose.Types.ObjectId; // Unique identifier for the user
  googleId: string; // Google account ID
  email: string; // User email address
  picture: string; // URL to user's profile picture
  name?: string; // Optional: User's name
  passport?: PassportInterface; // Optional: Passport details
  currencyUsed?: string; // Optional: Currency used by the user
  trips?: mongoose.Types.ObjectId[]; // Optional: Array of trip IDs associated with the user
}

// Schema definition for the user model
const userSchema: Schema<UserInterface> = new Schema<UserInterface>({
  googleId: {
    required: true,
    type: String,
    unique: true, // Ensures that googleId is unique across users
  },
  email: {
    required: true,
    type: String,
    unique: true, // Ensures that email is unique across users
  },
  picture: {
    required: true,
    type: String,
  },
  name: {
    type: String,
    default: "", // Default value for name if not provided
  },
  passport: {
    type: Object,
    default: {}, // Default value for passport if not provided
  },
  currencyUsed: {
    type: String,
    default: "", // Default value for currencyUsed if not provided
  },
  trips: {
    type: [mongoose.Types.ObjectId],
    default: [], // Default value for trips if not provided
    ref: "trips", // Reference to the "trips" collection
  },
});

// Exporting the user model
export default mongoose.model<UserInterface>("users", userSchema);
