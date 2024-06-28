import { Request, Response } from "express";
import usersService from "../services/users.service.js";

const editUserDetails = async (req: Request, res: Response) => {
  try {
    //find the req.user and pass it into the googleId
    res
      .status(200)
      .json(
        await usersService.editUserDetails(
          req.body.googleId,
          req.body.name,
          req.body.passport,
          req.body.countryOfOrigin
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await usersService.getUserDetails(req.params.id));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  editUserDetails,
  getUserDetails,
  getCurrentUser,
};
