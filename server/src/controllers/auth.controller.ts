import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import passport from "../utils/passportSetup.js";
import usersService from "../services/users.service.js";
import jwt from "jsonwebtoken";

// Extend the Express session interface to include a token
declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

// Middleware to check if the user is authenticated
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Only run authentication check if not in test environment
  if (process.env.NODE_ENV !== "test") {
    // Retrieve the token from the session
    const token = req.session.token;

    // If no token is found, redirect the user to the Google authentication page
    if (!token) return res.redirect("http://localhost:3000/auth/google");

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_KEY as string, (err, user) => {
      if (err) {
        // If verification fails, redirect to the Google authentication page
        return res.redirect("http://localhost:3000/auth/google");
      }
      // Attach the user information to the request object
      req.user = user;
      next();
    });
  } else {
    // In test environment, bypass authentication and set a dummy user
    req.user = { id: "12345" } as any;
    next();
  }
};

// Middleware to start Google authentication
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"], // Request access to profile and email from Google
});

// Middleware to handle Google authentication callback
export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: process.env.REDIRECT_URI, // Redirect to this URI on failure
});

// Handle the redirect after Google authentication
export const redirectToHome = async (req: Request, res: Response) => {
  try {
    // Check if the user is available in the request
    if (!req.user) {
      throw new Error("Failed to verify user");
    }

    // Type definition for Google user data
    type GoogleUser = {
      id: string;
      _json: {
        picture: string;
        email: string;
      };
    };

    // Cast the user to the GoogleUser type
    const user = req.user as GoogleUser;

    // Check if the user exists in the database
    if (!(await usersService.userExists(user._json.email))) {
      // Add the user to the database if not already present
      await usersService.addUser(user.id, user._json.email, user._json.picture);
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY as string, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Store the JWT in the session
    req.session.token = token;

    // Redirect the user to their profile page
    res.redirect(`${process.env.REDIRECT_URI}/profile`);
  } catch (err: any) {
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handle user logout
export const logOut = (req: Request, res: Response) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      // If there's an error during logout, send a 500 error response
      res.status(500).send("Could not log out");
    } else {
      // Redirect to the redirect URI or a default URL after logout
      res.redirect(process.env.REDIRECT_URI || "http://localhost:5173");
    }
  });
};
