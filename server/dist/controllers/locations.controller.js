import locationsService from "../services/locations.service.js";
const getAllCountries = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllCountries(req.params.continent, req.query.page));
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
export default {
    getAllCountries,
    getAllStates,
    getAllCities,
    getAllAirports,
    getAllFlights,
    getAllHotels,
};
//# sourceMappingURL=locations.controller.js.map