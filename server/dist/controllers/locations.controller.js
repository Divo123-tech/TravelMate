import locationsService from "../services/locations.service.js";
const getAllCountries = async (req, res) => {
    try {
        const page = typeof req.query.page === "string" ? Number(req.query.page) : undefined;
        const searchQuery = typeof req.query.searchQuery == "string"
            ? req.query.searchQuery
            : undefined;
        res
            .status(200)
            .json(await locationsService.getAllCountries(req.params.continent, page, searchQuery));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getCountryByName = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getCountryByName(req.params.name));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getAllStates = async (req, res) => {
    try {
        const page = typeof req.query.page === "string" ? Number(req.query.page) : undefined;
        const searchQuery = typeof req.query.searchQuery == "string"
            ? req.query.searchQuery
            : undefined;
        res
            .status(200)
            .json(await locationsService.getAllStates(req.params.country, page, searchQuery));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getStateByName = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getStateByName(req.params.name, req.params.country));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getAllCities = async (req, res) => {
    try {
        const page = typeof req.query.page === "string" ? Number(req.query.page) : undefined;
        const searchQuery = typeof req.query.searchQuery == "string"
            ? req.query.searchQuery
            : undefined;
        res
            .status(200)
            .json(await locationsService.getAllCities(req.params.state, req.params.country, page, searchQuery));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getCityByName = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getCityByName(req.params.name, req.params.country, req.params.state));
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const getAllAirports = async (req, res) => {
    const page = typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery = typeof req.query.searchQuery == "string"
        ? req.query.searchQuery
        : undefined;
    try {
        res
            .status(200)
            .json(await locationsService.getAllAirports(req.params.region, req.params.countryCode, page, searchQuery));
    }
    catch (err) {
        res.status(403).json({ message: "No Airports found" });
    }
};
const getAllFlights = async (req, res) => {
    const { origin, destination, departureDate, adults, nonstop, currency, children, infants, maxPrice, travelClass, } = req.query;
    const page = typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    try {
        res
            .status(200)
            .json(await locationsService.getAllFlights(origin, destination, departureDate, adults, nonstop, currency, children, infants, maxPrice, travelClass, page));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getAllHotels = async (req, res) => {
    const page = typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery = typeof req.query.searchQuery == "string"
        ? req.query.searchQuery
        : undefined;
    try {
        res
            .status(200)
            .json(await locationsService.getAllHotels(req.params.city, req.params.countryCode, page, searchQuery));
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
    const page = typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery = typeof req.query.searchQuery == "string"
        ? req.query.searchQuery
        : undefined;
    try {
        res
            .status(200)
            .json(await locationsService.getYoutubeVideos(req.params.city, page, searchQuery));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getCountryVisa = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getCountryVisa(req.params.countryCodeFrom, req.params.countryCodeTo));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getCountryExchangeRate = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getCountryExchangeRate(req.params.currencyFrom, req.params.currencyTo));
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
export default {
    getAllCountries,
    getCountryByName,
    getAllStates,
    getStateByName,
    getAllCities,
    getCityByName,
    getAllAirports,
    getAllFlights,
    getAllHotels,
    getAllAttractions,
    getYoutubeVideos,
    getCountryVisa,
    getLocationTime,
    getCountryExchangeRate,
};
//# sourceMappingURL=locations.controller.js.map