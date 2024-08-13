import {
  mockEditedUserResponse,
  mockNewUserResponse,
  mockTripAddedResponse,
  mockUserDetailsResponse,
} from "../../__mocks__/services/users.mocks";
import usersService from "../../services/users.service";

// Test suite for checking if a user exists
describe("Find if User exists", () => {
  // Mock the userExists function from the usersService
  const mockUserExists = jest.fn();
  usersService.userExists = mockUserExists;

  // Mock the entire usersService module
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        userExists: jest.fn(),
      },
    };
  });

  // Clear mocks after each test to ensure tests do not affect each other
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case for when the user exists
  it("Should return true if user exists", async () => {
    mockUserExists.mockResolvedValue(true);
    const response = await usersService.userExists("UserExists@gmail.com");
    expect(response).toBe(true);
  });

  // Test case for when the user does not exist
  it("Should return false if user does not exist", async () => {
    mockUserExists.mockResolvedValue(false);
    const response = await usersService.userExists("nonExistent@gmail.com");
    expect(response).toBe(false);
  });
});

// Test suite for creating a new user
describe("Create User", () => {
  // Mock the addUser function from the usersService
  const mockAddUser = jest.fn();
  usersService.addUser = mockAddUser;

  // Mock the entire usersService module
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        addUser: jest.fn(),
      },
    };
  });

  // Clear mocks after each test to ensure tests do not affect each other
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case for successfully creating a new user
  it("Should return the newly created user after successfully creating a user", async () => {
    mockAddUser.mockResolvedValue(mockNewUserResponse);
    const response = await usersService.addUser(
      "1234567890abcdef",
      "user@example.com",
      "https://example.com/user-picture.jpg"
    );
    // Check that the returned response matches the expected values
    expect(response.googleId).toBe("1234567890abcdef");
    expect(response.email).toBe("user@example.com");
    expect(response.picture).toBe("https://example.com/user-picture.jpg");
  });
});

// Test suite for editing user details
describe("Edit User Details", () => {
  // Mock the editUserDetails function from the usersService
  const mockEditUser = jest.fn();
  usersService.editUserDetails = mockEditUser;

  // Mock the entire usersService module
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        editUserDetails: jest.fn(),
      },
    };
  });

  // Clear mocks after each test to ensure tests do not affect each other
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case for successfully updating user details
  it("Should return the newly updated user", async () => {
    mockEditUser.mockResolvedValue(mockEditedUserResponse);
    const response = await usersService.editUserDetails(
      "1234567890abcdef",
      "newName",
      {
        code: "ID",
        name: "Indonesia",
      },
      "IDR"
    );
    // Check that the returned response matches the expected values
    expect(response?.name).toBe("newName");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });
});

// Test suite for getting user details
describe("Get User Details", () => {
  // Mock the getUserDetails function from the usersService
  const mockGetUser = jest.fn();
  usersService.getUserDetails = mockGetUser;

  // Mock the entire usersService module
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        getUserDetails: jest.fn(),
      },
    };
  });

  // Clear mocks after each test to ensure tests do not affect each other
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Mock implementation for getUserDetails
  mockGetUser.mockResolvedValue(mockUserDetailsResponse);

  // Test case for retrieving user details by email
  it("Should return the user details from the email", async () => {
    const response = await usersService.getUserDetails(
      "user@example.com",
      "email"
    );
    // Check that the returned response matches the expected values
    expect(response?.email).toBe("user@example.com");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });

  // Test case for retrieving user details by _id
  it("Should return the user details from the _id", async () => {
    const response = await usersService.getUserDetails("123456789", "_id");
    // Check that the returned response matches the expected values
    expect(response?._id).toBe("123456789");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });

  // Test case for retrieving user details by googleId
  it("Should return the user details from the googleId", async () => {
    const response = await usersService.getUserDetails(
      "1234567890abcdef",
      "googleId"
    );
    // Check that the returned response matches the expected values
    expect(response?.googleId).toBe("1234567890abcdef");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });
});

// Test suite for managing user trips
describe("User Trips", () => {
  // Test suite for adding a new trip to the user's trips array
  describe("Add a new trip to the user's trips array", () => {
    // Mock the addTrip function from the usersService
    const mockAddtrip = jest.fn();
    usersService.addTrip = mockAddtrip;

    // Mock the entire usersService module
    jest.mock("../../services/users.service", () => {
      return {
        default: {
          addTrip: jest.fn(),
        },
      };
    });

    // Clear mocks after each test to ensure tests do not affect each other
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test case for successfully adding a trip
    it("Should return the user details with the newly added trip in the trips array", async () => {
      mockAddtrip.mockResolvedValue(mockTripAddedResponse);
      const response = await usersService.addTrip(
        "1234567890abcdef",
        "trip123456"
      );
      // Check that the trips array includes the newly added trip
      expect(response?.trips?.length).toBe(1);
    });
  });

  // Test suite for deleting a trip from the user's trips array
  describe("Delete a trip from the user's trips array", () => {
    // Mock the deleteTrip function from the usersService
    const mockDeleteTrip = jest.fn();
    usersService.deleteTrip = mockDeleteTrip;

    // Mock the entire usersService module
    jest.mock("../../services/users.service", () => {
      return {
        default: {
          deleteTrip: jest.fn(),
        },
      };
    });

    // Clear mocks after each test to ensure tests do not affect each other
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test case for successfully deleting a trip
    it("Should return the user details with the trip removed from the trips array", async () => {
      mockDeleteTrip.mockResolvedValue(mockUserDetailsResponse);
      const response = await usersService.deleteTrip(
        "1234567890abcdef",
        "trip123456"
      );
      // Check that the trips array no longer contains the deleted trip
      expect(response?.trips?.length).toBe(0);
    });
  });
});
