import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import tripController from "../controllers/trip.controller.js";
const router = Router();
router.get("/", usersController.getCurrentUser);
router.put("/", usersController.editUserDetails);
router.post("/trips", tripController.addTrip);
router.delete("/trips/:tripId", tripController.deleteTrip);
router.get("/trips/:tripId", tripController.getTripDetails);
router.get("/:id", usersController.getUserDetails);
router.post("/:id/trips/:tripId/collaborator", tripController.addCollaborator);
router.put("/:id/trips/:tripId/collaborator", tripController.removeCollaborator);
export default router;
//# sourceMappingURL=users.router.js.map