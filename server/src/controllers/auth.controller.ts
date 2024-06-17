import { Request, Response } from "express";
import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google");

export const redirectToHome = (req: Request, res: Response) => {
  res.redirect(process.env.REDIRECT_URI as string);
};
