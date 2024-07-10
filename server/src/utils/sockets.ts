import { Socket } from "dgram";
import tripsService from "../services/trips.service.js";

const listenForTrips = (io: any) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on(
      "AddLocationToTrip",
      async (
        tripId: string,
        locationToAdd: { location: {}; locationType: string }
      ) => {
        try {
          const trip = await tripsService.addLocationToTrip(
            tripId,
            locationToAdd.location,
            locationToAdd.locationType
          );
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          console.error(err);
          socket.emit("error", "Error updating trip");
        }
      }
    );

    socket.on(
      "RemoveLocationFromTrip",
      async (
        tripId: string,
        locationToRemove: { location: {}; locationType: string }
      ) => {
        try {
          const trip = await tripsService.removeLocationFromTrip(
            tripId,
            locationToRemove.location,
            locationToRemove.locationType
          );
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          console.error(err);
          socket.emit("error", "Error removing location from trip");
        }
      }
    );

    socket.on("GetTrip", async (tripId) => {
      try {
        const trip = await tripsService.getTripDetails(tripId);
        io.emit("TripGot", trip);
      } catch (err: any) {
        console.error(err);
        socket.emit("error", "Error removing location from trip");
      }
    });

    socket.on("EditTrip", async (tripId, name, startDate, endDate) => {
      try {
        await tripsService.editTripDetails(tripId, name, startDate, endDate);
        io.emit("TripEdited", await tripsService.getTripDetails(tripId));
      } catch (err) {
        console.error(err);
        socket.emit("error", "Error");
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default {
  listenForTrips,
};
