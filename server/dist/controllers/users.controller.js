import usersService from "../services/users.service.js";
const editUserDetails = async (req, res) => {
    const user = req.user;
    try {
        //find the req.user and pass it into the googleId
        res
            .status(200)
            .json(await usersService.editUserDetails(user.id, req.body.name, req.body.passport, req.body.currencyUsed));
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
};
const getUserDetails = async (req, res) => {
    try {
        const searchBy = typeof req.query.searchBy === "string" ? req.query.searchBy : "googleId";
        res
            .status(200)
            .json(await usersService.getUserDetails(req.params.id, searchBy));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).json({ message: "No user" });
        }
        const user = req.user;
        res
            .status(200)
            .json(await usersService.getUserDetails(user.id, "googleId"));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export default {
    editUserDetails,
    getUserDetails,
    getCurrentUser,
};
//# sourceMappingURL=users.controller.js.map