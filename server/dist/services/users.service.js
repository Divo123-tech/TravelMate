import userModel from "../models/users.model.js";
const userExists = async (email) => {
    const user = await userModel.findOne({ email: email });
    return user ? true : false;
};
const addUser = async (googleId, email, picture) => {
    try {
        await userModel.create({
            googleId: googleId,
            email: email,
            picture: picture,
        });
    }
    catch (err) {
        throw new Error(err);
    }
};
const editUserDetails = async (googleId, name, passport, countryOfOrigin) => {
    try {
        return await userModel.findOneAndUpdate({ googleId }, {
            $set: {
                name,
                passport,
                countryOfOrigin,
            },
        }, { new: true });
    }
    catch (err) {
        throw new Error(err.message);
    }
};
const getUserDetails = async (googleId) => {
    try {
        return await userModel.findOne({ googleId });
    }
    catch (err) {
        throw new Error(err.message);
    }
};
const addTrip = async (googleId, tripId) => {
    try {
        return await userModel.findOneAndUpdate({ googleId }, { $push: { trips: tripId } }, { new: true });
    }
    catch (err) {
        throw new Error(err);
    }
};
export default {
    addUser,
    userExists,
    editUserDetails,
    getUserDetails,
    addTrip,
};
//# sourceMappingURL=users.service.js.map