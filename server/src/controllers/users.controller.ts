import { Request, Response } from "express";
import usersService from "../services/users.service.js";

// Define an interface for User with an id field
export interface User {
  id: string;
}

// Controller function to edit user details
const editUserDetails = async (req: Request, res: Response) => {
  // Extract user information from request object
  const user = req.user as User & { id: string };

  try {
    // Call the service method to update user details and send the response
    const updatedUser = await usersService.editUserDetails(
      user.id,
      req.body.name, // New name for the user
      req.body.passport, // Updated passport details
      req.body.currencyUsed // Updated currency preference
    );
    res.status(200).json(updatedUser); // Send success response with updated user details
  } catch (err: any) {
    // Handle errors and send an appropriate response
    res.status(401).json({ message: err.message });
  }
};

// Controller function to get user details
const getUserDetails = async (req: Request, res: Response) => {
  try {
    // Determine the search criteria from the query parameters
    const searchBy =
      typeof req.query.searchBy === "string" ? req.query.searchBy : "googleId";

    // Call the service method to get user details and send the response
    const userDetails = await usersService.getUserDetails(
      req.params.id,
      searchBy
    );
    res.status(200).json(userDetails); // Send success response with user details
  } catch (err: any) {
    // Handle errors and send an appropriate response
    res.status(400).json({ message: err.message });
  }
};

// Controller function to get details of the currently authenticated user
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // Check if user is present in the request object
    if (!req.user) {
      return res.status(400).json({ message: "No user" }); // Send error response if no user
    }

    const user = req.user as User & { id: string };

    // Call the service method to get current user details and send the response
    const currentUser = await usersService.getUserDetails(user.id, "googleId");
    res.status(200).json(currentUser); // Send success response with current user details
  } catch (err: any) {
    // Handle errors and send an appropriate response
    res.status(400).json({ message: err.message });
  }
};

// Export the controller functions
export default {
  editUserDetails,
  getUserDetails,
  getCurrentUser,
};
