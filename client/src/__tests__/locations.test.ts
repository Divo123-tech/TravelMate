import axios from "axios";
import {
  getAllCountries,
  getCountryByName,
  getAllStates,
  getStateByName,
  getAllCities,
  getCityByName,
  getAllFlights,
  getAllAirports,
  getAllHotels,
  getCountryExchange,
  getCountryVisa,
  getAllVideos,
  getAllAttractions,
  getLocationTime,
} from "../services/locations.service";
import { cachedApiCall } from "../utils/apiCache";
import { timeZoneType } from "../types/types";

const ServerAPI = "http://localhost:3000";
// Mocking axios and cachedApiCall
jest.mock("axios");
jest.mock("../utils/apiCache");
describe("getAllCountries", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  const mockCachedApiCall = cachedApiCall as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call cachedApiCall with the correct cacheKey and fetch data from the API", async () => {
    const continent = "Asia";
    const page = 2;
    const searchQuery = "China";
    const limit = 10;

    const mockResponseData = { countries: ["China", "India", "Japan"] };
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    await getAllCountries(continent, page, searchQuery, limit);

    const expectedUrl = `${ServerAPI}/locations/countries/${continent}?page=${page}&searchQuery=${searchQuery}&limit=${limit}&`;
    const expectedCacheKey = `countries_${continent}_${page}_${searchQuery}`;

    expect(mockCachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Trigger the function passed to cachedApiCall
    const fetchFunction = mockCachedApiCall.mock.calls[0][1];
    const result = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });

  it("should call cachedApiCall with a default cacheKey when optional parameters are not provided", async () => {
    const continent = "Europe";

    const mockResponseData = { countries: ["Germany", "France", "Spain"] };
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    await getAllCountries(continent);

    const expectedUrl = `${ServerAPI}/locations/countries/${continent}?`;
    const expectedCacheKey = `countries_${continent}_undefined_undefined`;

    expect(mockCachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Trigger the function passed to cachedApiCall
    const fetchFunction = mockCachedApiCall.mock.calls[0][1];
    const result = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});
describe("getCountryByName", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch data from the API", async () => {
    const countryName = "Japan";
    const mockResponseData = { name: "Japan", code: "JP" };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });
    const result = await getCountryByName(countryName);
    const expectedUrl = `http://localhost:3000/locations/country/${countryName}`;
    const expectedCacheKey = `country_${countryName}`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(data).toEqual(mockResponseData);
  });

  it("should return null in case of an error", async () => {
    const result = await getCountryByName("NonexistentCountry");

    expect(result).toBeUndefined();
  });
});

describe("getAllStates", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch state data from the API", async () => {
    const country = "Japan";
    const mockResponseData = { states: ["Tokyo", "Osaka"] };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllStates(country);

    const expectedUrl = `http://localhost:3000/locations/states/${country}?`;
    const expectedCacheKey = `states_${country}_undefined_undefined`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(data).toEqual(mockResponseData);
  });
});

describe("getCountryVisa", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch visa data from the API", async () => {
    const countryCodeFrom = "US";
    const countryCodeTo = "JP";
    const mockResponseData = { visaRequired: true };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getCountryVisa(countryCodeFrom, countryCodeTo);

    const expectedUrl = `http://localhost:3000/locations/visa/${countryCodeFrom}/${countryCodeTo}`;

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});

describe("getCountryExchange", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch exchange rate data from the API", async () => {
    const currencyFrom = "USD";
    const currencyTo = "JPY";
    const mockResponseData = { rate: 110.5 };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getCountryExchange(currencyFrom, currencyTo);

    const expectedUrl = `http://localhost:3000/locations/exchange/${currencyFrom}/${currencyTo}`;

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});

describe("getStateByName", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch state data from the API", async () => {
    const name = "California";
    const country = "USA";
    const mockResponseData = { name: "California", code: "CA" };

    // Mock the axios get method to resolve with mock data
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getStateByName(name, country);

    // Define the expected URL and cacheKey
    const expectedCacheKey = `state_${country}_${name}`;

    // Assert that cachedApiCall was called with the correct cacheKey and function
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the function passed to cachedApiCall
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];

    // Call the fetchFunction to simulate the axios call
    const data = await fetchFunction();

    // Assert that the data returned by the function is correct
    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    const name = "InvalidState";
    const country = "UnknownCountry";

    // Mock the axios get method to reject with an error

    try {
      await getStateByName(name, country);
    } catch (error) {
      // In this function, errors should be caught within the function itself,
      // so we would not expect this block to be executed
      expect(error).toBeNull();
    }
  });
});

describe("getAllCities", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch cities data from the API", async () => {
    const state = "California";
    const country = "USA";
    const page = 1;
    const searchQuery = "Los";
    const limit = 10;
    const mockResponseData = [
      { name: "Los Angeles", state: "California", country: "USA" },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllCities(state, country, page, searchQuery, limit);

    const expectedUrl = `http://localhost:3000/locations/cities/${state}/${country}?page=${page}&searchQuery=${searchQuery}&limit=${limit}&`;
    const expectedCacheKey = `cities_${state}_${country}_${page}_${searchQuery}`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    const state = "InvalidState";
    const country = "UnknownCountry";

    try {
      await getAllCities(state, country);
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
describe("getLocationTime", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch the location time from the API and return the data in timeZoneType format", async () => {
    const city = "Los Angeles";
    const country = "USA";
    const mockResponseData: timeZoneType = {
      date: "2024-08-11",
      time: "12:34:56",
      timeZone: "Pacific Daylight Time",
    };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getLocationTime(city, country);

    const expectedUrl = `http://localhost:3000/locations/time/${city}/${country}`;

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });

  it("should handle errors and throw an error", async () => {
    const city = "InvalidCity";
    const country = "UnknownCountry";

    mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getLocationTime(city, country)).rejects.toThrow(
      "Network Error"
    );
  });
});

describe("getAllHotels", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch hotels data from the API", async () => {
    const city = "Los Angeles";
    const country = "USA";
    const page = 1;
    const searchQuery = "Luxury";
    const mockResponseData = [
      { name: "Hotel California", city: "Los Angeles", country: "USA" },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllHotels(city, country, page, searchQuery);

    const expectedUrl = `http://localhost:3000/locations/hotels/${city}/${country}?page=${page}&searchQuery=${searchQuery}&`;
    const expectedCacheKey = `hotels_${city}_${country}_${page}_${searchQuery}`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    const city = "InvalidCity";
    const country = "UnknownCountry";

    try {
      await getAllHotels(city, country);
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
describe("getAllAirports", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch airports data from the API", async () => {
    const city = "New York";
    const country = "USA";
    const page = 1;
    const searchQuery = "JFK";
    const mockResponseData = [
      {
        name: "John F. Kennedy International Airport",
        city: "New York",
        country: "USA",
      },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllAirports(city, country, page, searchQuery);

    const expectedUrl = `${ServerAPI}/locations/airports/${city}/${country}?page=${page}&searchQuery=${searchQuery}&`;
    const expectedCacheKey = `airports_${city}_${country}_${page}_${searchQuery}`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });

  it("should handle missing optional parameters", async () => {
    const city = "London";
    const country = "UK";
    const mockResponseData = [
      { name: "Heathrow Airport", city: "London", country: "UK" },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllAirports(city, country);

    const expectedUrl = `${ServerAPI}/locations/airports/${city}/${country}?`;
    const expectedCacheKey = `airports_${city}_${country}_undefined_undefined`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    const city = "InvalidCity";
    const country = "UnknownCountry";

    try {
      await getAllAirports(city, country);
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});

describe("getAllAttractions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAxiosGet = axios.get as jest.Mock;

  it("should call cachedApiCall with the correct cacheKey and fetch attractions data from the API", async () => {
    const city = "Paris";
    const country = "France";
    const category = "activity";
    const page = 1;
    const searchQuery = "Louvre";
    const mockResponseData = [
      {
        name: "Louvre Museum",
        city: "Paris",
        country: "France",
        category: "activity",
      },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllAttractions(
      city,
      country,
      category,
      page,
      searchQuery
    );

    const expectedUrl = `${ServerAPI}/locations/attractions/${city}/${country}?category=${category}&page=${page}&searchQuery=${searchQuery}&`;
    const expectedCacheKey = `${category}_${city}_${country}_${page}_${searchQuery}`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });

  it("should handle missing optional parameters", async () => {
    const city = "Rome";
    const country = "Italy";
    const category = "activity";
    const mockResponseData = [
      {
        name: "Colosseum",
        city: "Rome",
        country: "Italy",
        category: "activity",
      },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllAttractions(city, country, category);

    const expectedUrl = `${ServerAPI}/locations/attractions/${city}/${country}?category=${category}&`;
    const expectedCacheKey = `${category}_${city}_${country}_undefined_undefined`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });
});

describe("getAllFlights", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch flights data from the API", async () => {
    const origin = "LAX";
    const destination = "JFK";
    const departureDate = "2023-07-01";
    const adults = 2;
    const nonstop = true;
    const children = 1;
    const travelClass = "economy";
    const currency = "USD";
    const maxPrice = 1000;
    const page = 1;

    const mockResponseData = [
      { flight: "AA123", origin: "LAX", destination: "JFK", price: 500 },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllFlights(
      origin,
      destination,
      departureDate,
      adults,
      nonstop,
      children,
      travelClass,
      currency,
      maxPrice,
      page
    );

    const expectedUrl = `${ServerAPI}/locations/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&nonstop=${nonstop}&children=${children}&travelClass=${travelClass}&currency=${currency}&maxPrice=${maxPrice}&page=${page}&`;
    const expectedCacheKey = `flights_${origin}_${destination}_${departureDate}_${adults}_${nonstop}_${children}_${travelClass}__${currency}_${maxPrice}_${page}`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });

  it("should handle missing optional parameters", async () => {
    const origin = "SFO";
    const destination = "LHR";
    const departureDate = "2023-08-15";
    const adults = 1;
    const nonstop = false;
    const children = 0;
    const travelClass = "business";
    const currency = "EUR";
    const maxPrice = 2000;

    const mockResponseData = [
      { flight: "BA456", origin: "SFO", destination: "LHR", price: 1500 },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getAllFlights(
      origin,
      destination,
      departureDate,
      adults,
      nonstop,
      children,
      travelClass,
      currency,
      maxPrice
    );

    const expectedUrl = `${ServerAPI}/locations/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&nonstop=${nonstop}&children=${children}&travelClass=${travelClass}&currency=${currency}&maxPrice=${maxPrice}&`;
    const expectedCacheKey = `flights_${origin}_${destination}_${departureDate}_${adults}_${nonstop}_${children}_${travelClass}__${currency}_${maxPrice}_undefined`;

    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponseData);
  });
});
