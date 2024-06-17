import { Router } from "express";
import { googleAuth, googleAuthCallback, redirectToHome, } from "../controllers/auth.controller.js";
const router = Router();
router.get("/", googleAuth);
router.get("/callback", googleAuthCallback, redirectToHome);
export default router;
//# sourceMappingURL=auth.router.js.map