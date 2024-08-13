// Import necessary modules and dependencies
import request from "supertest";
import app from "../../app"; // Import your Express app
import usersService from "../../services/users.service"; // Import the users service
import {
  mockEditedUserResponse,
  mockUserResponse,
} from "../../__mocks__/integration/users.mocks";

// Set the environment to 'test'
process.env.NODE_ENV = "test";

// Mock the entire users service module
jest.mock("../../services/users.service");

// Test suite for getting user details
describe("Get User Details", () => {
  let authToken: string;

  // Before all tests, set up a mock authentication token
  beforeAll(async () => {
    // Generate or mock an auth token (replace with your actual logic)
    authToken = "mocked-auth-token";
  });

  // Test case: Successfully get user details
  it("should get user details with valid authentication", async () => {
    // Mock the getUserDetails function to return a test user
    (usersService.getUserDetails as jest.Mock).mockResolvedValue(
      mockUserResponse
    );

    // Send a GET request to the /users/12345 endpoint
    const response = await request(app)
      .get("/users/12345") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .query({ searchBy: "email" }); // Optional query params

    // Assert the response status and body
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserResponse);
  });

  // Test case: Handle error when user service fails
  it("should return 400 if user service throws an error", async () => {
    // Mock the getUserDetails function to throw an error
    (usersService.getUserDetails as jest.Mock).mockRejectedValue(
      new Error("User not found")
    );

    // Send a GET request to the /users/invalid-id endpoint
    const response = await request(app)
      .get("/users/invalid-id") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .query({ searchBy: "email" });

    // Assert the response status and body for the error case
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "User not found" });
  });
});

// Test suite for editing user details
describe("Should edit user details with valid authentication", () => {
  let authToken: string;

  // Before all tests, set up a mock authentication token
  beforeAll(async () => {
    // Mock or generate an auth token (replace with your actual logic)
    authToken = "mocked-auth-token";
  });

  // Test case: Successfully edit user details
  it("should edit user details with valid authentication", async () => {
    // Mock the editUserDetails function to return the updated user
    (usersService.editUserDetails as jest.Mock).mockResolvedValue(
      mockEditedUserResponse
    );

    // Send a PUT request to the /users endpoint
    const response = await request(app)
      .put("/users") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .send(mockEditedUserResponse);

    // Assert the response status and body
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEditedUserResponse);
  });

  // Test case: Handle error when editing user details fails
  it("should return 401 if user service throws an error", async () => {
    // Mock the editUserDetails function to throw an error
    (usersService.editUserDetails as jest.Mock).mockRejectedValue(
      new Error("Failed To Edit User")
    );

    // Send a PUT request to the /users endpoint
    const response = await request(app)
      .put("/users") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .send(mockEditedUserResponse);

    // Assert the response status and body for the error case
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Failed To Edit User",
    });
  });
});

// Test suite for getting current user details
describe("Get Current User", () => {
  let authToken: string;

  // Before all tests, set up a mock authentication token
  beforeAll(async () => {
    // Generate or mock an auth token (replace with your actual logic)
    authToken = "mocked-auth-token";
  });

  // Test case: Successfully get current user details
  it("should get user details with valid authentication", async () => {
    // Mock the getUserDetails function to return a test user
    (usersService.getUserDetails as jest.Mock).mockResolvedValue(
      mockUserResponse
    );

    // Send a GET request to the /users endpoint
    const response = await request(app)
      .get("/users") // Replace with the actual route
      .set("Authorization", `Bearer ${authToken}`) // Set auth header
      .query({ searchBy: "email" }); // Optional query params

    // Assert the response status and body
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserResponse);
  });
});
