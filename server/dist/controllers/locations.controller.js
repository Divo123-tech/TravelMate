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
export default {
    getAllCountries,
};
//# sourceMappingURL=locations.controller.js.map