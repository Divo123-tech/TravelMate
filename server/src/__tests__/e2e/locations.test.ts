import request from "supertest";
import app from "../../app";

describe("Get All Countries Integration Test", () => {
  it("should return a status of 200 with a response body having the properties total and data", async () => {
    const response = await request(app).get("/locations/countries/all");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(186);
  });
  it("should return countries from different continents accordingly", async () => {
    const continents = [
      "Asia",
      "Europe",
      "North America",
      "South America",
      "Africa",
      "Oceana",
    ];
    for (const continent of continents) {
      const response = await request(app).get(
        `/locations/countries/${continent}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("total");
      expect(response.body).toHaveProperty("data");
    }
  });
  it("should return the countries that fit the searchQuery passed in the query", async () => {
    const response = await request(app).get(
      "/locations/countries/all?searchQuery=Indonesia"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(1);
  });
  it("Should return a 400 response when passing in an incorrect continent", async () => {
    const response = await request(app).get("/locations/countries/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Countries Found");
  });
});

describe("Get Country By Name Integration Test", () => {
  it("Should return Indonesia when passing Indonesia as the input", async () => {
    const response = await request(app).get("/locations/country/Indonesia");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Indonesia");
  });
  it("Should throw an error when the country is not found", async () => {
    const response = await request(app).get("/locations/country/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Country Found");
  });
});

describe("Get States Integration Test", () => {
  it("should return a status of 200 with a response body having the properties total and data", async () => {
    const response = await request(app).get("/locations/states/United States");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(66);
  });
  it("should return the countries that fit the searchQuery passed in the query", async () => {
    const response = await request(app).get(
      "/locations/states/United States?searchQuery=California"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(1);
  });
  it("Should return a 400 response when passing in an incorrect continent", async () => {
    const response = await request(app).get("/locations/states/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No States Found");
  });
});

describe("Get State By Name Integration Test", () => {
  it("Should return Bali when passing Bali as the input", async () => {
    const response = await request(app).get("/locations/state/Indonesia/Bali");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Bali");
  });
  it("Should throw an error when the country is not found", async () => {
    const response = await request(app).get("/locations/state/error/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No State Found");
  });
});

describe("Get Cities Integration Test", () => {
  it("should return a status of 200 with a response body having the properties total and data", async () => {
    const response = await request(app).get("/locations/cities/Bali/Indonesia");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(27);
  });
  it("should return the countries that fit the searchQuery passed in the query", async () => {
    const response = await request(app).get(
      "/locations/cities/Bali/Indonesia?searchQuery=Denpasar"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(2);
  });
  it("Should return a 400 response when passing in an incorrect continent", async () => {
    const response = await request(app).get("/locations/cities/error/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Cities Found");
  });
});

describe("Get City By Name Integration Test", () => {
  it("Should return Bali when passing Bali as the input", async () => {
    const response = await request(app).get(
      "/locations/city/Indonesia/Bali/Denpasar"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Denpasar");
  });
  it("Should throw an error when the country is not found", async () => {
    const response = await request(app).get(
      "/locations/city/error/error/error"
    );
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No City Found");
  });
});

describe("Get All Airports Integration Test", () => {
  it("Should return YVR when passing Vancouver and British Columbia", async () => {
    const response = await request(app).get(
      "/locations/airports/Vancouver/British Columbia"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(1);
  });
  it("Should throw an error when passing invalid city or region", async () => {
    const response = await request(app).get("/locations/airports/error/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Airports Found");
  });
});

describe("Get All Flights Integration Test", () => {
  it("Should return flights when passing valid parameters", async () => {
    const response = await request(app)
      .get("/locations/flights")
      .query({
        origin: "SIN",
        destination: "CGK",
        departureDate: new Date().toISOString().split("T")[0],
        adults: "2",
        nonstop: "false",
        currency: "USD",
        children: "1",
        infants: "0",
        maxPrice: "1000",
        travelClass: "ECONOMY",
        page: "1",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // Add more specific checks based on your expected response structure
  });
  it("Should return 400 when passing invalid parameters", async () => {
    const response = await request(app).get("/locations/flights").query({
      origin: "INVALID",
      destination: "INVALID",
      departureDate: "INVALID",
      adults: "INVALID",
      nonstop: "INVALID",
      currency: "INVALID",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
describe("Get All Hotels Integration Test", () => {
  it("Should return hotels when passing valid parameters", async () => {
    const response = await request(app)
      .get("/locations/hotels/New York/US")
      .query({
        page: "1",
        searchQuery: "luxury",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // Add more specific checks based on your expected response structure
  });

  it("Should return hotels without optional parameters", async () => {
    const response = await request(app).get("/locations/hotels/Paris/FR");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("Should return 400 when passing invalid city or country code", async () => {
    const response = await request(app).get("/locations/hotels/InvalidCity/XX");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Should handle pagination correctly", async () => {
    const response1 = await request(app)
      .get("/locations/hotels/London/GB")
      .query({
        page: "1",
      });
    const response2 = await request(app)
      .get("/locations/hotels/London/GB")
      .query({
        page: "2",
      });

    expect(response1.statusCode).toBe(200);
    expect(response2.statusCode).toBe(200);
    expect(response1.body.data).not.toEqual(response2.body.data);
  });

  it("Should filter results based on search query", async () => {
    const response = await request(app)
      .get("/locations/hotels/Tokyo/JP")
      .query({
        searchQuery: "airport",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // You might want to add a check here to ensure the results actually contain the search query
    // This depends on how your service implements the search functionality
  });
});

describe("Get All Attractions Integration Test", () => {
  it("Should return attractions when passing valid parameters", async () => {
    const response = await request(app)
      .get("/locations/attractions/Paris/FR")
      .query({
        category: "attractions",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // Add more specific checks based on your expected response structure
  });

  it("Should return attractions with default category", async () => {
    const response = await request(app).get("/locations/attractions/Rome/IT");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("Should return 400 when passing invalid city or country code", async () => {
    const response = await request(app).get(
      "/locations/attractions/InvalidCity/XX"
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Should handle different categories correctly", async () => {
    const categories = ["attractions", "restaurants"];
    for (const category of categories) {
      const response = await request(app)
        .get("/locations/attractions/London/GB")
        .query({
          category,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
      // You might want to add a check here to ensure the results actually match the category
    }
  });
});

describe("Get YouTube Videos Integration Test", () => {
  it("Should return videos when passing valid parameters", async () => {
    const response = await request(app).get("/locations/videos/Tokyo").query({
      page: "1",
      searchQuery: "travel guide",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // Add more specific checks based on your expected response structure
  });

  it("Should filter results based on search query", async () => {
    const response = await request(app).get("/locations/videos/Sydney").query({
      searchQuery: "opera house",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // You might want to add a check here to ensure the results actually contain the search query
    // This depends on how your service implements the search functionality
  });
});
