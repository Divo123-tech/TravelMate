import tripsService from "../services/trips.service.js";
import usersService from "../services/users.service.js";
import mongoose from "mongoose";
// Function to add a trip to the database and update the user's trips array
const addTrip = async (req, res) => {
    const currentUser = req.user;
    try {
        // Retrieve the current user details from the database
        const user = await usersService.getUserDetails(currentUser.id, "googleId");
        // Check if the user exists
        if (!user) {
            throw new Error("User Not Found");
        }
        // Add the trip to the database and get the newly created trip
        const trip = await tripsService.addTrip(req.body, user._id);
        // Add the newly created trip to the user's trips array
        await usersService.addTrip(currentUser.id, trip._id);
        // Send a success response with the newly created trip
        res.status(200).json(trip);
    }
    catch (err) {
        // Handle errors and send an appropriate response
        res.status(400).json({ message: err.message });
    }
};
// Function to get the details of a specific trip
const getTripDetails = async (req, res) => {
    try {
        // Retrieve the trip details from the database using the trip ID from the request params
        const tripDetails = await tripsService.getTripDetails(req.params.tripId);
        // Send a success response with the trip details
        res.status(200).json(tripDetails);
    }
    catch (err) {
        // Handle errors and send an appropriate response
        res.status(400).json({ message: err.message });
    }
};
// Function to delete a trip from the database and update the user's and collaborators' trips arrays
const deleteTrip = async (req, res) => {
    const currentUser = req.user;
    try {
        // Retrieve the trip details from the database
        const trip = await tripsService.getTripDetails(req.params.tripId);
        // Check if the trip exists
        if (!trip) {
            throw new Error("Trip Not Found");
        }
        // Retrieve the owner of the trip
        const tripOwner = await usersService.getUserDetails(trip.owner, "_id");
        // Remove the trip from the user's trips array
        await usersService.deleteTrip(currentUser.id, req.params.tripId);
        // Check if the user attempting to delete the trip is the owner
        if (tripOwner?.googleId === currentUser.id) {
            // Remove the trip from all collaborators' trips arrays
            for (const collaboratorId of trip.collaborators || []) {
                const collaborator = await usersService.getUserDetails(collaboratorId, "_id");
                if (collaborator) {
                    await usersService.deleteTrip(collaborator.googleId, req.params.tripId);
                }
                else {
                    throw new Error("Collaborator Not Found");
                }
            }
            // Delete the trip from the database
            const deletedTrip = await tripsService.deleteTrip(req.params.tripId);
            // Send a success response with the deleted trip details
            res.status(200).json(deletedTrip);
        }
        else {
            // If the user is not the owner, remove them as a collaborator from the trip
            const user = await usersService.getUserDetails(currentUser.id, "googleId");
            if (user) {
                const updatedTrip = await tripsService.removeCollaborator(req.params.tripId, user._id);
                res.status(200).json(updatedTrip);
            }
            else {
                throw new Error("User Not Found");
            }
        }
    }
    catch (err) {
        // Handle errors and send an appropriate response
        res.status(400).json({ message: err.message });
    }
};
// Function to add a collaborator to a trip
const addCollaborator = async (req, res) => {
    try {
        // Retrieve the collaborator details from the database
        const collaborator = await usersService.getUserDetails(req.body.collaborator, req.body.searchBy);
        // Check if the collaborator exists
        if (!collaborator) {
            throw new Error("User not found");
        }
        // Add the trip to the collaborator's trips array
        await usersService.addTrip(collaborator.googleId, req.params.tripId);
        // Add the collaborator to the trip's collaborators list
        const updatedTrip = await tripsService.addCollaborator(req.params.tripId, collaborator._id);
        // Send a success response with the updated trip
        res.status(200).json(updatedTrip);
    }
    catch (err) {
        // Handle errors and send an appropriate response
        res.status(400).json({ message: err.message });
    }
};
// Function to remove a collaborator from a trip
const removeCollaborator = async (req, res) => {
    try {
        // Retrieve the collaborator details from the database
        const collaborator = await usersService.getUserDetails(req.body.collaborator, req.body.searchBy);
        // Check if the collaborator exists
        if (!collaborator) {
            throw new Error("User not found");
        }
        // Remove the trip from the collaborator's trips array
        await usersService.deleteTrip(req.body.collaborator, new mongoose.Types.ObjectId(req.params.tripId));
        // Remove the collaborator from the trip's collaborators list
        const updatedTrip = await tripsService.removeCollaborator(req.params.tripId, collaborator._id);
        // Send a success response with the updated trip
        res.status(200).json(updatedTrip);
    }
    catch (err) {
        // Handle errors and send an appropriate response
        res.status(400).json({ message: err.message });
    }
};
// Export the controller functions
export default {
    addTrip,
    getTripDetails,
    deleteTrip,
    addCollaborator,
    removeCollaborator,
};
//# sourceMappingURL=trip.controller.js.map