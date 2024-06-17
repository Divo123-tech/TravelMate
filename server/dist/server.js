import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./middleware/middleware.js";
const port = 3000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
app.listen(port, () => {
    console.log("listening on port " + port);
});
//# sourceMappingURL=server.js.map