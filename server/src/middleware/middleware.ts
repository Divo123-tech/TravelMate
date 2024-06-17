import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";

import locationRouter from "../routes/locations.router.js";
import authRouter from "../routes/auth.router.js";
import usersRouter from "../routes/users.router.js";
import passport from "../utils/passportSetup.js";

const app = express();
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/locations", locationRouter);
app.use("/auth/google", authRouter);
app.use("/users", usersRouter);
export default app;
