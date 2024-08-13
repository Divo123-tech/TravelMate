import locationsController from "../controllers/locations.controller.js";
import { Router } from "express";
// Create a new Router instance
const router = Router();
// Route to get details of a country by its name
// URL: /country/:name
router.get("/country/:name", locationsController.getCountryByName);
// Route to get all countries within a specific continent
// URL: /countries/:continent
router.get("/countries/:continent", locationsController.getAllCountries);
// Route to get all states within a specific country
// URL: /states/:country
router.get("/states/:country", locationsController.getAllStates);
// Route to get a specific state by name within a country
// URL: /state/:country/:name
router.get("/state/:country/:name", locationsController.getStateByName);
// Route to get all cities within a specific state and country
// URL: /cities/:state/:country
router.get("/cities/:state/:country", locationsController.getAllCities);
// Route to get a specific city by name within a state and country
// URL: /city/:country/:state/:name
router.get("/city/:country/:state/:name", locationsController.getCityByName);
// Route to get all airports within a specific city and region
// URL: /airports/:city/:region
router.get("/airports/:city/:region", locationsController.getAllAirports);
// Route to get all flights with various optional parameters
// URL: /flights
router.get("/flights", locationsController.getAllFlights);
// Route to get all hotels within a specific city and country code
// URL: /hotels/:city/:countryCode
router.get("/hotels/:city/:countryCode", locationsController.getAllHotels);
// Route to get all attractions within a specific city and country code
// URL: /attractions/:city/:countryCode
router.get("/attractions/:city/:countryCode", locationsController.getAllAttractions);
// Route to get the exchange rate between two currencies
// URL: /exchange/:currencyFrom/:currencyTo
router.get("/exchange/:currencyFrom/:currencyTo", locationsController.getCountryExchangeRate);
// Route to get visa requirements between two countries
// URL: /visa/:countryCodeFrom/:countryCodeTo
router.get("/visa/:countryCodeFrom/:countryCodeTo", locationsController.getCountryVisa);
// Route to get YouTube videos related to a specific city
// URL: /videos/:city
router.get("/videos/:city", locationsController.getYoutubeVideos);
// Route to get the current time in a specific city and country code
// URL: /time/:city/:countryCode
router.get("/time/:city/:countryCode", locationsController.getLocationTime);
// Export the router to be used in the main application
export default router;
//# sourceMappingURL=locations.router.js.map