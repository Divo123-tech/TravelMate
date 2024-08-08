import locationsService from "../../services/locations.service";

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
  });
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
  });
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
