import { Router } from "express";
import usersController from "../controllers/users.controller.js";
const router = Router();

router.put("/details", usersController.editUserDetails);

export default router;
