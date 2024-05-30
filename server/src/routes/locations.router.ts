import locationsController from "../controllers/locations.controller.js";
import { Router } from "express";
const router = Router();

router.get("/countries/:continent", locationsController.getAllCountries);

export default router;
