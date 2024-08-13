import request from "supertest";
import app from "../../app";

// Test suite for Get All Countries endpoint
describe("Get All Countries Integration Test", () => {
  // Test case: Verify successful response structure
  it("should return a status of 200 with a response body having the properties total and data", async () => {
    const response = await request(app).get("/locations/countries/all");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(186);
  });

  // Test case: Verify continent-specific responses
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

  // Test case: Verify search functionality
  it("should return the countries that fit the searchQuery passed in the query", async () => {
    const response = await request(app).get(
      "/locations/countries/all?searchQuery=Indonesia"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(1);
  });

  // Test case: Verify error handling for invalid continent
  it("Should return a 400 response when passing in an incorrect continent", async () => {
    const response = await request(app).get("/locations/countries/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Countries Found");
  });
});

// Test suite for Get Country By Name endpoint
describe("Get Country By Name Integration Test", () => {
  // Test case: Verify successful response for a valid country
  it("Should return Indonesia when passing Indonesia as the input", async () => {
    const response = await request(app).get("/locations/country/Indonesia");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Indonesia");
  });

  // Test case: Verify error handling for invalid country
  it("Should throw an error when the country is not found", async () => {
    const response = await request(app).get("/locations/country/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Country Found");
  });
});

// Test suite for Get States endpoint
describe("Get States Integration Test", () => {
  // Test case: Verify successful response structure
  it("should return a status of 200 with a response body having the properties total and data", async () => {
    const response = await request(app).get("/locations/states/United States");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(66);
  });

  // Test case: Verify search functionality
  it("should return the countries that fit the searchQuery passed in the query", async () => {
    const response = await request(app).get(
      "/locations/states/United States?searchQuery=California"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(1);
  });

  // Test case: Verify error handling for invalid country
  it("Should return a 400 response when passing in an incorrect continent", async () => {
    const response = await request(app).get("/locations/states/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No States Found");
  });
});

// Test suite for Get State By Name endpoint
describe("Get State By Name Integration Test", () => {
  // Test case: Verify successful response for a valid state
  it("Should return Bali when passing Bali as the input", async () => {
    const response = await request(app).get("/locations/state/Indonesia/Bali");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Bali");
  });

  // Test case: Verify error handling for invalid state/country
  it("Should throw an error when the country is not found", async () => {
    const response = await request(app).get("/locations/state/error/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No State Found");
  });
});

// Test suite for Get Cities endpoint
describe("Get Cities Integration Test", () => {
  // Test case: Verify successful response structure
  it("should return a status of 200 with a response body having the properties total and data", async () => {
    const response = await request(app).get("/locations/cities/Bali/Indonesia");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(27);
  });

  // Test case: Verify search functionality
  it("should return the countries that fit the searchQuery passed in the query", async () => {
    const response = await request(app).get(
      "/locations/cities/Bali/Indonesia?searchQuery=Denpasar"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(2);
  });

  // Test case: Verify error handling for invalid state/country
  it("Should return a 400 response when passing in an incorrect continent", async () => {
    const response = await request(app).get("/locations/cities/error/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Cities Found");
  });
});

// Test suite for Get City By Name endpoint
describe("Get City By Name Integration Test", () => {
  // Test case: Verify successful response for a valid city
  it("Should return Bali when passing Bali as the input", async () => {
    const response = await request(app).get(
      "/locations/city/Indonesia/Bali/Denpasar"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe("Denpasar");
  });

  // Test case: Verify error handling for invalid city/state/country
  it("Should throw an error when the country is not found", async () => {
    const response = await request(app).get(
      "/locations/city/error/error/error"
    );
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No City Found");
  });
});

// Test suite for Get All Airports endpoint
describe("Get All Airports Integration Test", () => {
  // Test case: Verify successful response for a valid city and region
  it("Should return YVR when passing Vancouver and British Columbia", async () => {
    const response = await request(app).get(
      "/locations/airports/Vancouver/British Columbia"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(1);
  });

  // Test case: Verify error handling for invalid city or region
  it("Should throw an error when passing invalid city or region", async () => {
    const response = await request(app).get("/locations/airports/error/error");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No Airports Found");
  });
});

// Test suite for Get All Flights endpoint
describe("Get All Flights Integration Test", () => {
  // Test case: Verify successful response for valid parameters
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

  // Test case: Verify error handling for invalid parameters
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

// This describe block contains tests for the "Get All Hotels" endpoint
describe("Get All Hotels Integration Test", () => {
  // Test case: Verify that the endpoint returns hotels with valid parameters
  it("Should return hotels when passing valid parameters", async () => {
    const response = await request(app)
      .get("/locations/hotels/New York/US")
      .query({
        page: "1",
        searchQuery: "luxury",
      });

    // Assert that the response status is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Check if the response body has a 'data' property
    expect(response.body).toHaveProperty("data");
    // Ensure that the 'data' property is an array
    expect(Array.isArray(response.body.data)).toBe(true);
    // TODO: Add more specific checks based on your expected response structure
  });

  // Test case: Verify that the endpoint returns hotels without optional parameters
  it("Should return hotels without optional parameters", async () => {
    const response = await request(app).get("/locations/hotels/Paris/FR");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Test case: Verify that the endpoint returns a 400 error for invalid city or country code
  it("Should return 400 when passing invalid city or country code", async () => {
    const response = await request(app).get("/locations/hotels/InvalidCity/XX");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  // Test case: Verify that pagination works correctly
  it("Should handle pagination correctly", async () => {
    // Get the first page of results
    const response1 = await request(app)
      .get("/locations/hotels/London/GB")
      .query({
        page: "1",
      });
    // Get the second page of results
    const response2 = await request(app)
      .get("/locations/hotels/London/GB")
      .query({
        page: "2",
      });

    expect(response1.statusCode).toBe(200);
    expect(response2.statusCode).toBe(200);
    // Ensure that the data from page 1 and page 2 are different
    expect(response1.body.data).not.toEqual(response2.body.data);
  });

  // Test case: Verify that the search query filters results correctly
  it("Should filter results based on search query", async () => {
    const response = await request(app)
      .get("/locations/hotels/Tokyo/JP")
      .query({
        searchQuery: "airport",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // TODO: Add a check to ensure the results actually contain the search query
    // This depends on how your service implements the search functionality
  });
});

// This describe block contains tests for the "Get All Attractions" endpoint
describe("Get All Attractions Integration Test", () => {
  // Test case: Verify that the endpoint returns attractions with valid parameters
  it("Should return attractions when passing valid parameters", async () => {
    const response = await request(app)
      .get("/locations/attractions/Paris/FR")
      .query({
        category: "attractions",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // TODO: Add more specific checks based on your expected response structure
  });

  // Test case: Verify that the endpoint returns attractions with the default category
  it("Should return attractions with default category", async () => {
    const response = await request(app).get("/locations/attractions/Rome/IT");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Test case: Verify that the endpoint returns a 400 error for invalid city or country code
  it("Should return 400 when passing invalid city or country code", async () => {
    const response = await request(app).get(
      "/locations/attractions/InvalidCity/XX"
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  // Test case: Verify that different categories are handled correctly
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
      // TODO: Add a check to ensure the results actually match the category
    }
  });
});

// This describe block contains tests for the "Get YouTube Videos" endpoint
describe("Get YouTube Videos Integration Test", () => {
  // Test case: Verify that the endpoint returns videos with valid parameters
  it("Should return videos when passing valid parameters", async () => {
    const response = await request(app).get("/locations/videos/Tokyo").query({
      page: "1",
      searchQuery: "travel guide",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // TODO: Add more specific checks based on your expected response structure
  });

  // Test case: Verify that the search query filters video results correctly
  it("Should filter results based on search query", async () => {
    const response = await request(app).get("/locations/videos/Sydney").query({
      searchQuery: "opera house",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    // TODO: Add a check to ensure the results actually contain the search query
    // This depends on how your service implements the search functionality
  });
});
