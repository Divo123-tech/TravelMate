import express from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "./utils/passportSetup.js";
import cors from "cors";
import dotenv from "dotenv";
import api from "./api.js";
dotenv.config();
const app = express();
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "*"],
      frameSrc: ["'self'", "https://www.youtube.com"],
      // Add other directives as needed
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.REDIRECT_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", api);
export default app;
