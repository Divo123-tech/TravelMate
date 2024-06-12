import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import locationRouter from "./routes/locations.router.js";
const app = express();
const port = 3000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/locations", locationRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
