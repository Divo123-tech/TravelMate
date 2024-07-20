import userModel, { UserInterface } from "../models/users.model.js";
import mongoose, { mongo } from "mongoose";
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
  passport: object,
  currencyUsed: string
) => {
  try {
    return await userModel.findOneAndUpdate(
      { googleId },
      {
        $set: {
          name,
          passport,
          currencyUsed,
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
    return await userModel.findOne({ googleId }).populate("trips").exec();
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const findUserById = async (id: mongoose.Types.ObjectId) => {
  try {
    return await userModel.findById(id);
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const addTrip = async (
  googleId: string,
  tripId: mongoose.Types.ObjectId | string
) => {
  try {
    return await userModel.findOneAndUpdate(
      { googleId },
      {
        $push: {
          trips:
            typeof tripId == "string"
              ? new mongoose.Types.ObjectId(tripId)
              : tripId,
        },
      },
      { new: true }
    );
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteTrip = async (googleId: string, tripId: string) => {
  try {
    return await userModel.findOneAndUpdate(
      { googleId },
      {
        $pull: {
          trips: tripId,
        },
      },
      { new: true }
    );
  } catch (err: any) {
    throw new Error(err);
  }
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
