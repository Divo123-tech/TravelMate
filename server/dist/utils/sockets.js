import tripsService from "../services/trips.service.js"; // Importing the trips service that handles the business logic for managing trips.
import usersService from "../services/users.service.js";
import mongoose from "mongoose";
const listenForTrips = (io) => {
    // The main function that listens for trip-related events using the provided socket.io instance.
    io.on("connection", (socket) => {
        // Listens for a new client connection. Once a client connects, the following events are registered.
        // Event listener for adding a location to a trip.
        socket.on("AddLocationToTrip", async (payload) => {
            const { tripId, data } = payload; // Destructuring the payload to extract tripId and data.
            try {
                // Attempt to add the location to the trip.
                await tripsService.addLocationToTrip(tripId, data.details, data.type);
                // Broadcast the updated trip details to all connected clients.
                io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
            }
            catch (err) {
                // Handle any errors by emitting an error message back to the client.
                socket.emit("error", "Error updating trip");
            }
        });
        // Event listener for removing a location from a trip.
        socket.on("RemoveLocationFromTrip", async (payload) => {
            const { tripId, data } = payload; // Destructuring the payload to extract tripId and data.
            try {
                // Attempt to remove the location from the trip.
                await tripsService.removeLocationFromTrip(tripId, data.details, data.type);
                // Broadcast the updated trip details to all connected clients.
                io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
            }
            catch (err) {
                // Handle any errors by emitting an error message back to the client.
                socket.emit("error", "Error removing location from trip");
            }
        });
        socket.on("AddCollaborator", async (payload) => {
            const { tripId, collaboratorDetail, searchBy } = payload;
            const collaborator = await usersService.getUserDetails(collaboratorDetail, searchBy);
            // Check if the collaborator exists
            if (!collaborator) {
                throw new Error("User not found");
            }
            // Add the trip to the collaborator's trips array
            await usersService.addTrip(collaborator.googleId, tripId);
            // Add the collaborator to the trip's collaborators list
            const updatedTrip = await tripsService.addCollaborator(tripId, collaborator._id);
            io.emit("tripUpdated", updatedTrip);
        });
        socket.on("RemoveCollaborator", async (payload) => {
            const { tripId, collaboratorDetail, searchBy } = payload;
            // Retrieve the collaborator details from the database
            const collaborator = await usersService.getUserDetails(collaboratorDetail, searchBy);
            // Check if the collaborator exists
            if (!collaborator) {
                throw new Error("User not found");
            }
            // Remove the trip from the collaborator's trips array
            await usersService.deleteTrip(collaboratorDetail, new mongoose.Types.ObjectId(tripId));
            // Remove the collaborator from the trip's collaborators list
            const updatedTrip = await tripsService.removeCollaborator(tripId, collaborator._id);
            // Send a success response with the updated trip
            io.emit("tripUpdated", updatedTrip);
        });
        // Event listener for editing the details of an existing trip.
        socket.on("EditTrip", async (payload) => {
            const { tripId, name, startDate, endDate } = payload; // Destructuring the payload to extract trip details.
            try {
                // Attempt to edit the trip details.
                await tripsService.editTripDetails(tripId, name, startDate, endDate);
                // Broadcast the updated trip details to all connected clients.
                io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
            }
            catch (err) {
                // Handle any errors by emitting an error message back to the client.
                socket.emit("error", "Error editing trip");
            }
        });
    });
};
export default {
    listenForTrips, // Exporting the listenForTrips function as the default export for use in other parts of the application.
};
//# sourceMappingURL=sockets.js.map