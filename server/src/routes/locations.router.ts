import locationsController from "../controllers/locations.controller.js";
import { Router } from "express";
const router = Router();

router.get("/countries/:continent", locationsController.getAllCountries);
router.get("/states/:country", locationsController.getAllStates);
export default router;
