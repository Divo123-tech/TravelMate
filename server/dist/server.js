import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app, { isAuthenticated } from "./middleware/middleware.js";
import locationRouter from "./routes/locations.router.js";
import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/users.router.js";
const port = 3000;
app.use("/locations", locationRouter);
app.use("/auth/google", authRouter);
app.use("/users", isAuthenticated, usersRouter);
app.listen(port, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
        console.log("listening on port " + port);
    }
    catch (err) {
        console.error("Error connecting to Server", err);
    }
});
//# sourceMappingURL=server.js.map