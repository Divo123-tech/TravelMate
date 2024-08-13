import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import tripController from "../controllers/trip.controller.js";

// Create a new instance of the Router
const router: Router = Router();

// Route to get the current user's information
// GET / - Handled by usersController.getCurrentUser
router.get("/", usersController.getCurrentUser);

// Route to update the current user's details
// PUT / - Handled by usersController.editUserDetails
router.put("/", usersController.editUserDetails);

// Route to add a new trip
// POST /trips - Handled by tripController.addTrip
router.post("/trips", tripController.addTrip);

// Route to delete a specific trip by its ID
// DELETE /trips/:tripId - Handled by tripController.deleteTrip
// :tripId is a URL parameter for the trip's ID
router.delete("/trips/:tripId", tripController.deleteTrip);

// Route to get details of a specific trip by its ID
// GET /trips/:tripId - Handled by tripController.getTripDetails
// :tripId is a URL parameter for the trip's ID
router.get("/trips/:tripId", tripController.getTripDetails);

// Route to get details of a specific user by their ID
// GET /:id - Handled by usersController.getUserDetails
// :id is a URL parameter for the user's ID
router.get("/:id", usersController.getUserDetails);

// Route to add a collaborator to a specific trip for a specific user
// POST /:id/trips/:tripId/collaborator - Handled by tripController.addCollaborator
// :id is a URL parameter for the user's ID, :tripId is a URL parameter for the trip's ID
router.post("/:id/trips/:tripId/collaborator", tripController.addCollaborator);

// Route to remove a collaborator from a specific trip for a specific user
// PUT /:id/trips/:tripId/collaborator - Handled by tripController.removeCollaborator
// :id is a URL parameter for the user's ID, :tripId is a URL parameter for the trip's ID
router.put(
  "/:id/trips/:tripId/collaborator",
  tripController.removeCollaborator
);

// Export the configured router
export default router;
