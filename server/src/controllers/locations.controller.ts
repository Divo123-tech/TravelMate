import locationsService from "../services/locations.service.js";
import { Request, Response } from "express";

const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(await locationsService.getAllCountries(req.params.continent));
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

type travelClassType = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
interface FlightInterface {
  origin: string;
  destination: string;
  departureDate: string;
  adults: number;
  nonstop: boolean;
  children?: number;
  infants?: number;
  maxPrice?: number;
  travelClass?: travelClassType;
}
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

interface AttractionReqInterface {
  category: string;
}

const getAllAttractions = async (
  req: Request<any, any, any, AttractionReqInterface>,
  res: Response
): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllAttractions(
          req.params.city,
          req.params.countryCode,
          req.query.category || "attractions"
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getYoutubeVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(await locationsService.getYoutubeVideos(req.params.city));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getCountryDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getCountryDetails(
          req.params.countryCodeFrom,
          req.params.countryCodeTo,
          req.params.currencyFrom,
          req.params.currencyTo
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getLocationTime = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getLocationTime(
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
  getAllAttractions,
  getYoutubeVideos,
  getCountryDetails,
  getLocationTime,
};
