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
export default {
    addUser,
    userExists,
};
//# sourceMappingURL=users.service.js.map