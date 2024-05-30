import locationsService from "../services/locations.service.js";
import { Request, Response } from "express";

type Page = Record<string, string>;
const getAllCountries = async (
  req: Request<any, any, any, Page>,
  res: Response
): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllCountries(
          req.params.continent,
          req.query.page
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: "No countries found" });
  }
};

export default {
  getAllCountries,
};
