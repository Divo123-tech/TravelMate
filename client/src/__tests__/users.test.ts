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
jest.mock("axios");
jest.mock("../utils/apiCache");

describe("Edit User Details", () => {
  const mockAxiosPut = axios.put as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.put with the correct URL and payload", async () => {
    const name = "John Doe";
    const passport = { code: "ID", name: "Indonesia" }; // Replace with actual passport object structure
    const currencyUsed = "USD";

    const mockResponseData = {
      name,
      passport,
      currencyUsed,
    };

    mockAxiosPut.mockResolvedValueOnce({ data: mockResponseData });

    const result = await editUserDetails(name, passport, currencyUsed);

    const expectedUrl = `${ServerAPI}/users`;
    const expectedBody = { name, passport, currencyUsed };

    expect(mockAxiosPut).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});
describe("Get Current User", () => {
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data when axios.get resolves successfully", async () => {
    const mockResponseData = {
      name: "Jane Doe",
      passport: { country: "US", number: "987654321" }, // Replace with actual passport object structure
      currencyUsed: "USD",
    };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getCurrentUser();

    const expectedUrl = `${ServerAPI}/users`;

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });

  it("should return null when axios.get throws an error", async () => {
    mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    const result = await getCurrentUser();

    expect(result).toBeNull();
  });
});

describe("Search User Details", () => {
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.get with the correct URL and return the user data", async () => {
    const email = "johndoe@example.com";
    const searchBy = "email";

    const mockResponseData = {
      name: "John Doe",
      email: "johndoe@example.com",
      passport: { country: "US", number: "123456789" }, // Replace with actual passport object structure
      currencyUsed: "USD",
    };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await searchUserDetails(email, searchBy);

    const expectedUrl = `${ServerAPI}/users/${email}?searchBy=${searchBy}`;

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });

  it("should return null when axios.get throws an error", async () => {
    const email = "invalid@example.com";
    const searchBy = "email";

    mockAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    const result = await searchUserDetails(email, searchBy);

    expect(result).toBeNull();
  });
});

describe("Delete A Trip", () => {
  const mockAxiosDelete = axios.delete as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.delete with the correct URL and return the trip data", async () => {
    const tripId = "12345";

    const mockResponseData = { id: tripId, name: "Trip to Bali" }; // Replace with actual TripType structure
    mockAxiosDelete.mockResolvedValueOnce({ data: mockResponseData });

    const result = await deleteTrip(tripId);

    const expectedUrl = `${ServerAPI}/users/trips/${tripId}`;

    expect(mockAxiosDelete).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});

describe("Get A Trip's Details", () => {
  const mockAxiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.get with the correct URL and return the trip details", async () => {
    const tripId = "12345";

    const mockResponseData = { id: tripId, name: "Trip to Bali" }; // Replace with actual TripType structure
    mockAxiosGet.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getTripDetails(tripId);

    const expectedUrl = `${ServerAPI}/users/trips/${tripId}`;

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedUrl, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});

describe("Create A New Trip", () => {
  const mockAxiosPost = axios.post as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.post with the correct URL and payload, and return the created trip data", async () => {
    const name = "Trip to Bali";
    const startDate = "2024-09-01";
    const endDate = "2024-09-10";

    const mockResponseData = { name, startDate, endDate }; // Replace with actual TripType structure
    mockAxiosPost.mockResolvedValueOnce({ data: mockResponseData });

    const result = await createNewTrip(name, startDate, endDate);

    const expectedUrl = `${ServerAPI}/users/trips`;
    const expectedBody = { name, startDate, endDate };

    expect(mockAxiosPost).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});

describe("Add A Collaborator", () => {
  const mockAxiosPost = axios.post as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.post with the correct URL and payload, and return the updated trip data", async () => {
    const userId = "user123";
    const tripId = "trip123";
    const collaborator = "collab@example.com";
    const searchBy = "email";

    const mockResponseData = { tripId, collaborators: [collaborator] }; // Replace with actual TripType structure
    mockAxiosPost.mockResolvedValueOnce({ data: mockResponseData });

    const result = await addCollaborator(
      userId,
      tripId,
      collaborator,
      searchBy
    );

    const expectedUrl = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`;
    const expectedBody = { collaborator, searchBy };

    expect(mockAxiosPost).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });
});

describe("Remove A Collaborator", () => {
  const mockAxiosPut = axios.put as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.put with the correct URL and payload, and return the updated trip data", async () => {
    const userId = "user123";
    const tripId = "trip123";
    const collaborator = "collab@example.com";
    const searchBy = "email";

    const mockResponseData = { tripId, collaborators: [] }; // Replace with actual TripType structure
    mockAxiosPut.mockResolvedValueOnce({ data: mockResponseData });

    const result = await deleteCollaborator(
      userId,
      tripId,
      collaborator,
      searchBy
    );

    const expectedUrl = `${ServerAPI}/users/${userId}/trips/${tripId}/collaborator`;
    const expectedBody = { collaborator, searchBy };

    expect(mockAxiosPut).toHaveBeenCalledWith(expectedUrl, expectedBody, {
      withCredentials: true,
    });
    expect(result).toEqual(mockResponseData);
  });

  it("should return null when axios.put throws an error", async () => {
    const userId = "user123";
    const tripId = "trip123";
    const collaborator = "collab@example.com";
    const searchBy = "email";

    mockAxiosPut.mockRejectedValueOnce(new Error("Network Error"));

    const result = await deleteCollaborator(
      userId,
      tripId,
      collaborator,
      searchBy
    );

    expect(result).toBeNull();
  });
});
