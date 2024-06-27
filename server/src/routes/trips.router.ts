import { Router } from "express";
import tripsController from "../controllers/trip.controller.js";
const router = Router();

router.post("/", tripsController.addTrip);
router.get("/:tripId", tripsController.getTripDetails);

export default router;
