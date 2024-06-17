import { Router } from "express";
import usersController from "../controllers/users.controller.js";
const router = Router();
router.put("/:id", usersController.editUserDetails);
export default router;
//# sourceMappingURL=users.router.js.map