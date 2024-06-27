import tripsModel from "../models/trips.model.js";
const addTrip = async (userId, tripName) => {
    try {
        const tripAdded = await tripsModel.create({
            name: tripName,
            owner: userId,
        });
        return tripAdded;
    }
    catch (err) {
        throw new Error(err);
    }
};
const getTripDetails = async (tripId) => {
    try {
        return await tripsModel.findById(tripId);
    }
    catch (err) {
        throw new Error(err);
    }
};
export default {
    addTrip,
    getTripDetails,
};
//# sourceMappingURL=trips.service.js.map