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
    failureRedirect: process.env.REDIRECT_URI,
});
export const redirectToHome = async (req, res) => {
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
        res.redirect(`${process.env.REDIRECT_URI}/profile`);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send("Could not log out");
        }
        else {
            res.redirect(process.env.REDIRECT_URI || "http://localhost:5173");
        }
    });
};
//# sourceMappingURL=auth.controller.js.map