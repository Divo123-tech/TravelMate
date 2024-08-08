import { Socket } from "dgram";
import tripsService from "../services/trips.service.js";
const listenForTrips = (io: any) => {
  io.on("connection", (socket: Socket) => {
    socket.on(
      "AddLocationToTrip",
      async (payload: {
        tripId: string;
        data: { details: {}; type: string };
      }) => {
        const { tripId, data } = payload;
        try {
          await tripsService.addLocationToTrip(tripId, data.details, data.type);

          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          socket.emit("error", "Error updating trip");
        }
      }
    );

    socket.on(
      "RemoveLocationFromTrip",
      async (payload: {
        tripId: string;
        data: { details: {}; type: string };
      }) => {
        const { tripId, data } = payload;

        try {
          await tripsService.removeLocationFromTrip(
            tripId,
            data.details,
            data.type
          );
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err: any) {
          socket.emit("error", "Error removing location from trip");
        }
      }
    );

    socket.on("GetTrip", async (tripId: string) => {
      try {
        const trip = await tripsService.getTripDetails(tripId);
        io.emit("TripGot", trip);
      } catch (err: any) {
        socket.emit("error", "Error removing location from trip");
      }
    });

    socket.on(
      "EditTrip",
      async (payload: {
        tripId: string;
        name: string;
        startDate: string;
        endDate: string;
      }) => {
        const { tripId, name, startDate, endDate } = payload;
        try {
          console.log(
            await tripsService.editTripDetails(tripId, name, startDate, endDate)
          );
          io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
        } catch (err) {
          socket.emit("error", "Error");
        }
      }
    );
  });
};

export default {
  listenForTrips,
};
