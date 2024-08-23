import locationsService, { flightType } from "../services/locations.service.js";
import { Request, Response } from "express";

// Handler to get a paginated list of all countries from a specified continent
const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract query parameters for pagination and search query
    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery =
      typeof req.query.searchQuery === "string"
        ? req.query.searchQuery
        : undefined;
        const limit =
          typeof req.query.limit === "string"
            ? Number(req.query.limit)
            : undefined;

        // Retrieve countries using the locations service and send response
        res
          .status(200)
          .json(
            await locationsService.getAllCountries(
              req.params.continent,
              page,
              searchQuery,
              limit || 10
            )
          );
  } catch (err: any) {
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get details of a specific country by its name
const getCountryByName = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve country details using the locations service and send response
    res
      .status(200)
      .json(await locationsService.getCountryByName(req.params.name));
  } catch (err: any) {
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get a paginated list of all states in a specific country
const getAllStates = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract query parameters for pagination and search query
    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery =
      typeof req.query.searchQuery === "string"
        ? req.query.searchQuery
        : undefined;

    // Retrieve states using the locations service and send response
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
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get details of a specific state by its name within a given country
const getStateByName = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve state details using the locations service and send response
    res
      .status(200)
      .json(
        await locationsService.getStateByName(
          req.params.name,
          req.params.country
        )
      );
  } catch (err: any) {
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get a paginated list of all cities within a specific state and country
const getAllCities = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract query parameters for pagination and search query
    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : undefined;
    const searchQuery =
      typeof req.query.searchQuery === "string"
        ? req.query.searchQuery
        : undefined;

    // Retrieve cities using the locations service and send response
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
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get details of a specific city by its name within a given country and state
const getCityByName = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve city details using the locations service and send response
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
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get a paginated list of all airports within a specific city and region
const getAllAirports = async (req: Request, res: Response): Promise<void> => {
  // Extract query parameters for pagination and search query
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : undefined;
  const searchQuery =
    typeof req.query.searchQuery === "string"
      ? req.query.searchQuery
      : undefined;

  try {
    // Retrieve airports using the locations service and send response
    res
      .status(200)
      .json(
        await locationsService.getAllAirports(
          req.params.city,
          req.params.region,
          page,
          searchQuery
        )
      );
  } catch (err: any) {
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get a list of all flights based on various query parameters
const getAllFlights = async (
  req: Request<any, any, any, flightType>,
  res: Response
): Promise<void> => {
  // Extract query parameters for flight search
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
    // Retrieve flights using the locations service and send response
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
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get a paginated list of all hotels within a specific city and country
const getAllHotels = async (req: Request, res: Response): Promise<void> => {
  // Extract query parameters for pagination and search query
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : undefined;
  const searchQuery =
    typeof req.query.searchQuery === "string"
      ? req.query.searchQuery
      : undefined;

  try {
    // Retrieve hotels using the locations service and send response
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
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};
interface AttractionReqInterface {
  category?: string; // Optional category parameter
}
// Handler to get a list of all attractions based on category within a specific city and country
const getAllAttractions = async (
  req: Request<any, any, any, AttractionReqInterface>,
  res: Response
): Promise<void> => {
  try {
    // Retrieve attractions using the locations service and send response
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
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get YouTube videos related to a specific city
const getYoutubeVideos = async (req: Request, res: Response): Promise<void> => {
  // Extract query parameters for pagination and search query
  const page =
    typeof req.query.page === "string" ? Number(req.query.page) : undefined;
  const searchQuery =
    typeof req.query.searchQuery === "string"
      ? req.query.searchQuery
      : undefined;

  try {
    // Retrieve YouTube videos using the locations service and send response
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
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get visa requirements for traveling between two countries
const getCountryVisa = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve visa requirements using the locations service and send response
    res
      .status(200)
      .json(
        await locationsService.getCountryVisa(
          req.params.countryCodeFrom,
          req.params.countryCodeTo
        )
      );
  } catch (err: any) {
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get exchange rate between two currencies
const getCountryExchangeRate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Retrieve exchange rate using the locations service and send response
    res
      .status(200)
      .json(
        await locationsService.getCountryExchangeRate(
          req.params.currencyFrom,
          req.params.currencyTo
        )
      );
  } catch (err: any) {
    // Handle errors and send a response with status 400
    res.status(400).json({ message: err.message });
  }
};

// Handler to get current time for a specific city and country
const getLocationTime = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve current time using the locations service and send response
    res
      .status(200)
      .json(
        await locationsService.getLocationTime(
          req.params.city,
          req.params.countryCode
        )
      );
  } catch (err: any) {
    // Handle errors and send a response with status 400
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
  getCountryExchangeRate,
  getLocationTime,
};
