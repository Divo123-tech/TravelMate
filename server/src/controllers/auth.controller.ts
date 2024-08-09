import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import passport from "../utils/passportSetup.js";
import usersService from "../services/users.service.js";
import jwt from "jsonwebtoken";

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session.token;
  if (!token) return res.redirect("http://localhost:3000/auth/google");

  jwt.verify(token, process.env.JWT_KEY as string, (err, user) => {
    if (err) {
      return res.redirect("http://localhost:3000/auth/google");
    }
    req.user = user;
    next();
  });
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: process.env.REDIRECT_URI,
});

export const redirectToHome = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("failed to verify user");
    }
    type GoogleUser = {
      id: string;
      _json: {
        picture: string;
        email: string;
      };
    };
    const user = req.user as GoogleUser;
    if (!(await usersService.userExists(user._json.email))) {
      await usersService.addUser(user.id, user._json.email, user._json.picture);
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY as string, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    req.session.token = token; // Store JWT in session
    res.redirect(`${process.env.REDIRECT_URI}/profile`);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const logOut = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Could not log out");
    } else {
      res.redirect(process.env.REDIRECT_URI || "http://localhost:5173");
    }
  });
};
