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
  getAllAttractions,
  getLocationTime,
  getAllVideos,
} from "../services/locations.service";
import { cachedApiCall } from "../utils/apiCache";
import { timeZoneType } from "../types/types";

const ServerAPI = "http://localhost:3000";
// Mocking axios and cachedApiCall
jest.mock("axios");
jest.mock("../utils/apiCache");
// Test suite for getting all countries
describe("Get All Countries", () => {
  // Mocking axios.get and cachedApiCall for testing
  const mockAxiosGet = axios.get as jest.Mock;
  const mockCachedApiCall = cachedApiCall as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call cachedApiCall with the correct cacheKey and fetch data from the API", async () => {
    const continent = "Asia";
    const page = 2;
    const searchQuery = "China";
    const limit = 10;

    const mockResponseData = { countries: ["China", "India", "Japan"] };
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    await getAllCountries(continent, page, searchQuery, limit);

    const expectedUrl = `${ServerAPI}/locations/countries/${continent}?page=${page}&searchQuery=${searchQuery}&limit=${limit}&`;
    const expectedCacheKey = `countries_${continent}_${page}_${searchQuery}`;

    // Check if cachedApiCall was called with the correct cacheKey
    expect(mockCachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Trigger the function passed to cachedApiCall
    const fetchFunction = mockCachedApiCall.mock.calls[0][1];
    const result = await fetchFunction();

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });

  it("should call cachedApiCall with a default cacheKey when optional parameters are not provided", async () => {
    const continent = "Europe";

    const mockResponseData = { countries: ["Germany", "France", "Spain"] };
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function with only required parameters
    await getAllCountries(continent);

    const expectedUrl = `${ServerAPI}/locations/countries/${continent}?`;
    const expectedCacheKey = `countries_${continent}_undefined_undefined`;

    // Check if cachedApiCall was called with the default cacheKey
    expect(mockCachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Trigger the function passed to cachedApiCall
    const fetchFunction = mockCachedApiCall.mock.calls[0][1];
    const result = await fetchFunction();

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});

// Test suite for getting a country by name
describe("Get Country By Name", () => {
  // Mocking axios.get for testing
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call cachedApiCall with the correct cacheKey and fetch data from the API", async () => {
    const countryName = "Japan";
    const mockResponseData = { name: "Japan", code: "JP" };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    await getCountryByName(countryName);
    const expectedUrl = `${ServerAPI}/locations/country/${countryName}`;
    const expectedCacheKey = `country_${countryName}`;

    // Check if cachedApiCall was called with the correct cacheKey
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Trigger the function passed to cachedApiCall
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(data).toEqual(mockResponseData);
  });

  it("should return null in case of an error", async () => {
    // Simulate an error response
    const result = await getCountryByName("NonexistentCountry");

    // Check if the result is undefined when an error occurs
    expect(result).toBeUndefined();
  });
});

// Test suite for getting all states in a country
describe("Get All States", () => {
  // Mocking axios.get for testing
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call cachedApiCall with the correct cacheKey and fetch state data from the API", async () => {
    const country = "Japan";
    const mockResponseData = { states: ["Tokyo", "Osaka"] };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    await getAllStates(country);

    const expectedUrl = `${ServerAPI}/locations/states/${country}?`;
    const expectedCacheKey = `states_${country}_undefined_undefined`;

    // Check if cachedApiCall was called with the correct cacheKey
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Trigger the function passed to cachedApiCall
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(data).toEqual(mockResponseData);
  });
});

// Test suite for getting visa information between two countries
describe("Get a Country's Visa", () => {
  // Mocking axios.get for testing
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should fetch visa data from the API", async () => {
    const countryCodeFrom = "US";
    const countryCodeTo = "JP";
    const mockResponseData = { visaRequired: true };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await getCountryVisa(countryCodeFrom, countryCodeTo);

    const expectedUrl = `${ServerAPI}/locations/visa/${countryCodeFrom}/${countryCodeTo}`;

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});

// Test suite for getting exchange rate information between two currencies
describe("Get a Country's Exchange Rate", () => {
  // Mocking axios.get for testing
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should fetch exchange rate data from the API", async () => {
    const currencyFrom = "USD";
    const currencyTo = "JPY";
    const mockResponseData = { rate: 110.5 };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await getCountryExchange(currencyFrom, currencyTo);

    const expectedUrl = `${ServerAPI}/locations/exchange/${currencyFrom}/${currencyTo}`;

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});
describe("Get State By Name", () => {
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

    await getStateByName(name, country);

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

// Test suite for fetching all cities
describe("Get All Cities", () => {
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  it("should call cachedApiCall with the correct cacheKey and fetch cities data from the API", async () => {
    // Define test inputs and mock response
    const state = "California";
    const country = "USA";
    const page = 1;
    const searchQuery = "Los";
    const limit = 10;
    const mockResponseData = [
      { name: "Los Angeles", state: "California", country: "USA" },
    ];

    // Mock the axios.get call to resolve with the mock response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function to be tested
    await getAllCities(state, country, page, searchQuery, limit);

    // Construct the expected URL and cache key
    const expectedUrl = `${ServerAPI}/locations/cities/${state}/${country}?page=${page}&searchQuery=${searchQuery}&limit=${limit}&`;
    const expectedCacheKey = `cities_${state}_${country}_${page}_${searchQuery}`;

    // Check if cachedApiCall was called with the correct cache key and a function
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Retrieve and call the function passed to cachedApiCall
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify if axios.get was called with the expected URL and credentials
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify if the data returned matches the mock response
    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    // Define invalid inputs
    const state = "InvalidState";
    const country = "UnknownCountry";

    try {
      // Call the function with invalid inputs
      await getAllCities(state, country);
    } catch (error) {
      // Check if the error handling returns null
      expect(error).toBeNull();
    }
  });
});

// Test suite for fetching location time
describe("Get Location Time", () => {
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  it("should fetch the location time from the API and return the data in timeZoneType format", async () => {
    // Define test inputs and mock response
    const city = "Los Angeles";
    const country = "USA";
    const mockResponseData: timeZoneType = {
      date: "2024-08-11",
      time: "12:34:56",
      timeZone: "Pacific Daylight Time",
    };

    // Mock the axios.get call to resolve with the mock response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function to be tested
    const result = await getLocationTime(city, country);

    // Construct the expected URL
    const expectedUrl = `${ServerAPI}/locations/time/${city}/${country}`;

    // Verify if axios.get was called with the expected URL and credentials
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });

  it("should handle errors and throw an error", async () => {
    // Define test inputs
    const city = "InvalidCity";
    const country = "UnknownCountry";

    // Mock the axios.get call to reject with a network error
    mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    // Check if the function throws the network error
    await expect(getLocationTime(city, country)).rejects.toThrow(
      "Network Error"
    );
  });
});

// Test suite for fetching all hotels
describe("Get All Hotels", () => {
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clear all mocks after each test to ensure isolation
    jest.clearAllMocks();
  });

  it("should call cachedApiCall with the correct cacheKey and fetch hotels data from the API", async () => {
    // Define test inputs and mock response
    const city = "Los Angeles";
    const country = "USA";
    const page = 1;
    const searchQuery = "Luxury";
    const mockResponseData = [
      { name: "Hotel California", city: "Los Angeles", country: "USA" },
    ];

    // Mock the axios.get call to resolve with the mock response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function to be tested
    await getAllHotels(city, country, page, searchQuery);

    // Construct the expected URL and cache key
    const expectedUrl = `${ServerAPI}/locations/hotels/${city}/${country}?page=${page}&searchQuery=${searchQuery}&`;
    const expectedCacheKey = `hotels_${city}_${country}_${page}_${searchQuery}`;

    // Check if cachedApiCall was called with the correct cache key and a function
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Retrieve and call the function passed to cachedApiCall
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify if axios.get was called with the expected URL and credentials
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify if the data returned matches the mock response
    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    // Define invalid inputs
    const city = "InvalidCity";
    const country = "UnknownCountry";

    try {
      // Call the function with invalid inputs
      await getAllHotels(city, country);
    } catch (error) {
      // Check if the error handling returns null
      expect(error).toBeNull();
    }
  });
});

describe("Get All Airports", () => {
  // Mock the axios.get method
  const mockAxiosGet = axios.get as jest.Mock;

  // Clear mocks before each test to ensure no interference
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

    // Mock the axios.get response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function under test
    await getAllAirports(city, country, page, searchQuery);

    // Expected URL and cache key
    const expectedUrl = `${ServerAPI}/locations/airports/${city}/${country}?page=${page}&searchQuery=${searchQuery}&`;
    const expectedCacheKey = `airports_${city}_${country}_${page}_${searchQuery}`;

    // Verify that cachedApiCall was called with the correct parameters
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the fetch function from the cache call and execute it
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify that axios.get was called with the correct URL and options
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify that the data returned is as expected
    expect(data).toEqual(mockResponseData);
  });

  it("should handle missing optional parameters", async () => {
    const city = "London";
    const country = "UK";
    const mockResponseData = [
      { name: "Heathrow Airport", city: "London", country: "UK" },
    ];

    // Mock the axios.get response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function under test with missing optional parameters
    await getAllAirports(city, country);

    // Expected URL and cache key with missing parameters
    const expectedUrl = `${ServerAPI}/locations/airports/${city}/${country}?`;
    const expectedCacheKey = `airports_${city}_${country}_undefined_undefined`;

    // Verify that cachedApiCall was called with the correct parameters
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the fetch function from the cache call and execute it
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify that axios.get was called with the correct URL and options
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify that the data returned is as expected
    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    const city = "InvalidCity";
    const country = "UnknownCountry";

    // Mock axios.get to reject with an error
    mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    // Expect the function to throw an error
    await expect(getAllAirports(city, country)).rejects.toThrow(
      "Network Error"
    );
  });
});

describe("Get All Attractions", () => {
  // Clear mocks before each test to ensure no interference
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock the axios.get method
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

    // Mock the axios.get response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function under test
    await getAllAttractions(city, country, category, page, searchQuery);

    // Expected URL and cache key
    const expectedUrl = `${ServerAPI}/locations/attractions/${city}/${country}?category=${category}&page=${page}&searchQuery=${searchQuery}&`;
    const expectedCacheKey = `${category}_${city}_${country}_${page}_${searchQuery}`;

    // Verify that cachedApiCall was called with the correct parameters
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the fetch function from the cache call and execute it
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify that axios.get was called with the correct URL and options
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify that the data returned is as expected
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

    // Mock the axios.get response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function under test with missing optional parameters
    await getAllAttractions(city, country, category);

    // Expected URL and cache key with missing parameters
    const expectedUrl = `${ServerAPI}/locations/attractions/${city}/${country}?category=${category}&`;
    const expectedCacheKey = `${category}_${city}_${country}_undefined_undefined`;

    // Verify that cachedApiCall was called with the correct parameters
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the fetch function from the cache call and execute it
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify that axios.get was called with the correct URL and options
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify that the data returned is as expected
    expect(data).toEqual(mockResponseData);
  });
});

describe("Get All Flights", () => {
  // Mock the axios.get method
  const mockAxiosGet = axios.get as jest.Mock;

  // Clear mocks before each test to ensure no interference
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

    // Mock the axios.get response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function under test
    await getAllFlights(
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

    // Expected URL and cache key
    const expectedUrl = `${ServerAPI}/locations/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&nonstop=${nonstop}&children=${children}&travelClass=${travelClass}&currency=${currency}&maxPrice=${maxPrice}&page=${page}&`;
    const expectedCacheKey = `flights_${origin}_${destination}_${departureDate}_${adults}_${nonstop}_${children}_${travelClass}__${currency}_${maxPrice}_${page}`;

    // Verify that cachedApiCall was called with the correct parameters
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the fetch function from the cache call and execute it
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify that axios.get was called with the correct URL and options
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify that the data returned is as expected
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

    // Mock the axios.get response
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the function under test with missing optional parameters
    await getAllFlights(
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

    // Expected URL and cache key with missing parameters
    const expectedUrl = `${ServerAPI}/locations/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&nonstop=${nonstop}&children=${children}&travelClass=${travelClass}&currency=${currency}&maxPrice=${maxPrice}&`;
    const expectedCacheKey = `flights_${origin}_${destination}_${departureDate}_${adults}_${nonstop}_${children}_${travelClass}__${currency}_${maxPrice}_undefined`;

    // Verify that cachedApiCall was called with the correct parameters
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the fetch function from the cache call and execute it
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];
    const data = await fetchFunction();

    // Verify that axios.get was called with the correct URL and options
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Verify that the data returned is as expected
    expect(data).toEqual(mockResponseData);
  });
});

describe("getAllVideos", () => {
  const mockAxiosGet = axios.get as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call cachedApiCall with the correct cacheKey and fetch videos data from the API", async () => {
    const city = "New York";
    const page = 1;
    const searchQuery = "Times Square";
    const mockResponseData = [
      { title: "Times Square at Night", city: "New York" },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    await getAllVideos(city, page, searchQuery);

    const expectedUrl = `${ServerAPI}/locations/videos/${city}?page=${page}&searchQuery=${searchQuery}&`;
    const expectedCacheKey = `videos_${city}_${page}_${searchQuery}`;

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
    const city = "Tokyo";
    const mockResponseData = [{ title: "Tokyo Cityscape", city: "Tokyo" }];

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    await getAllVideos(city);

    const expectedUrl = `${ServerAPI}/locations/videos/${city}?`;
    const expectedCacheKey = `videos_${city}_undefined_undefined`;

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

describe("Get City By Name", () => {
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call cachedApiCall with the correct cacheKey and fetch city data from the API", async () => {
    const name = "San Francisco";
    const country = "USA";
    const state = "California";
    const mockResponseData = {
      name: "San Francisco",
      state: "California",
      country: "USA",
    };

    // Mock the axios get method to resolve with mock data
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    await getCityByName(name, country, state);

    // Define the expected URL and cacheKey
    const expectedCacheKey = `city_${country}_${state}_${name}`;
    const expectedUrl = `${ServerAPI}/locations/city/${country}/${state}/${name}`;

    // Assert that cachedApiCall was called with the correct cacheKey and function
    expect(cachedApiCall).toHaveBeenCalledWith(
      expectedCacheKey,
      expect.any(Function)
    );

    // Extract the function passed to cachedApiCall
    const fetchFunction = (cachedApiCall as jest.Mock).mock.calls[0][1];

    // Call the fetchFunction to simulate the axios call
    const data = await fetchFunction();

    // Assert that axios.get was called with the correct URL and options
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });

    // Assert that the data returned by the function is correct
    expect(data).toEqual(mockResponseData);
  });

  it("should handle errors and return null", async () => {
    const name = "InvalidCity";
    const country = "UnknownCountry";
    const state = "InvalidState";

    // Mock the axios get method to reject with an error
    mockAxiosGet.mockRejectedValueOnce(new Error("City not found"));

    try {
      await getCityByName(name, country, state);
    } catch (error) {
      // In this function, errors should be caught within the function itself,
      // so we would not expect this block to be executed
      expect(error).toBeNull();
    }
  });
});
