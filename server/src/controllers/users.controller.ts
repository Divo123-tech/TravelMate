import { Request, Response } from "express";
import usersService from "../services/users.service.js";

const editUserDetails = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(
        await usersService.editUserDetails(
          req.params.id,
          req.body.name,
          req.body.passport,
          req.body.countryOfOrigin
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  editUserDetails,
};
