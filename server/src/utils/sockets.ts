import { Socket } from "dgram";
import tripsService from "../services/trips.service.js";
const listenForTrips = (io: any) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on(
      "AddLocationToTrip",
      async (tripId: string, data: { details: {}; type: string }) => {
        try {
          await tripsService.addLocationToTrip(tripId, data.details, data.type);
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          console.error(err);
          socket.emit("error", "Error updating trip");
        }
      }
    );

    socket.on(
      "RemoveLocationFromTrip",
      async (tripId: string, data: { details: {}; type: string }) => {
        try {
          await tripsService.removeLocationFromTrip(
            tripId,
            data.details,
            data.type
          );
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          console.error(err);
          socket.emit("error", "Error removing location from trip");
        }
      }
    );

    socket.on("GetTrip", async (tripId: string) => {
      try {
        const trip = await tripsService.getTripDetails(tripId);
        io.emit("TripGot", trip);
      } catch (err: any) {
        console.error(err);
        socket.emit("error", "Error removing location from trip");
      }
    });

    socket.on(
      "EditTrip",
      async (
        tripId: string,
        name: string,
        startDate: string,
        endDate: string
      ) => {
        try {
          await tripsService.editTripDetails(tripId, name, startDate, endDate);
          io.emit("TripEdited", await tripsService.getTripDetails(tripId));
        } catch (err) {
          console.error(err);
          socket.emit("error", "Error");
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default {
  listenForTrips,
};
