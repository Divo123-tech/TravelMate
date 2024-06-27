import mongoose, { Schema } from "mongoose";
const tripSchema = new Schema({
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
    },
    startDate: {
        required: true,
        default: new Date(),
        type: Date,
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
export default mongoose.model("trips", tripSchema);
//# sourceMappingURL=trips.model.js.map