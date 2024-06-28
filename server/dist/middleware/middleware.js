import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import passport from "../utils/passportSetup.js";
import usersService from "../services/users.service.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
    const token = req.session.token;
    if (!token)
        return res.redirect("http://localhost:3000/auth/google");
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.redirect("http://localhost:3000/auth/google");
        }
        req.user = user;
        next();
    });
};
export const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});
export const googleAuthCallback = passport.authenticate("google", {
    failureRedirect: "/failure",
});
export const redirectToHome = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error("failed to verify user");
        }
        const user = req.user;
        if (!(await usersService.userExists(user._json.email))) {
            await usersService.addUser(user.id, user._json.email, user._json.picture);
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: "1h", // Token expires in 1 hour
        });
        req.session.token = token; // Store JWT in session
        res.redirect(`http://localhost:3000/users/${user.id}`);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export default app;
//# sourceMappingURL=middleware.js.map