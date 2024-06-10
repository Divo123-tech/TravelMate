import locationsService, {
  FlightInterface,
} from "../services/locations.service.js";
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
    res.status(403).json({ message: err.message });
  }
};

const getAllStates = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(await locationsService.getAllStates(req.params.country));
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getAllCities = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllCities(
          req.params.state,
          req.params.country
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getAllAirports = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllAirports(
          req.params.city,
          req.params.countryCode
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: "No Airports found" });
  }
};

const getAllFlights = async (
  req: Request<any, any, any, FlightInterface>,
  res: Response
): Promise<void> => {
  const {
    origin,
    destination,
    departureDate,
    adults,
    nonstop,
    children,
    infants,
    maxPrice,
    travelClass,
  } = req.query;
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllFlights(
          origin,
          destination,
          departureDate,
          adults,
          nonstop,
          children,
          infants,
          maxPrice,
          travelClass
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getAllHotels = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllHotels(
          req.params.city,
          req.params.countryCode
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  getAllCountries,
  getAllStates,
  getAllCities,
  getAllAirports,
  getAllFlights,
  getAllHotels,
};
