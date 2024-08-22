import userModel from "../models/users.model.js";
import mongoose from "mongoose";
// Check if a user exists by email
const userExists = async (email) => {
    // Find a user by email in the database
    const user = await userModel.findOne({ email });
    // Return true if user exists, otherwise false
    return user ? true : false;
};
// Add a new user with Google ID, email, and picture
const addUser = async (googleId, email, picture) => {
    // Create and return a new user document
    return await userModel.create({
        googleId,
        email,
        picture,
    });
};
// Edit user details such as name, passport, and currency used
const editUserDetails = async (googleId, name, passport, currencyUsed) => {
    try {
        // Update the user document with the new details and return the updated document
        return await userModel.findOneAndUpdate({ googleId }, {
            $set: {
                name,
                passport,
                currencyUsed,
            },
        }, { new: true } // Return the updated document instead of the old one
        );
    }
    catch (error) {
        // Throw an error if the update operation fails
        throw new Error("Failed to edit user details");
    }
};
// Get user details by a specific field (e.g., email, googleId) or ObjectId
const getUserDetails = async (info, searchBy) => {
    // Find a user by the specified field and populate the 'trips' field
    return await userModel
        .findOne({ [searchBy]: info })
        .populate("trips") // Populate the 'trips' field with trip documents
        .exec();
};
// Add a trip to a user's list of trips
const addTrip = async (googleId, tripId) => {
    // Update the user document by pushing the new trip ID to the 'trips' array
    return await userModel.findOneAndUpdate({ googleId }, {
        $addToSet: {
            trips: typeof tripId === "string" // Check if tripId is a string
                ? new mongoose.Types.ObjectId(tripId) // Convert string to ObjectId if necessary
                : tripId,
        },
    }, { new: true });
};
// Remove a trip from a user's list of trips
const deleteTrip = async (googleId, tripId) => {
    // Update the user document by pulling the trip ID from the 'trips' array
    return await userModel.findOneAndUpdate({ googleId }, {
        $pull: {
            trips: typeof tripId === "string" // Check if tripId is a string
                ? new mongoose.Types.ObjectId(tripId) // Convert string to ObjectId if necessary
                : tripId,
        },
    }, { new: true });
};
// Export the functions as part of the default object
export default {
    addUser,
    userExists,
    editUserDetails,
    getUserDetails,
    addTrip,
    deleteTrip,
};
//# sourceMappingURL=users.service.js.map