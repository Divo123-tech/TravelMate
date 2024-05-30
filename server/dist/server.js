import express from "express";
import cors from "cors";
import locationRouter from "./routes/locations.router.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/locations", locationRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log("listening on port " + port);
});
//# sourceMappingURL=server.js.map