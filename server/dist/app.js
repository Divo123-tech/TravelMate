import express from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "./utils/passportSetup.js";
import cors from "cors";
import { isAuthenticated } from "./controllers/auth.controller.js";
import locationRouter from "./routes/locations.router.js";
import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/users.router.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: process.env.REDIRECT_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/locations", locationRouter);
app.use("/auth/google", authRouter);
app.use("/users", isAuthenticated, usersRouter);
export default app;
//# sourceMappingURL=app.js.map