import locationsController from "../controllers/locations.controller.js";
import { Router } from "express";
const router = Router();

router.get("/countries/:continent", locationsController.getAllCountries);
router.get("/states/:country", locationsController.getAllStates);
router.get("/cities/:state/:country", locationsController.getAllCities);
router.get("/airports/:city/:countryCode", locationsController.getAllAirports);
router.get("/flights", locationsController.getAllFlights);
router.get("/hotels/:city/:countryCode", locationsController.getAllHotels);
router.get(
  "/attractions/:city/:countryCode",
  locationsController.getAllAttractions
);
router.get(
  "/exchange/:currencyFrom/:currencyTo",
  locationsController.getCountryExchangeRate
);
router.get(
  "/visa/:countryCodeFrom/:countryCodeTo",
  locationsController.getCountryVisa
);
router.get("/videos/:city", locationsController.getYoutubeVideos);
router.get("/time/:city/:countryCode", locationsController.getLocationTime);
export default router;
