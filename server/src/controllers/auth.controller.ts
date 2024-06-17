import { Request, Response } from "express";
import usersService from "../services/users.service.js";
import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google");

export const redirectToHome = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("failed to verify user");
    }
    type GoogleUser = {
      _json: {
        picture: string;
        email: string;
      };
    };
    const user = req.user as GoogleUser;
    if (!(await usersService.userExists(user._json.email))) {
      await usersService.addUser(user._json.email, user._json.picture);
    }
    res.redirect(process.env.REDIRECT_URI as string);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
