import { Router } from "express";
import usersController from "../controllers/users.controller.js";
const router = Router();
router.put("/details", usersController.editUserDetails);
router.get("/current-user", (req, res) => {
    // Use the isUserLoggedIn function to get the login status
    const loggedIn = usersController.userLoggedIn(req);
    if (loggedIn) {
        // If logged in, return the user's information
        res.json({ loggedIn, user: req.user });
    }
    else {
        // If not logged in, return loggedIn: false
        res.json({ loggedIn });
    }
});
export default router;
//# sourceMappingURL=users.router.js.map