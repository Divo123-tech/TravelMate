import tripsModel from "../models/trips.model.js";
const addTrip = async (tripToAdd, userId) => {
    const tripAdded = await tripsModel.create({ ...tripToAdd, owner: userId });
    return tripAdded;
};
const getTripDetails = async (tripId) => {
    return await tripsModel
        .findById(tripId)
        .populate({ path: "owner", select: "googleId _id email picture name" })
        .populate({
        path: "collaborators",
        select: "googleId _id email picture name",
    })
        .sort({ startDate: -1 }) // Add this line to sort by startDate in descending order
        .exec();
};
const deleteTrip = async (tripId) => {
    return await tripsModel.findByIdAndDelete(tripId);
};
const addCollaborator = async (tripId, collaboratorId) => {
    const trip = await tripsModel
        .findByIdAndUpdate(tripId, { $push: { collaborators: collaboratorId } }, { new: true })
        .populate({ path: "owner", select: "googleId _id email picture name" })
        .populate({
        path: "collaborators",
        select: "googleId _id email picture name",
    });
    return trip;
};
const removeCollaborator = async (tripId, collaboratorId) => {
    const trip = await tripsModel
        .findByIdAndUpdate(tripId, { $pull: { collaborators: collaboratorId } }, { new: true })
        .populate({ path: "owner", select: "googleId _id email picture name" })
        .populate({
        path: "collaborators",
        select: "googleId _id email picture name",
    });
    return trip;
};
const addLocationToTrip = async (tripId, location, locationType) => {
    try {
        return await tripsModel.findByIdAndUpdate(tripId, { $addToSet: { [locationType]: location } }, { new: true });
    }
    catch (err) {
        throw new Error(err);
    }
};
const removeLocationFromTrip = async (tripId, location, locationType) => {
    return await tripsModel.findByIdAndUpdate(tripId, { $pull: { [locationType]: location } }, { new: true });
};
const editTripDetails = async (tripId, name, startDate, endDate) => {
    return await tripsModel.findByIdAndUpdate(tripId, { $set: { name: name, startDate: startDate, endDate: endDate } }, { new: true });
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