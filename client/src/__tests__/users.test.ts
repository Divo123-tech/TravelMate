import axios from "axios";
import {
  editUserDetails,
  addCollaborator,
  deleteCollaborator,
  getCurrentUser,
  searchUserDetails,
  deleteTrip,
  createNewTrip,
  getTripDetails,
} from "../services/users.service";
const ServerAPI = "http://localhost:3000";

// Mock axios and apiCache for testing
jest.mock("axios");
jest.mock("../utils/apiCache");

describe("Edit User Details", () => {
  // Mocking axios.put to control its behavior in tests
  const mockAxiosPut = axios.put as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call axios.put with the correct URL and payload", async () => {
    const name = "John Doe";
    const passport = { code: "ID", name: "Indonesia" }; // Example passport object
    const currencyUsed = "USD";

    const mockResponseData = {
      name,
      passport,
      currencyUsed,
    };

    // Mock axios.put to resolve with the mockResponseData
    mockAxiosPut.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await editUserDetails(name, passport, currencyUsed);

    const expectedUrl = `${ServerAPI}/users`;
    const expectedBody = { name, passport, currencyUsed };

    // Check if axios.put was called with correct URL and payload
    expect(mockAxiosPut).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});

describe("Get Current User", () => {
  // Mocking axios.get to control its behavior in tests
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should return user data when axios.get resolves successfully", async () => {
    const mockResponseData = {
      name: "Jane Doe",
      passport: { country: "US", number: "987654321" }, // Example passport object
      currencyUsed: "USD",
    };

    // Mock axios.get to resolve with the mockResponseData
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await getCurrentUser();

    const expectedUrl = `${ServerAPI}/users`;

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });

  it("should return null when axios.get throws an error", async () => {
    // Mock axios.get to reject with a network error
    mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    // Call the service function and assert results
    const result = await getCurrentUser();

    // Check if the result is null when an error occurs
    expect(result).toBeNull();
  });
});

describe("Search User Details", () => {
  // Mocking axios.get to control its behavior in tests
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call axios.get with the correct URL and return the user data", async () => {
    const email = "johndoe@example.com";
    const searchBy = "email";

    const mockResponseData = {
      name: "John Doe",
      email: "johndoe@example.com",
      passport: { country: "US", number: "123456789" }, // Example passport object
      currencyUsed: "USD",
    };

    // Mock axios.get to resolve with the mockResponseData
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await searchUserDetails(email, searchBy);

    const expectedUrl = `${ServerAPI}/users/${email}?searchBy=${searchBy}`;

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });

  it("should return null when axios.get throws an error", async () => {
    const email = "invalid@example.com";
    const searchBy = "email";

    // Mock axios.get to reject with a network error
    mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    // Call the service function and assert results
    const result = await searchUserDetails(email, searchBy);

    // Check if the result is null when an error occurs
    expect(result).toBeNull();
  });
});

// Test suite for deleting a trip
describe("Delete A Trip", () => {
  // Mocking axios.delete to control its behavior in tests
  const mockAxiosDelete = axios.delete as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call axios.delete with the correct URL and return the trip data", async () => {
    const tripId = "12345";

    const mockResponseData = { id: tripId, name: "Trip to Bali" }; // Example trip object
    mockAxiosDelete.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await deleteTrip(tripId);

    const expectedUrl = `${ServerAPI}/users/trips/${tripId}`;

    // Check if axios.delete was called with correct URL
    expect(mockAxiosDelete).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});

// Test suite for getting a trip's details
describe("Get A Trip's Details", () => {
  // Mocking axios.get to control its behavior in tests
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call axios.get with the correct URL and return the trip details", async () => {
    const tripId = "12345";

    const mockResponseData = { id: tripId, name: "Trip to Bali" }; // Example trip object
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await getTripDetails(tripId);

    const expectedUrl = `${ServerAPI}/users/trips/${tripId}`;

    // Check if axios.get was called with correct URL
    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});

// Test suite for creating a new trip
describe("Create A New Trip", () => {
  // Mocking axios.post to control its behavior in tests
  const mockAxiosPost = axios.post as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call axios.post with the correct URL and payload, and return the created trip data", async () => {
    const name = "Trip to Bali";
    const startDate = "2024-09-01";
    const endDate = "2024-09-10";

    const mockResponseData = { name, startDate, endDate }; // Example trip object
    mockAxiosPost.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await createNewTrip(name, startDate, endDate);

    const expectedUrl = `${ServerAPI}/users/trips`;
    const expectedBody = { name, startDate, endDate };

    // Check if axios.post was called with correct URL and payload
    expect(mockAxiosPost).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});

// Test suite for adding a collaborator to a trip
describe("Add A Collaborator", () => {
  // Mocking axios.post to control its behavior in tests
  const mockAxiosPost = axios.post as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call axios.post with the correct URL and payload, and return the updated trip data", async () => {
    const userId = "user123";
    const tripId = "trip123";
    const collaborator = "collab@example.com";
    const searchBy = "email";

    const mockResponseData = { tripId, collaborators: [collaborator] }; // Example trip object with collaborator
    mockAxiosPost.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await addCollaborator(
      userId,
      tripId,
      collaborator,
      searchBy
    );

    const expectedUrl = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`;
    const expectedBody = { collaborator, searchBy };

    // Check if axios.post was called with correct URL and payload
    expect(mockAxiosPost).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });
});

// Test suite for removing a collaborator from a trip
describe("Remove A Collaborator", () => {
  // Mocking axios.put to control its behavior in tests
  const mockAxiosPut = axios.put as jest.Mock;

  beforeEach(() => {
    // Clear all previous mock calls before each test
    jest.clearAllMocks();
  });

  it("should call axios.put with the correct URL and payload, and return the updated trip data", async () => {
    const userId = "user123";
    const tripId = "trip123";
    const collaborator = "collab@example.com";
    const searchBy = "email";

    const mockResponseData = { tripId, collaborators: [] }; // Example trip object with removed collaborator
    mockAxiosPut.mockResolvedValueOnce({ data: mockResponseData });

    // Call the service function and assert results
    const result = await deleteCollaborator(
      userId,
      tripId,
      collaborator,
      searchBy
    );

    const expectedUrl = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`;
    const expectedBody = { collaborator, searchBy };

    // Check if axios.put was called with correct URL and payload
    expect(mockAxiosPut).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    // Check if the result matches the mock response data
    expect(result).toEqual(mockResponseData);
  });

  it("should return null when axios.put throws an error", async () => {
    const userId = "user123";
    const tripId = "trip123";
    const collaborator = "collab@example.com";
    const searchBy = "email";

    // Mock axios.put to reject with a network error
    mockAxiosPut.mockRejectedValueOnce(new Error("Network Error"));

    // Call the service function and assert results
    const result = await deleteCollaborator(
      userId,
      tripId,
      collaborator,
      searchBy
    );

    // Check if the result is null when an error occurs
    expect(result).toBeNull();
  });
});
