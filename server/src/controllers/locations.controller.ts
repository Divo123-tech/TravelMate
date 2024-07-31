import locationsService from "../services/locations.service.js";
import { Request, Response } from "express";

const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery =
      typeof req.query.searchQuery == "string"
        ? req.query.searchQuery
        : undefined;
    const limit =
      typeof req.query.limit == "string" ? Number(req.query.limit) : undefined;
    res
      .status(200)
      .json(
        await locationsService.getAllCountries(
          req.params.continent,
          page,
          searchQuery,
          limit
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getCountryByName = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(await locationsService.getCountryByName(req.params.name));
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getAllStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery =
      typeof req.query.searchQuery == "string"
        ? req.query.searchQuery
        : undefined;
    res
      .status(200)
      .json(
        await locationsService.getAllStates(
          req.params.country,
          page,
          searchQuery
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getStateByName = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getStateByName(
          req.params.name,
          req.params.country
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getAllCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery =
      typeof req.query.searchQuery == "string"
        ? req.query.searchQuery
        : undefined;
    res
      .status(200)
      .json(
        await locationsService.getAllCities(
          req.params.state,
          req.params.country,
          page,
          searchQuery
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getCityByName = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getCityByName(
          req.params.name,
          req.params.country,
          req.params.state
        )
      );
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

const getAllAirports = async (req: Request, res: Response): Promise<void> => {
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : undefined;
  const searchQuery =
    typeof req.query.searchQuery == "string"
      ? req.query.searchQuery
      : undefined;
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllAirports(
          req.params.region,
          req.params.countryCode,
          page,
          searchQuery
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
  currency: string;
  children?: number;
  infants?: number;
  maxPrice?: number;
  travelClass?: travelClassType;
  page?: number;
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
    currency,
    children,
    infants,
    maxPrice,
    travelClass,
  } = req.query;
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : undefined;
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
          currency,
          children,
          infants,
          maxPrice,
          travelClass,
          page
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getAllHotels = async (req: Request, res: Response): Promise<void> => {
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : undefined;
  const searchQuery =
    typeof req.query.searchQuery == "string"
      ? req.query.searchQuery
      : undefined;
  try {
    res
      .status(200)
      .json(
        await locationsService.getAllHotels(
          req.params.city,
          req.params.countryCode,
          page,
          searchQuery
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
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : undefined;
  const searchQuery =
    typeof req.query.searchQuery == "string"
      ? req.query.searchQuery
      : undefined;
  try {
    res
      .status(200)
      .json(
        await locationsService.getYoutubeVideos(
          req.params.city,
          page,
          searchQuery
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getCountryVisa = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getCountryVisa(
          req.params.countryCodeFrom,
          req.params.countryCodeTo
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getCountryExchangeRate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res
      .status(200)
      .json(
        await locationsService.getCountryExchangeRate(
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
  getCountryByName,
  getAllStates,
  getStateByName,
  getAllCities,
  getCityByName,
  getAllAirports,
  getAllFlights,
  getAllHotels,
  getAllAttractions,
  getYoutubeVideos,
  getCountryVisa,
  getLocationTime,
  getCountryExchangeRate,
};
