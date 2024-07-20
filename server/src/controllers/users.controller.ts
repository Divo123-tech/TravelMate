import { Request, Response } from "express";
import usersService from "../services/users.service.js";
interface User {
  id: string;
}
const editUserDetails = async (req: Request, res: Response) => {
  try {
    // const user = req.user as User & { id: string };
    //find the req.user and pass it into the googleId
    res
      .status(200)
      .json(
        await usersService.editUserDetails(
          req.body.googleId,
          req.body.name,
          req.body.passport,
          req.body.currencyUsed
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
    if (!req.user) {
      res.status(400).json({ message: "No user" });
    }

    const user = req.user as User & { id: string };
    res.status(200).json(await usersService.getUserDetails(user.id));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  editUserDetails,
  getUserDetails,
  getCurrentUser,
};
