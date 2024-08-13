import mongoose, { Schema } from "mongoose";
// Schema definition for the user model
const userSchema = new Schema({
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
export default mongoose.model("users", userSchema);
//# sourceMappingURL=users.model.js.map