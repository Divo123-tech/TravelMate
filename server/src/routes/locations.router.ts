import locationsController from "../controllers/locations.controller.js";
import { Router } from "express";
const router = Router();
router.get("/country/:name", locationsController.getCountryByName);
router.get("/countries/:continent", locationsController.getAllCountries);
router.get("/states/:country", locationsController.getAllStates);
router.get("/state/:country/:name", locationsController.getStateByName);
router.get("/cities/:state/:country", locationsController.getAllCities);
router.get("/city/:country/:state/:name", locationsController.getCityByName);
router.get("/airports/:city/:region", locationsController.getAllAirports);
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
