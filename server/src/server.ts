import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

import { Server } from "socket.io";
import http from "http";
import sockets from "./utils/sockets.js";
const server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const port = 3000;

server.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
    console.log("listening on port " + port);
  } catch (err) {
    console.error("Error connecting to Server", err);
  }
});
sockets.listenForTrips(io);
