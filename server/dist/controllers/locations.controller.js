import locationsService from "../services/locations.service.js";
const getAllCountries = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllCountries(req.params.continent, req.query.page));
    }
    catch (err) {
        res.status(403).json({ message: "No countries found" });
    }
};
const getAllStates = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllStates(req.params.country));
    }
    catch (err) {
        res.status(403).json({ message: "No states found" });
    }
};
const getAllCities = async (req, res) => {
    try {
        res
            .status(200)
            .json(await locationsService.getAllCities(req.params.state, req.params.country));
    }
    catch (err) {
        res.status(403).json({ message: "No cities found" });
    }
};
export default {
    getAllCountries,
    getAllStates,
    getAllCities,
};
//# sourceMappingURL=locations.controller.js.map