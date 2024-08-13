import request from "supertest";
import app from "../../app"; // Import your Express app
import usersService from "../../services/users.service"; // Import the users service
import {
  mockEditedUserResponse,
  mockUserResponse,
} from "../../__mocks__/integration/users.mocks";
process.env.NODE_ENV = "test";
// Mock the usersService
jest.mock("../../services/users.service");

describe("Get User Details", () => {
  let authToken: string;

  beforeAll(async () => {
    // Generate or mock an auth token (replace with your actual logic)
    authToken = "mocked-auth-token";
  });

  it("should get user details with valid authentication", async () => {
    // Mock the getUserDetails function to return a test user
    (usersService.getUserDetails as jest.Mock).mockResolvedValue(
      mockUserResponse
    );

    const response = await request(app)
      .get("/users/12345") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .query({ searchBy: "email" }); // Optional query params

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserResponse);
  });

  it("should return 400 if user service throws an error", async () => {
    // Mock the getUserDetails function to throw an error
    (usersService.getUserDetails as jest.Mock).mockRejectedValue(
      new Error("User not found")
    );

    const response = await request(app)
      .get("/users/invalid-id") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .query({ searchBy: "email" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "User not found" });
  });
});
describe("Should edit user details with valid authentication", () => {
  let authToken: string;

  beforeAll(async () => {
    // Mock or generate an auth token (replace with your actual logic)
    authToken = "mocked-auth-token";
  });

  it("should edit user details with valid authentication", async () => {
    // Mock the editUserDetails function to return the updated user
    (usersService.editUserDetails as jest.Mock).mockResolvedValue(
      mockEditedUserResponse
    );

    const response = await request(app)
      .put("/users") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .send(mockEditedUserResponse);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEditedUserResponse);
  });

  it("should return 401 if user service throws an error", async () => {
    // Mock the editUserDetails function to throw an error
    (usersService.editUserDetails as jest.Mock).mockRejectedValue(
      new Error("Failed To Edit User")
    );

    const response = await request(app)
      .put("/users") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .send(mockEditedUserResponse);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Failed To Edit User",
    });
  });
});

describe("Get Current User", () => {
  let authToken: string;

  beforeAll(async () => {
    // Generate or mock an auth token (replace with your actual logic)
    authToken = "mocked-auth-token";
  });

  it("should get user details with valid authentication", async () => {
    // Mock the getUserDetails function to return a test user
    (usersService.getUserDetails as jest.Mock).mockResolvedValue(
      mockUserResponse
    );

    const response = await request(app)
      .get("/users") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .query({ searchBy: "email" }); // Optional query params

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserResponse);
  });
});
