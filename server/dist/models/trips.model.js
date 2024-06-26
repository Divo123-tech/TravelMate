import mongoose, { Schema } from "mongoose";
const tripSchema = new Schema({
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
export default mongoose.model("trips", tripSchema);
//# sourceMappingURL=trips.model.js.map