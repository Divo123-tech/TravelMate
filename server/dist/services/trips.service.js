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
        return await tripsModel
            .findById(tripId)
            .populate({ path: "owner", select: "googleId _id email picture name" })
            .populate({
            path: "collaborators",
            select: "googleId _id email picture name",
        })
            .exec();
    }
    catch (err) {
        throw new Error(err);
    }
};
const deleteTrip = async (tripId) => {
    try {
        return await tripsModel.findByIdAndDelete(tripId);
    }
    catch (err) {
        throw new Error(err);
    }
};
const addCollaborator = async (tripId, collaboratorId) => {
    try {
        return await tripsModel.findByIdAndUpdate(tripId, { $push: { collaborators: collaboratorId } }, { new: true });
    }
    catch (err) {
        throw new Error(err);
    }
};
const removeCollaborator = async (tripId, collaboratorId) => {
    try {
        return await tripsModel.findByIdAndUpdate(tripId, { $pull: { collaborators: collaboratorId } }, { new: true });
    }
    catch (err) {
        throw new Error(err);
    }
};
const addLocationToTrip = async (tripId, location, locationType) => {
    try {
        return await tripsModel.findByIdAndUpdate(tripId, { $push: { [locationType]: location } }, { new: true });
    }
    catch (err) {
        throw new Error(err);
    }
};
const removeLocationFromTrip = async (tripId, location, locationType) => {
    try {
        return await tripsModel.findByIdAndUpdate(tripId, { $pull: { [locationType]: location } }, { new: true });
    }
    catch (err) {
        throw new Error(err);
    }
};
const editTripDetails = async (tripId, name, startDate, endDate) => {
    try {
        return await tripsModel.findByIdAndUpdate(tripId, { $set: { name: name, startDate: startDate, endDate: endDate } }, { new: true });
    }
    catch (err) {
        throw new Error(err);
    }
};
export default {
    addTrip,
    getTripDetails,
    deleteTrip,
    addCollaborator,
    removeCollaborator,
    addLocationToTrip,
    removeLocationFromTrip,
    editTripDetails,
};
//# sourceMappingURL=trips.service.js.map