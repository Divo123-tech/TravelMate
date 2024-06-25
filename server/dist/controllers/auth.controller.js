// import { Request, Response } from "express";
// import usersService from "../services/users.service.js";
// import passport from "passport";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
// export const googleAuth = passport.authenticate("google", {
//   scope: ["profile", "email"],
// });
export {};
// export const googleAuthCallback = passport.authenticate("google", {
//   failureRedirect: "/failure",
// });
// export const redirectToHome = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       throw new Error("failed to verify user");
//     }
//     type GoogleUser = {
//       id: string;
//       _json: {
//         picture: string;
//         email: string;
//       };
//     };
//     const user = req.user as GoogleUser;
//     if (!(await usersService.userExists(user._json.email))) {
//       await usersService.addUser(user.id, user._json.email, user._json.picture);
//     }
//     const token = jwt.sign({ id: user.id }, process.env.JWT_KEY as string, {
//       expiresIn: "1h", // Token expires in 1 hour
//     });
//     req.session.token = token; // Store JWT in session
//     res.redirect(`http://localhost:3000/users/${user.id}`);
//   } catch (err: any) {
//     res.status(400).json({ message: err.message });
//   }
// };
//# sourceMappingURL=auth.controller.js.map