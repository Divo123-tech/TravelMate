import userModel from "../models/users.model.js";
import mongoose from "mongoose";
const userExists = async (email) => {
    const user = await userModel.findOne({ email });
    return user ? true : false;
};
const addUser = async (googleId, email, picture) => {
    await userModel.create({
        googleId,
        email,
        picture,
    });
};
const editUserDetails = async (googleId, name, passport, currencyUsed) => {
    return await userModel.findOneAndUpdate({ googleId }, {
        $set: {
            name,
            passport,
            currencyUsed,
        },
    }, { new: true });
};
const getUserDetails = async (collaboratorInfo, searchBy) => {
    return await userModel
        .findOne({ [`${searchBy}`]: collaboratorInfo })
        .populate("trips")
        .exec();
};
const findUserById = async (id) => {
    return await userModel.findById(id);
};
const addTrip = async (googleId, tripId) => {
    return await userModel.findOneAndUpdate({ googleId }, {
        $push: {
            trips: typeof tripId == "string"
                ? new mongoose.Types.ObjectId(tripId)
                : tripId,
        },
    }, { new: true });
};
const deleteTrip = async (googleId, tripId) => {
    return await userModel.findOneAndUpdate({ googleId }, {
        $pull: {
            trips: tripId,
        },
    }, { new: true });
};
export default {
    addUser,
    userExists,
    editUserDetails,
    getUserDetails,
    addTrip,
    deleteTrip,
    findUserById,
};
//# sourceMappingURL=users.service.js.map