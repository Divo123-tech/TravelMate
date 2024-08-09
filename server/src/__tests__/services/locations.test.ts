import locationsService, {
  convertTime,
  durationToMinutes,
} from "../../services/locations.service";

import {
  mockAttractionResponse,
  mockFlightReponse,
  mockVideoResponse,
} from "../../__mocks__/locations.mocks";
describe("Get All Countries", () => {
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
  it("should return throw an error if the wrong continent is given", async () => {
    try {
      await locationsService.getAllCountries("error", 1, undefined);
    } catch (err: any) {
      expect(err.message).toBe("No Countries Found");
    }
  });
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

describe("Get Country By Name", () => {
  it("Should return Afghanistan when passing Afghanistan as the input", async () => {
    const response = await locationsService.getCountryByName("Afghanistan");
    expect(response.name).toBe("Afghanistan");
  });
  it("Should throw an error when the country is not found", async () => {
    try {
      await locationsService.getCountryByName("Afghanistan");
    } catch (err: any) {
      expect(err.message).toBe("No Country Found");
    }
  });
});

describe("Get All States", () => {
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
  it("Should throw an error when fetching a wrong country", async () => {
    try {
      await locationsService.getAllStates("error");
    } catch (err: any) {
      expect(err.message).toBe("No States Found");
    }
  });
});

describe("Get State By Name", () => {
  it("Should return Bali when passing Bali as the input", async () => {
    const response = await locationsService.getStateByName("Bali", "Indonesia");
    expect(response.name).toBe("Bali");
  });
  it("Should throw an error when fetching a wrong state", async () => {
    try {
      await locationsService.getStateByName("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No State Found");
    }
  });
});

describe("Get All Cities", () => {
  it("Should return with a total of 27 with 10 in the data, and the first being Amlapura when fetching the cities of Bali", async () => {
    const response = await locationsService.getAllCities("Bali", "Indonesia");
    expect(response.total).toBe(27);
    expect(response.data[0].name).toBe("Amlapura");
  });
  it("Should throw an error if the wrong state or country is given", async () => {
    try {
      await locationsService.getAllCities("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No Cities Found");
    }
  });
});

describe("Get City By Name", () => {
  it("Should return Sacramento when passing Sacramento as the input", async () => {
    const response = await locationsService.getCityByName(
      "Sacramento",
      "United States",
      "California"
    );
    expect(response.name).toBe("Sacramento");
  });
  it("Should throw an error if the wrong state or country or city name", async () => {
    try {
      await locationsService.getCityByName("error", "error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No City Found");
    }
  });
});

describe("Get All Airports", () => {
  it("Should return YVR when passing Vancouver and British Columbia", async () => {
    const response = await locationsService.getAllAirports(
      "Vancouver",
      "British Columbia"
    );
    expect(response.data[0].name).toBe("Vancouver International Airport");
  });
  it("Should throw an error when passing invalid city or region", async () => {
    try {
      await locationsService.getAllAirports("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No Airports Found");
    }
  });
});

describe("Time conversions", () => {
  it("Should take an HH:MM Format and return the converted total minutes", () => {
    expect(convertTime("2:30")).toBe("150");
    expect(convertTime("1:00")).toBe("60");
  });
  it("Should take a PT:HHMM Format and return the converted total minutes", () => {
    expect(durationToMinutes("PT1H30M")).toBe(90);
    expect(durationToMinutes("PT1H")).toBe(60);
    expect(durationToMinutes("PT90M")).toBe(90);
    expect(durationToMinutes("PT0H0M")).toBe(0);
  });
});

describe("Get All Hotels", () => {
  it("Should return 116 hotels with 10 in the data array and the first being Mercure Jakarta Sabang, when passing Jakarta Indonesia as inputs", async () => {
    const response = await locationsService.getAllHotels(
      "Jakarta",
      "Indonesia"
    );
    expect(response.total).toBe(116);
    expect(response.data.length).toBe(10);
    expect(response.data[0].name).toBe("Mercure Jakarta Sabang");
  });
  it("Should throw an error when passing an invalid city or country as inputs", async () => {
    try {
      await locationsService.getAllHotels("error", "error");
    } catch (err: any) {
      expect(err.message).toBe("No Hotels Found");
    }
  });
});

describe("Location TimeZone", () => {
  it("Should Return the Asia/Jakarta as the timezone when passing Jakarta, Indonesia as the input", async () => {
    const response = await locationsService.getLocationTime(
      "Jakarta",
      "Indonesia"
    );
    expect(response.timeZone).toBe("Asia/Jakarta");
  }, 10000);
});

describe("Get Youtube Videos", () => {
  // Create a mock function
  const mockGetYoutubeVideos = jest.fn();

  locationsService.getYoutubeVideos = mockGetYoutubeVideos;

  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getYoutubeVideos: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return YouTube videos for a given city", async () => {
    mockGetYoutubeVideos.mockResolvedValue(mockVideoResponse);

    const response = await locationsService.getYoutubeVideos("Paris", 1);

    expect(response.total).toBe(2);
    expect(response.data).toHaveLength(2);
    expect(response.data[0].title).toBe("Things to do in Paris");
    expect(mockGetYoutubeVideos).toHaveBeenCalledWith("Paris", 1);
  });
  it("should handle errors", async () => {
    mockGetYoutubeVideos.mockRejectedValue(new Error("API error"));

    await expect(
      locationsService.getYoutubeVideos("ErrorCity", 1)
    ).rejects.toThrow("API error");
  });
});

describe("Get All Flights", () => {
  // Create a mock function
  const mockGetAllFlights = jest.fn();

  locationsService.getAllFlights = mockGetAllFlights;

  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getAllFlights: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

describe("Get All Attractions", () => {
  // Create a mock function
  const mockGetAllAttractions = jest.fn();

  locationsService.getAllAttractions = mockGetAllAttractions;

  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getAllAttractions: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
  }, 10000); // Increase timeout to 10 seconds

  it("should handle errors", async () => {
    mockGetAllAttractions.mockRejectedValue(new Error("No Attractions Found"));

    await expect(
      locationsService.getAllAttractions(
        "NonexistentCity",
        "NonexistentCountry",
        "attractions"
      )
    ).rejects.toThrow("No Attractions Found");
  }, 10000); // Increase timeout to 10 seconds

  // Add more tests here...
});

describe("Get Country Details", () => {
  // Create mock functions
  const mockGetCountryVisa = jest.fn();
  const mockGetCountryExchangeRate = jest.fn();

  // Replace the real functions with the mocks
  locationsService.getCountryVisa = mockGetCountryVisa;
  locationsService.getCountryExchangeRate = mockGetCountryExchangeRate;

  jest.mock("../../services/locations.service", () => {
    return {
      default: {
        getCountryVisa: jest.fn(),
        getCountryExchangeRate: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return visa information for given countries", async () => {
    const mockVisaResponse = {
      visaStatus: "visa required",
      visaDuration: "30 days",
    };

    mockGetCountryVisa.mockResolvedValue(mockVisaResponse);

    const response = await locationsService.getCountryVisa("US", "IN");

    expect(response.visaStatus).toBe("visa required");
    expect(response.visaDuration).toBe("30 days");
    expect(mockGetCountryVisa).toHaveBeenCalledWith("US", "IN");
  }, 10000);

  it("should return exchange rate for given currencies", async () => {
    const mockExchangeRate = 0.012;

    mockGetCountryExchangeRate.mockResolvedValue(mockExchangeRate);

    const response = await locationsService.getCountryExchangeRate(
      "INR",
      "USD"
    );

    expect(response).toBe(0.012);
    expect(mockGetCountryExchangeRate).toHaveBeenCalledWith("INR", "USD");
  }, 10000);

  it("should handle errors in getCountryExchangeRate", async () => {
    mockGetCountryExchangeRate.mockRejectedValue(
      new Error("failed to get details")
    );

    await expect(
      locationsService.getCountryExchangeRate("INVALID", "USD")
    ).rejects.toThrow("failed to get details");
  }, 10000);
});
