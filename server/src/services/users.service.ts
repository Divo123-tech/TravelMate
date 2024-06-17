import userModel, { UserInterface } from "../models/users.model.js";

const userExists = async (email: string): Promise<boolean> => {
  const user = await userModel.findOne({ email: email });
  return user ? true : false;
};

const addUser = async (email: string, picture: string): Promise<void> => {
  try {
    await userModel.create({ email: email, picture: picture });
  } catch (err: any) {
    throw new Error(err);
  }
};

const editUserDetails = async (
  id: string,
  name: string,
  passport: string,
  countryOfOrigin: string
) => {
  try {
    return await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          passport,
          countryOfOrigin,
        },
      },
      { new: true }
    );
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default {
  addUser,
  userExists,
  editUserDetails,
};
