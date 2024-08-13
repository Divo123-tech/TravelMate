import mongoose from "mongoose";
import tripsService from "../../services/trips.service";
import {
  mockTrip,
  mockTripCollaboratorAdded,
  mockTripDetailsEdited,
  mockTripLocationAdded,
} from "../../__mocks__/services/trips.mocks";

// Tests for adding a trip
describe("Add a trip", () => {
  const mockAddTrip = jest.fn();
  tripsService.addTrip = mockAddTrip;
  // Mocking users service for adding trips
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        addTrip: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the details of the newly added trip", async () => {
    mockAddTrip.mockResolvedValue(mockTrip);
    const response = await tripsService.addTrip(
      { name: "newTrip", startDate: "2024-07-18", endDate: "2024-07-29" },
      new mongoose.Types.ObjectId("66a0704655cdf4fcde3d858d")
    );
    expect(response.name).toBe("newTrip");
    expect(response.startDate).toBe("2024-07-18");
    expect(response.endDate).toBe("2024-07-29");
  });
});

// Tests for deleting a trip
describe("Delete A Trip", () => {
  const mockDeleteTrip = jest.fn();
  tripsService.deleteTrip = mockDeleteTrip;
  // Mocking users service for deleting trips
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        deleteTrip: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the details of the deleted trip", async () => {
    mockDeleteTrip.mockResolvedValue(mockTrip);
    const response = await tripsService.deleteTrip("66a0704655cdf4fcde3d858d");
    expect(response?.name).toBe("newTrip");
    expect(response?.startDate).toBe("2024-07-18");
    expect(response?.endDate).toBe("2024-07-29");
  });
});

// Tests for getting a trip's details
describe("Get a trip's details", () => {
  const mockGetTrip = jest.fn();
  tripsService.getTripDetails = mockGetTrip;
  // Mocking users service for getting trip details
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        getTripDetails: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the details of the trip", async () => {
    mockGetTrip.mockResolvedValue(mockTrip);
    const response = await tripsService.getTripDetails(
      "66a0704655cdf4fcde3d858d"
    );
    expect(response?.name).toBe("newTrip");
    expect(response?.startDate).toBe("2024-07-18");
    expect(response?.endDate).toBe("2024-07-29");
  });

  it("Should throw an error if the wrong id is provided", async () => {
    mockGetTrip.mockResolvedValue([]);
    const response = await tripsService.getTripDetails("wrongId");
    expect(response).toStrictEqual([]);
  });
});

// Tests for managing trip collaborators
describe("Trip Collaborators", () => {
  describe("Add Collaborator", () => {
    const mockAddCollaborator = jest.fn();
    tripsService.addCollaborator = mockAddCollaborator;
    // Mocking users service for adding collaborators
    jest.mock("../../services/users.service", () => {
      return {
        default: {
          addCollaborator: jest.fn(),
        },
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Should return the new trip with the newly added collaborator", async () => {
      mockAddCollaborator.mockResolvedValue(mockTripCollaboratorAdded);
      const response = await tripsService.addCollaborator(
        "66a0704655cdf4fcde3f855g",
        new mongoose.Types.ObjectId("66f0704655cdf4fcde3d858d")
      );
      expect(response?.collaborators?.length).toBe(1);
    });
  });

  describe("Delete Collaborator", () => {
    const mockRemoveCollaborator = jest.fn();
    tripsService.removeCollaborator = mockRemoveCollaborator;
    // Mocking users service for removing collaborators
    jest.mock("../../services/users.service", () => {
      return {
        default: {
          removeCollaborator: jest.fn(),
        },
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Should return the new trip with the removed collaborator", async () => {
      mockRemoveCollaborator.mockResolvedValue(mockTrip);
      const response = await tripsService.removeCollaborator(
        "66a0704655cdf4fcde3f855g",
        new mongoose.Types.ObjectId("66f0704655cdf4fcde3d858d")
      );
      expect(response?.collaborators?.length).toBe(0);
    });
  });
});

// Tests for editing trip details
describe("Edit Trip's Details", () => {
  const mockEditTrip = jest.fn();
  tripsService.editTripDetails = mockEditTrip;
  // Mocking users service for editing trip details
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        editTripDetails: jest.fn(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the trip with the newly edited trip details", async () => {
    mockEditTrip.mockResolvedValue(mockTripDetailsEdited);
    const response = await tripsService.editTripDetails(
      "66a0704655cdf4fcde3f855g",
      "EditedName",
      "2024-08-18",
      "2024-08-29"
    );
    expect(response?.name).toBe("EditedName");
    expect(response?.startDate).toBe("2024-08-18");
    expect(response?.endDate).toBe("2024-08-29");
  });
});

// Tests for managing trip locations
describe("Trip Locations", () => {
  describe("Add Location To Trip", () => {
    const mockAddLocation = jest.fn();
    tripsService.addLocationToTrip = mockAddLocation;
    // Mocking users service for adding locations to a trip
    jest.mock("../../services/users.service", () => {
      return {
        default: {
          addLocationToTrip: jest.fn(),
        },
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Should return the trip with the newly added location in its corresponding array", async () => {
      mockAddLocation.mockResolvedValue(mockTripLocationAdded);
      const response = await tripsService.addLocationToTrip(
        "66a0704655cdf4fcde3f855g",
        {
          name: "Bali",
          code: "BA",
          countryName: "Indonesia",
          countryCode: "ID",
          type: "states",
        },
        "states"
      );
      expect(response?.states?.length).toBe(1);
    });
  });

  describe("Delete Location To Trip", () => {
    const mockRemoveLocation = jest.fn();
    tripsService.removeLocationFromTrip = mockRemoveLocation;
    // Mocking users service for removing locations from a trip
    jest.mock("../../services/users.service", () => {
      return {
        default: {
          removeLocationFromTrip: jest.fn(),
        },
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Should return the trip with the location removed from its corresponding array", async () => {
      mockRemoveLocation.mockResolvedValue(mockTrip);
      const response = await tripsService.removeLocationFromTrip(
        "66a0704655cdf4fcde3f855g",
        {
          name: "Bali",
          code: "BA",
          countryName: "Indonesia",
          countryCode: "ID",
          type: "states",
        },
        "states"
      );
      expect(response?.states?.length).toBe(0);
    });
  });
});
