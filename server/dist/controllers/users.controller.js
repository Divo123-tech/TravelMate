import usersService from "../services/users.service.js";
const editUserDetails = async (req, res) => {
    try {
        // const user = req.user as User & { id: string };
        //find the req.user and pass it into the googleId
        res
            .status(200)
            .json(await usersService.editUserDetails(req.body.googleId, req.body.name, req.body.passport, req.body.currencyUsed));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getUserDetails = async (req, res) => {
    try {
        res.status(200).json(await usersService.getUserDetails(req.params.id));
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
        res.status(200).json(await usersService.getUserDetails(user.id));
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