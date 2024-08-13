// Import necessary modules and dependencies
import request from "supertest";
import app from "../../app"; // Import your Express app
import usersService from "../../services/users.service"; // Import usersService
import tripsService from "../../services/trips.service"; // Import tripsService

// Mock the users and trips service modules
jest.mock("../../services/users.service");
jest.mock("../../services/trips.service");

// Main describe block for TripController Integration Tests
describe("TripController Integration Tests", () => {
  let authToken: string;

  // Before all tests, set up a mock authentication token
  beforeAll(async () => {
    authToken = "mocked-auth-token";
  });

  // Before each test, reset all mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test suite for POST /trip endpoint
  describe("POST /trip", () => {
    // After each test in this suite, clear all mocks
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test case: Successfully add a trip for the authenticated user
    it("should add a trip for the authenticated user", async () => {
      // Mock user and trip data
      const mockUser = {
        id: "12345",
        googleId: "user-google-id",
        _id: "user-id",
      };
      const mockTrip = { _id: "trip-id", name: "New Trip" };

      // Mock service function responses
      (usersService.getUserDetails as jest.Mock).mockResolvedValue(mockUser);
      (tripsService.addTrip as jest.Mock).mockResolvedValue(mockTrip);
      (usersService.addTrip as jest.Mock).mockResolvedValue(undefined);

      // Send POST request to add a trip
      const response = await request(app)
        .post("/users/trips")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ name: "New Trip" });

      // Assert response and service function calls
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrip);
      expect(usersService.getUserDetails).toHaveBeenCalledWith(
        "12345",
        "googleId"
      );
      expect(tripsService.addTrip).toHaveBeenCalledWith(
        { name: "New Trip" },
        "user-id"
      );
      expect(usersService.addTrip).toHaveBeenCalledWith("12345", "trip-id");
    });
  });

  // Test suite for GET /trip/:tripId endpoint
  describe("GET /trip/:tripId", () => {
    // After each test in this suite, clear all mocks
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test case: Successfully get trip details
    it("should return trip details", async () => {
      // Mock trip data
      const mockTrip = { _id: "trip-id", name: "Existing Trip" };

      // Mock service function response
      (tripsService.getTripDetails as jest.Mock).mockResolvedValue(mockTrip);

      // Send GET request to fetch trip details
      const response = await request(app)
        .get("/users/trips/trip-id")
        .set("Authorization", `Bearer ${authToken}`);

      // Assert response and service function call
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrip);
      expect(tripsService.getTripDetails).toHaveBeenCalledWith("trip-id");
    });
  });

  // Test suite for DELETE /trip endpoint
  describe("DELETE /trip", () => {
    // After each test in this suite, clear all mocks
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test case: Successfully delete a trip for the authenticated user
    it("should delete a trip for the authenticated user", async () => {
      // Mock user and trip data
      const mockUser = {
        id: "12345",
        googleId: "user-google-id",
        _id: "user-id",
      };
      const mockTrip = { _id: "trip-id", name: "New Trip" };

      // Mock service function responses
      (usersService.getUserDetails as jest.Mock).mockResolvedValue(mockUser);
      (tripsService.deleteTrip as jest.Mock).mockResolvedValue(mockTrip);
      (usersService.deleteTrip as jest.Mock).mockResolvedValue(undefined);

      // Send DELETE request to remove a trip
      const response = await request(app)
        .delete("/users/trips/trip-id")
        .set("Authorization", `Bearer ${authToken}`);

      // Assert response status
      expect(response.status).toBe(200);
    });
  });

  // Test suite for POST /trip/:tripId/collaborator endpoint
  describe("POST /trip/:tripId/collaborator", () => {
    // After each test in this suite, clear all mocks
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test case: Successfully add a collaborator to a trip
    it("should add a collaborator to a trip", async () => {
      // Mock collaborator and trip data
      const mockCollaborator = {
        googleId: "collab-google-id",
        _id: "collab-id",
      };
      const mockTrip = { _id: "trip-id", name: "Existing Trip" };

      // Mock service function responses
      (usersService.getUserDetails as jest.Mock).mockResolvedValue(
        mockCollaborator
      );
      (usersService.addTrip as jest.Mock).mockResolvedValue(undefined);
      (tripsService.addCollaborator as jest.Mock).mockResolvedValue(mockTrip);

      // Send POST request to add a collaborator
      const response = await request(app)
        .post("/users/collab-google-id/trips/trip-id/collaborator")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ collaborator: "collab-google-id", searchBy: "googleId" });

      // Assert response and service function calls
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrip);
      expect(usersService.getUserDetails).toHaveBeenCalledWith(
        "collab-google-id",
        "googleId"
      );
      expect(usersService.addTrip).toHaveBeenCalledWith(
        "collab-google-id",
        "trip-id"
      );
      expect(tripsService.addCollaborator).toHaveBeenCalledWith(
        "trip-id",
        "collab-id"
      );
    });
  });

  // Test suite for DELETE /trip/:tripId/collaborator endpoint
  describe("DELETE /trip/:tripId/collaborator", () => {
    // After each test in this suite, clear all mocks
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test case: Successfully remove a collaborator from a trip
    it("should remove a collaborator from a trip", async () => {
      // Mock collaborator and trip data
      const mockCollaborator = {
        googleId: "collab-google-id",
        _id: "collab-id",
      };
      const mockTrip = { _id: "trip-id", name: "Existing Trip" };

      // Mock service function responses
      (usersService.getUserDetails as jest.Mock).mockResolvedValue(
        mockCollaborator
      );
      (usersService.deleteTrip as jest.Mock).mockResolvedValue(undefined);
      (tripsService.removeCollaborator as jest.Mock).mockResolvedValue(
        mockTrip
      );

      // Send PUT request to remove a collaborator
      const response = await request(app)
        .put("/users/collab-google-id/trips/trip-id/collaborator")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ collaborator: "collab-google-id", searchBy: "googleId" });

      // Assert response and service function calls
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrip);
      expect(usersService.getUserDetails).toHaveBeenCalledWith(
        "collab-google-id",
        "googleId"
      );
      expect(usersService.deleteTrip).toHaveBeenCalledWith(
        "collab-google-id",
        "trip-id"
      );
      expect(tripsService.removeCollaborator).toHaveBeenCalledWith(
        "trip-id",
        "collab-id"
      );
    });
  });
});
