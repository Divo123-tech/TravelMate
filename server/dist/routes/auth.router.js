import { Router } from "express";
import { googleAuth, googleAuthCallback, redirectToHome, logOut, } from "../controllers/auth.controller.js";
const router = Router();
router.get("/", googleAuth);
router.post("/logout", logOut);
router.get("/callback", googleAuthCallback, redirectToHome);
router.get("/failure", (req, res) => {
    res.status(400).json({ message: "Failed to login" });
});
export default router;
//# sourceMappingURL=auth.router.js.map