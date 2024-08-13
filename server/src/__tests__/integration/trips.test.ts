import request from "supertest";
import app from "../../app"; // Import your Express app
import usersService from "../../services/users.service"; // Import usersService
import tripsService from "../../services/trips.service"; // Import tripsService

jest.mock("../../services/users.service");
jest.mock("../../services/trips.service");

describe("TripController Integration Tests", () => {
  let authToken: string;

  beforeAll(async () => {
    authToken = "mocked-auth-token";
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe("POST /trip", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should add a trip for the authenticated user", async () => {
      const mockUser = {
        id: "12345",
        googleId: "user-google-id",
        _id: "user-id",
      };
      const mockTrip = { _id: "trip-id", name: "New Trip" };

      (usersService.getUserDetails as jest.Mock).mockResolvedValue(mockUser);
      (tripsService.addTrip as jest.Mock).mockResolvedValue(mockTrip);
      (usersService.addTrip as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post("/users/trips")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ name: "New Trip" });

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

  describe("GET /trip/:tripId", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return trip details", async () => {
      const mockTrip = { _id: "trip-id", name: "Existing Trip" };

      (tripsService.getTripDetails as jest.Mock).mockResolvedValue(mockTrip);

      const response = await request(app)
        .get("/users/trips/trip-id")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrip);
      expect(tripsService.getTripDetails).toHaveBeenCalledWith("trip-id");
    });
  });

  describe("DELETE /trip", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should delete a trip for the authenticated user", async () => {
      const mockUser = {
        id: "12345",
        googleId: "user-google-id",
        _id: "user-id",
      };
      const mockTrip = { _id: "trip-id", name: "New Trip" };

      (usersService.getUserDetails as jest.Mock).mockResolvedValue(mockUser);
      (tripsService.deleteTrip as jest.Mock).mockResolvedValue(mockTrip);
      (usersService.deleteTrip as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .delete("/users/trips/trip-id")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
    });
  });

  describe("POST /trip/:tripId/collaborator", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should add a collaborator to a trip", async () => {
      const mockCollaborator = {
        googleId: "collab-google-id",
        _id: "collab-id",
      };
      const mockTrip = { _id: "trip-id", name: "Existing Trip" };

      (usersService.getUserDetails as jest.Mock).mockResolvedValue(
        mockCollaborator
      );
      (usersService.addTrip as jest.Mock).mockResolvedValue(undefined);
      (tripsService.addCollaborator as jest.Mock).mockResolvedValue(mockTrip);

      const response = await request(app)
        .post("/users/collab-google-id/trips/trip-id/collaborator")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ collaborator: "collab-google-id", searchBy: "googleId" });

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

  describe("DELETE /trip/:tripId/collaborator", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should remove a collaborator from a trip", async () => {
      const mockCollaborator = {
        googleId: "collab-google-id",
        _id: "collab-id",
      };
      const mockTrip = { _id: "trip-id", name: "Existing Trip" };

      (usersService.getUserDetails as jest.Mock).mockResolvedValue(
        mockCollaborator
      );
      (usersService.deleteTrip as jest.Mock).mockResolvedValue(undefined);
      (tripsService.removeCollaborator as jest.Mock).mockResolvedValue(
        mockTrip
      );

      const response = await request(app)
        .put("/users/collab-google-id/trips/trip-id/collaborator")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ collaborator: "collab-google-id", searchBy: "googleId" });

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
