import usersService from "../services/users.service.js";
const editUserDetails = async (req, res) => {
    try {
        res
            .status(200)
            .json(await usersService.editUserDetails(req.body.email, req.body.name, req.body.passport, req.body.countryOfOrigin));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const userLoggedIn = (req) => {
    // Return true if the user is authenticated, false otherwise.
    return req.isAuthenticated();
};
// const userLoggedIn = async (req: Request, res: Response) => {
//   console.log(req.user);
//   res.send(req.user);
// };
export default {
    editUserDetails,
    userLoggedIn,
};
//# sourceMappingURL=users.controller.js.map