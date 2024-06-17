import usersService from "../services/users.service.js";
import passport from "passport";
export const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});
export const googleAuthCallback = passport.authenticate("google");
export const redirectToHome = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("failed to verify user");
        }
        const user = req.user;
        if (!(await usersService.userExists(user._json.email))) {
            await usersService.addUser(user._json.email, user._json.picture);
        }
        res.redirect(process.env.REDIRECT_URI);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//# sourceMappingURL=auth.controller.js.map