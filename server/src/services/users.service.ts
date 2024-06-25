import userModel, { UserInterface } from "../models/users.model.js";

const userExists = async (email: string): Promise<boolean> => {
  const user = await userModel.findOne({ email: email });
  return user ? true : false;
};

const addUser = async (
  googleId: string,
  email: string,
  picture: string
): Promise<void> => {
  try {
    await userModel.create({
      googleId: googleId,
      email: email,
      picture: picture,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const editUserDetails = async (
  googleId: string,
  name: string,
  passport: string,
  countryOfOrigin: string
) => {
  try {
    return await userModel.findOneAndUpdate(
      { googleId },
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

const getUserDetails = async (googleId: string) => {
  try {
    return await userModel.findOne({ googleId });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default {
  addUser,
  userExists,
  editUserDetails,
  getUserDetails,
};
