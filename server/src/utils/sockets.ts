import { Socket, Server } from "socket.io";
import tripsService from "../services/trips.service.js"; // Importing the trips service that handles the business logic for managing trips.

const listenForTrips = (io: Server) => {
  // The main function that listens for trip-related events using the provided socket.io instance.

  io.on("connection", (socket: Socket) => {
    // Listens for a new client connection. Once a client connects, the following events are registered.

    // Event listener for adding a location to a trip.
    socket.on(
      "AddLocationToTrip",
      async (payload: {
        tripId: string;
        data: { details: {}; type: string };
      }) => {
        const { tripId, data } = payload; // Destructuring the payload to extract tripId and data.
        try {
          // Attempt to add the location to the trip.
          await tripsService.addLocationToTrip(tripId, data.details, data.type);

          // Broadcast the updated trip details to all connected clients.
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          // Handle any errors by emitting an error message back to the client.
          socket.emit("error", "Error updating trip");
        }
      }
    );

    // Event listener for removing a location from a trip.
    socket.on(
      "RemoveLocationFromTrip",
      async (payload: {
        tripId: string;
        data: { details: {}; type: string };
      }) => {
        const { tripId, data } = payload; // Destructuring the payload to extract tripId and data.

        try {
          // Attempt to remove the location from the trip.
          await tripsService.removeLocationFromTrip(
            tripId,
            data.details,
            data.type
          );

          // Broadcast the updated trip details to all connected clients.
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          // Handle any errors by emitting an error message back to the client.
          socket.emit("error", "Error removing location from trip");
        }
      }
    );

    // Event listener for fetching the details of a specific trip.
    socket.on("GetTrip", async (tripId: string) => {
      try {
        // Attempt to retrieve the trip details.
        const trip = await tripsService.getTripDetails(tripId);

        // Emit the retrieved trip details to the requesting client.
        io.emit("TripGot", trip);
      } catch (err: any) {
        // Handle any errors by emitting an error message back to the client.
        socket.emit("error", "Error retrieving trip details");
      }
    });

    // Event listener for editing the details of an existing trip.
    socket.on(
      "EditTrip",
      async (payload: {
        tripId: string;
        name: string;
        startDate: string;
        endDate: string;
      }) => {
        const { tripId, name, startDate, endDate } = payload; // Destructuring the payload to extract trip details.
        try {
          // Attempt to edit the trip details.
          await tripsService.editTripDetails(tripId, name, startDate, endDate);

          // Broadcast the updated trip details to all connected clients.
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          // Handle any errors by emitting an error message back to the client.
          socket.emit("error", "Error editing trip");
        }
      }
    );
  });
};

export default {
  listenForTrips, // Exporting the listenForTrips function as the default export for use in other parts of the application.
};
