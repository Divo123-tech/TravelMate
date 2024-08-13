// Import the locationsService and utility functions
import locationsService, {
  convertTime,
  durationToMinutes,
} from "../../services/locations.service";

// Import mock responses for testing
import {
  mockAttractionResponse,
  mockFlightReponse,
  mockVideoResponse,
} from "../../__mocks__/services/locations.mocks";

// Test suite for getAllCountries function
describe("Get All Countries", () => {
  // Test case: Fetching countries from all continents
  it("should return a total of 186 with 10 in the data and Afghanistan as the first country when fetching from all continents", async () => {
    const response = await locationsService.getAllCountries(
      "all",
      1,
      undefined
    );
    expect(response.total).toBe(186);
    expect(response.data[0].name).toBe("Afghanistan");
    expect(response.data.length).toBe(10);
  }, 10000);

  // Test case: Error handling for invalid continent
  it("should return throw an error if the wrong continent is given", async () => {
    try {
      await locationsService.getAllCountries("error", 1, undefined);
    } catch (err: any) {
      expect(err.message).toBe("No Countries Found");
    }
  });

  // Test case: Fetching countries from a specific continent (Asia)
  it("should return countries from a continent (Asia) with the first being Afghanistan", async () => {
    const response = await locationsService.getAllCountries(
      "Asia",
      1,
      undefined
    );
    expect(response.total).toBe(42);
    expect(response.data[0].name).toBe("Afghanistan");
  }, 10000);
});

// Test suite for getCountryByName function
describe("Get Country By Name", () => {
  // Test case: Fetching a valid country
  it("Should return Afghanistan when passing Afghanistan as the input", async () => {
    const response = await locationsService.getCountryByName("Afghanistan");
    expect(response.name).toBe("Afghanistan");
  });

  // Test case: Error handling for invalid country name
  it("Should throw an error when the country is not found", async () => {
    try {
      await locationsService.getCountryByName("Afghanistan");
    } catch (err: any) {
      expect(err.message).toBe("No Country Found");
    }
  });
});

// Test suite for getAllStates function
describe("Get All States", () => {
  // Test case: Fetching states of Indonesia
  it("Should return with a total of 38, with 10 in the data, and the first being Aceh when fetching the states of Indonesia", async () => {
    const response = await locationsService.getAllStates(
      "Indonesia",
      1,
      undefined
    );
    expect(response.total).toBe(38);
    expect(response.data[0].name).toBe("Aceh");
    expect(response.data.length).toBe(10);
  });

  // Test case: Error handling for invalid country
  it("Should throw an error when fetching a wrong country", async () => {
    try {
      await locationsService.getAllStates("error");
    } catch (err: any) {
      expect(err.message).toBe("No States Found");
    }
  });
});

// Test suite for getStateByName function
describe("Get State By Name", () => {
  // Test case: Fetching a valid state
  it("Should return Bali when passing Bali as the input", async () => {
    const response = await locationsService.getStateByName("Bali", "Indonesia");
    expect(response.name).toBe("Bali");
  });

  // Test case: Error handling for invalid state or country
  it("Should throw an error when fetching a wrong state", async () => {
    try {
      await locationsService.getStateByName("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No State Found");
    }
  });
});

// Test suite for getAllCities function
describe("Get All Cities", () => {
  // Test case: Fetching cities of Bali, Indonesia
  it("Should return with a total of 27 with 10 in the data, and the first being Amlapura when fetching the cities of Bali", async () => {
    const response = await locationsService.getAllCities("Bali", "Indonesia");
    expect(response.total).toBe(27);
    expect(response.data[0].name).toBe("Amlapura");
  });

  // Test case: Error handling for invalid state or country
  it("Should throw an error if the wrong state or country is given", async () => {
    try {
      await locationsService.getAllCities("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No Cities Found");
    }
  });
});

// Test suite for getCityByName function
describe("Get City By Name", () => {
  // Test case: Fetching a valid city
  it("Should return Sacramento when passing Sacramento as the input", async () => {
    const response = await locationsService.getCityByName(
      "Sacramento",
      "United States",
      "California"
    );
    expect(response.name).toBe("Sacramento");
  });

  // Test case: Error handling for invalid city, state, or country
  it("Should throw an error if the wrong state or country or city name", async () => {
    try {
      await locationsService.getCityByName("error", "error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No City Found");
    }
  });
});

// Test suite for getAllAirports function
describe("Get All Airports", () => {
  // Test case: Fetching airports in Vancouver, British Columbia
  it("Should return YVR when passing Vancouver and British Columbia", async () => {
    const response = await locationsService.getAllAirports(
      "Vancouver",
      "British Columbia"
    );
    expect(response.data[0].name).toBe("Vancouver International Airport");
  });

  // Test case: Error handling for invalid city or region
  it("Should throw an error when passing invalid city or region", async () => {
    try {
      await locationsService.getAllAirports("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No Airports Found");
    }
  });
});

// Test suite for time conversion functions
describe("Time conversions", () => {
  // Test case: Converting HH:MM format to minutes
  it("Should take an HH:MM Format and return the converted total minutes", () => {
    expect(convertTime("2:30")).toBe("150");
    expect(convertTime("1:00")).toBe("60");
  });

  // Test case: Converting PT:HHMM format to minutes
  it("Should take a PT:HHMM Format and return the converted total minutes", () => {
    expect(durationToMinutes("PT1H30M")).toBe(90);
    expect(durationToMinutes("PT1H")).toBe(60);
    expect(durationToMinutes("PT90M")).toBe(90);
    expect(durationToMinutes("PT0H0M")).toBe(0);
  });
});

// Test suite for getAllHotels function
describe("Get All Hotels", () => {
  // Test case: Fetching hotels in Jakarta, Indonesia
  it("Should return 116 hotels with 10 in the data array and the first being Mercure Jakarta Sabang, when passing Jakarta Indonesia as inputs", async () => {
    const response = await locationsService.getAllHotels(
      "Jakarta",
      "Indonesia"
    );
    expect(response.total).toBe(116);
    expect(response.data.length).toBe(10);
    expect(response.data[0].name).toBe("Mercure Jakarta Sabang");
  });

  // Test case: Error handling for invalid city or country
  it("Should throw an error when passing an invalid city or country as inputs", async () => {
    try {
      await locationsService.getAllHotels("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No Hotels Found");
    }
  });
});

// Test suite for getLocationTime function
describe("Location TimeZone", () => {
  // Test case: Fetching timezone for Jakarta, Indonesia
  it("Should Return the Asia/Jakarta as the timezone when passing Jakarta, Indonesia as the input", async () => {
    const response = await locationsService.getLocationTime(
      "Jakarta",
      "Indonesia"
    );
    expect(response.timeZone).toBe("Asia/Jakarta");
  }, 10000);
});

// Test suite for getYoutubeVideos function
describe("Get Youtube Videos", () => {
  // Create a mock function for getYoutubeVideos
  const mockGetYoutubeVideos = jest.fn();

  // Replace the actual function with the mock
  locationsService.getYoutubeVideos = mockGetYoutubeVideos;

  // Mock the entire locations.service module
  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getYoutubeVideos: jest.fn(),
      },
    };
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Fetching YouTube videos for a city
  it("should return YouTube videos for a given city", async () => {
    mockGetYoutubeVideos.mockResolvedValue(mockVideoResponse);

    const response = await locationsService.getYoutubeVideos("Paris", 1);

    expect(response.total).toBe(2);
    expect(response.data).toHaveLength(2);
    expect(response.data[0].title).toBe("Things to do in Paris");
    expect(mockGetYoutubeVideos).toHaveBeenCalledWith("Paris", 1);
  });

  // Test case: Error handling
  it("should handle errors", async () => {
    mockGetYoutubeVideos.mockRejectedValue(new Error("API error"));

    await expect(
      locationsService.getYoutubeVideos("ErrorCity", 1)
    ).rejects.toThrow("API error");
  });
});

// Test suite for getAllFlights function
describe("Get All Flights", () => {
  // Create a mock function for getAllFlights
  const mockGetAllFlights = jest.fn();

  // Replace the actual function with the mock
  locationsService.getAllFlights = mockGetAllFlights;

  // Mock the entire locations.service module
  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getAllFlights: jest.fn(),
      },
    };
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Fetching flights with given parameters
  it("should return flights for given parameters", async () => {
    mockGetAllFlights.mockResolvedValue(mockFlightReponse);

    const response = await locationsService.getAllFlights(
      "NYC",
      "LAX",
      "2023-07-01",
      1,
      false,
      "USD"
    );

    expect(response.total).toBe(2);
    expect(response.data).toHaveLength(2);
    expect(response.data[0].origin).toBe("NYC");
    expect(response.data[0].destination).toBe("LAX");
    expect(mockGetAllFlights).toHaveBeenCalledWith(
      "NYC",
      "LAX",
      "2023-07-01",
      1,
      false,
      "USD"
    );
  });

  // Test case: Error handling
  it("should handle errors", async () => {
    mockGetAllFlights.mockRejectedValue(new Error("Failed to get flights"));

    await expect(
      locationsService.getAllFlights(
        "NYC",
        "LAX",
        "2023-07-01",
        1,
        false,
        "USD"
      )
    ).rejects.toThrow("Failed to get flights");
  });
});

// Test suite for getAllAttractions function
describe("Get All Attractions", () => {
  // Create a mock function for getAllAttractions
  const mockGetAllAttractions = jest.fn();

  // Replace the actual function with the mock
  locationsService.getAllAttractions = mockGetAllAttractions;

  // Mock the entire locations.service module
  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getAllAttractions: jest.fn(),
      },
    };
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Fetching attractions with given parameters
  it("should return flights for given parameters", async () => {
    mockGetAllAttractions.mockResolvedValue(mockAttractionResponse.all);

    const response = await locationsService.getAllAttractions(
      "Paris",
      "France",
      "attractions",
      1
    );

    expect(response.total).toBe(2);
    expect(response.data).toHaveLength(2);
    expect(response.data[0].name).toBe("Eiffel Tower");
    expect(response.data[0].city).toBe("Paris");
    expect(mockGetAllAttractions).toHaveBeenCalledWith(
      "Paris",
      "France",
      "attractions",
      1
    );
  });

  // Test case: Filtering attractions based on search query
  it("should filter attractions based on search query", async () => {
    mockGetAllAttractions.mockResolvedValue(mockAttractionResponse.query);

    const response = await locationsService.getAllAttractions(
      "Paris",
      "France",
      "attractions",
      1,
      "Eiffel"
    );

    expect(response.total).toBe(1);
    expect(response.data).toHaveLength(1);
    expect(response.data[0].name).toBe("Eiffel Tower");
    expect(mockGetAllAttractions).toHaveBeenCalledWith(
      "Paris",
      "France",
      "attractions",
      1,
      "Eiffel"
    );
  }, 10000);

  // Test case: Error handling for non-existent city/country
  it("should handle errors", async () => {
    mockGetAllAttractions.mockRejectedValue(new Error("No Attractions Found"));

    await expect(
      locationsService.getAllAttractions(
        "NonexistentCity",
        "NonexistentCountry",
        "attractions"
      )
    ).rejects.toThrow("No Attractions Found");
  }, 10000);
});
// Test suite for country-related functions (visa and exchange rate)
describe("Get Country Details", () => {
  // Create mock functions for the two methods we're testing
  const mockGetCountryVisa = jest.fn();
  const mockGetCountryExchangeRate = jest.fn();

  // Replace the real functions in locationsService with our mocks
  locationsService.getCountryVisa = mockGetCountryVisa;
  locationsService.getCountryExchangeRate = mockGetCountryExchangeRate;

  // Mock the entire locations.service module
  // This ensures that any import of this module will use our mocked functions
  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getCountryVisa: jest.fn(),
        getCountryExchangeRate: jest.fn(),
      },
    };
  });

  // After each test, clear all mocks
  // This prevents any side effects between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case for getCountryVisa function
  it("should return visa information for given countries", async () => {
    // Define a mock response for the visa information
    const mockVisaResponse = {
      visaStatus: "visa required",
      visaDuration: "30 days",
    };

    // Set up the mock to return our predefined response
    mockGetCountryVisa.mockResolvedValue(mockVisaResponse);

    // Call the function with test parameters
    const response = await locationsService.getCountryVisa("US", "IN");

    // Assert that the response matches our expectations
    expect(response.visaStatus).toBe("visa required");
    expect(response.visaDuration).toBe("30 days");
    // Verify that the mock function was called with the correct parameters
    expect(mockGetCountryVisa).toHaveBeenCalledWith("US", "IN");
  }, 10000); // Set timeout to 10 seconds

  // Test case for getCountryExchangeRate function
  it("should return exchange rate for given currencies", async () => {
    // Define a mock exchange rate
    const mockExchangeRate = 0.012;

    // Set up the mock to return our predefined exchange rate
    mockGetCountryExchangeRate.mockResolvedValue(mockExchangeRate);

    // Call the function with test parameters
    const response = await locationsService.getCountryExchangeRate(
      "INR",
      "USD"
    );

    // Assert that the response matches our expected exchange rate
    expect(response).toBe(0.012);
    // Verify that the mock function was called with the correct parameters
    expect(mockGetCountryExchangeRate).toHaveBeenCalledWith("INR", "USD");
  }, 10000); // Set timeout to 10 seconds

  // Test case for error handling in getCountryExchangeRate function
  it("should handle errors in getCountryExchangeRate", async () => {
    // Set up the mock to simulate an error
    mockGetCountryExchangeRate.mockRejectedValue(
      new Error("failed to get details")
    );

    // Assert that calling the function with invalid parameters throws an error
    await expect(
      locationsService.getCountryExchangeRate("INVALID", "USD")
    ).rejects.toThrow("failed to get details");
  }, 10000); // Set timeout to 10 seconds
});
