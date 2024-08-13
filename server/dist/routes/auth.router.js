import { Router } from "express";
import { googleAuth, googleAuthCallback, redirectToHome, logOut, } from "../controllers/auth.controller.js";
// Create a new Router instance
const router = Router();
// Route to initiate Google authentication
// URL: /
// This route will redirect users to Google for authentication
router.get("/", googleAuth);
// Route to log out the user
// URL: /logout
// This route handles POST requests to log out the user
router.post("/logout", logOut);
// Route to handle Google authentication callback
// URL: /callback
// This route handles the callback from Google after authentication
// It first processes the callback and then redirects the user to the home page
router.get("/callback", googleAuthCallback, redirectToHome);
// Route to handle login failure
// URL: /failure
// This route returns a 400 status with a failure message if login fails
router.get("/failure", (req, res) => {
    res.status(400).json({ message: "Failed to login" });
});
// Export the router to be used in the main application
export default router;
//# sourceMappingURL=auth.router.js.map