import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import tripController from "../controllers/trip.controller.js";
const router = Router();
router.put("/details", usersController.editUserDetails);
router.get("/:id", usersController.getUserDetails);
router.post("/:id/trips", tripController.addTrip);
export default router;
//# sourceMappingURL=users.router.js.map