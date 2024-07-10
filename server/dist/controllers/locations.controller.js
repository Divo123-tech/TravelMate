import locationsService from "../services/locations.service.js";
const getAllCountries = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllCountries(req.params.continent));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getAllStates = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllStates(req.params.country));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getAllCities = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllCities(req.params.state, req.params.country));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getAllAirports = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllAirports(req.params.city, req.params.countryCode));
    }
    catch (err) {
        res.status(403).json({ message: "No Airports found" });
    }
};
const getAllFlights = async (req, res) => {
    const { origin, destination, departureDate, adults, nonstop, children, infants, maxPrice, travelClass, } = req.query;
    try {
        res
            .status(200)
            .json(await locationsService.getAllFlights(origin, destination, departureDate, adults, nonstop, children, infants, maxPrice, travelClass));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getAllHotels = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllHotels(req.params.city, req.params.countryCode));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getAllAttractions = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllAttractions(req.params.city, req.params.countryCode, req.query.category || "attractions"));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getYoutubeVideos = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getYoutubeVideos(req.params.city));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getCountryDetails = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getCountryDetails(req.params.countryCodeFrom, req.params.countryCodeTo, req.params.currencyFrom, req.params.currencyTo));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getLocationTime = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getLocationTime(req.params.city, req.params.countryCode));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getImage = async (req, res) => {
    try {
        res.status(200).json(await locationsService.getImage(req.params.keyword));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export default {
    getAllCountries,
    getAllStates,
    getAllCities,
    getAllAirports,
    getAllFlights,
    getAllHotels,
    getAllAttractions,
    getYoutubeVideos,
    getCountryDetails,
    getLocationTime,
    getImage,
};
//# sourceMappingURL=locations.controller.js.map