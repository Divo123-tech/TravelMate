import request from "supertest";
import app from "../../app";
describe("Get All Countries", () => {
  it("should return a status of 200 with a response body having the properties total and data", async () => {
    const response = await request(app).get("/locations/countries/all");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("data");
    expect(response.body.total).toBe(186);
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

describe("Get Country By Name", () => {
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

describe("Get States", () => {
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

describe("Get State By Name", () => {
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

describe("Get Cities", () => {
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

describe("Get City By Name", () => {
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

describe("Get All Airports", () => {
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
