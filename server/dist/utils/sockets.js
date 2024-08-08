import tripsService from "../services/trips.service.js";
const listenForTrips = (io) => {
    io.on("connection", (socket) => {
        socket.on("AddLocationToTrip", async (payload) => {
            const { tripId, data } = payload;
            try {
                await tripsService.addLocationToTrip(tripId, data.details, data.type);
                io.emit("tripUpdated", await tripsService.getTripDetails(tripId));
            }
            catch (err) {
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
                socket.emit("error", "Error removing location from trip");
            }
        });
        socket.on("GetTrip", async (tripId) => {
            try {
                const trip = await tripsService.getTripDetails(tripId);
                io.emit("TripGot", trip);
            }
            catch (err) {
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
                socket.emit("error", "Error");
            }
        });
    });
};
export default {
    listenForTrips,
};
//# sourceMappingURL=sockets.js.map