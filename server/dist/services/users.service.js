import userModel from "../models/users.model.js";
const userExists = async (email) => {
    const user = await userModel.findOne({ email: email });
    return user ? true : false;
};
const addUser = async (email, picture) => {
    try {
        await userModel.create({ email: email, picture: picture });
    }
    catch (err) {
        throw new Error(err);
    }
};
const editUserDetails = async (email, name, passport, countryOfOrigin) => {
    try {
        return await userModel.findOneAndUpdate({ email }, {
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
export default {
    addUser,
    userExists,
    editUserDetails,
};
//# sourceMappingURL=users.service.js.map