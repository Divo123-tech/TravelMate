import tripsService from "../services/trips.service.js";
const listenForTrips = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("AddLocationToTrip", async (payload) => {
            const { tripId, data } = payload;
            try {
                await tripsService.addLocationToTrip(tripId, data.details, data.type);
                io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
            }
            catch (err) {
                console.error(err);
                socket.emit("error", "Error updating trip");
            }
        });
        socket.on("RemoveLocationFromTrip", async (payload) => {
            const { tripId, data } = payload;
            try {
                await tripsService.removeLocationFromTrip(tripId, data.details, data.type);
                io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
            }
            catch (err) {
                console.error(err);
                socket.emit("error", "Error removing location from trip");
            }
        });
        socket.on("GetTrip", async (tripId) => {
            try {
                const trip = await tripsService.getTripDetails(tripId);
                io.emit("TripGot", trip);
            }
            catch (err) {
                console.error(err);
                socket.emit("error", "Error removing location from trip");
            }
        });
        socket.on("EditTrip", async (payload) => {
            const { tripId, name, startDate, endDate } = payload;
            try {
                console.log(await tripsService.editTripDetails(tripId, name, startDate, endDate));
                io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
            }
            catch (err) {
                console.error(err);
                socket.emit("error", "Error");
            }
        });
        // socket.on("test", (tripId: string, data: { details: {}; type: string }) => {
        //   console.log(tripId);
        // });
        socket.on("test", (payload) => {
            console.log(payload.tripId);
            console.log(payload.data.details);
            console.log(payload.data.type);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
export default {
    listenForTrips,
};
//# sourceMappingURL=sockets.js.map