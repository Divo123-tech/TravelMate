import mongoose, { Schema } from "mongoose";
// Schema definition for the trip model
const tripSchema = new Schema({
    name: {
        required: true, // Name of the trip is required
        type: String, // Data type is String
    },
    owner: {
        required: true, // Owner ID is required
        type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
        ref: "users", // Reference to the "users" collection
    },
    collaborators: {
        type: [mongoose.Schema.Types.ObjectId], // Array of collaborator IDs
        default: [], // Default value is an empty array
        ref: "users", // Reference to the "users" collection
    },
    startDate: {
        required: true, // Start date is required
        type: String, // Data type is String
    },
    endDate: {
        type: String, // End date is optional
        default: "", // Default value is an empty string if not provided
    },
    countries: {
        type: [Schema.Types.Mixed], // Array of countries, type is mixed to accommodate flexible structures
        default: [], // Default value is an empty array
    },
    states: {
        type: [Schema.Types.Mixed], // Array of states, type is mixed to accommodate flexible structures
        default: [], // Default value is an empty array
    },
    cities: {
        type: [Schema.Types.Mixed], // Array of cities, type is mixed to accommodate flexible structures
        default: [], // Default value is an empty array
    },
    activities: {
        type: [Schema.Types.Mixed], // Array of activities, type is mixed to accommodate flexible structures
        default: [], // Default value is an empty array
    },
    flights: {
        type: [Schema.Types.Mixed], // Array of flights, type is mixed to accommodate flexible structures
        default: [], // Default value is an empty array
    },
    hotels: {
        type: [Schema.Types.Mixed], // Array of hotels, type is mixed to accommodate flexible structures
        default: [], // Default value is an empty array
    },
    videos: {
        type: [Schema.Types.Mixed], // Array of videos, type is mixed to accommodate flexible structures
        default: [], // Default value is an empty array
    },
});
// Exporting the trip model
export default mongoose.model("trips", tripSchema);
//# sourceMappingURL=trips.model.js.map