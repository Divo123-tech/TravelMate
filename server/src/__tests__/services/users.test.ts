import {
  mockEditedUserResponse,
  mockNewUserResponse,
  mockTripAddedResponse,
  mockUserDetailsResponse,
} from "../../__mocks__/users.mocks";
import usersService from "../../services/users.service";

describe("Find if User exists", () => {
  const mockUserExists = jest.fn();
  usersService.userExists = mockUserExists;
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        userExists: jest.fn(),
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should return true if user exists", async () => {
    mockUserExists.mockResolvedValue(true);
    const response = await usersService.userExists("UserExists@gmail.com");
    expect(response).toBe(true);
  });
  it("Should return false if user does not exist", async () => {
    mockUserExists.mockResolvedValue(false);
    const response = await usersService.userExists("nonExistent@gmail.com");
    expect(response).toBe(false);
  });
});

describe("Create User", () => {
  const mockAddUser = jest.fn();
  usersService.addUser = mockAddUser;
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        addUser: jest.fn(),
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should return the newly created user after succesfully creating a user", async () => {
    mockAddUser.mockResolvedValue(mockNewUserResponse);
    const response = await usersService.addUser(
      "1234567890abcdef",
      "user@example.com",
      "https://example.com/user-picture.jpg"
    );
    expect(response.googleId).toBe("1234567890abcdef");
    expect(response.email).toBe("user@example.com");
    expect(response.picture).toBe("https://example.com/user-picture.jpg");
  });
});

describe("Edit User Details", () => {
  const mockEditUser = jest.fn();
  usersService.editUserDetails = mockEditUser;
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        editUserDetails: jest.fn(),
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    expect(response?.name).toBe("newName");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });
});

describe("Get User Details", () => {
  const mockGetUser = jest.fn();
  usersService.getUserDetails = mockGetUser;
  jest.mock("../../services/users.service", () => {
    return {
      default: {
        getUserDetails: jest.fn(),
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  mockGetUser.mockResolvedValue(mockUserDetailsResponse);
  it("Should return the user details from the email", async () => {
    const response = await usersService.getUserDetails(
      "user@example.com",
      "email"
    );
    expect(response?.email).toBe("user@example.com");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });
  it("Should return the user details from the _id", async () => {
    const response = await usersService.getUserDetails("123456789", "_id");
    expect(response?._id).toBe("123456789");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });
  it("Should return the user details from the googleId", async () => {
    const response = await usersService.getUserDetails(
      "1234567890abcdef",
      "googleId"
    );
    expect(response?.googleId).toBe("1234567890abcdef");
    expect(response?.passport?.code).toBe("ID");
    expect(response?.passport?.name).toBe("Indonesia");
    expect(response?.currencyUsed).toBe("IDR");
  });
});

describe("User Trips", () => {
  describe("Add a new trip to the user's trips array", () => {
    const mockAddtrip = jest.fn();
    usersService.addTrip = mockAddtrip;
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
    it("Should return the user details with the newly added trip in the trips array", async () => {
      mockAddtrip.mockResolvedValue(mockTripAddedResponse);
      const response = await usersService.addTrip(
        "1234567890abcdef",
        "trip123456"
      );
      expect(response?.trips?.length).toBe(1);
    });
  });
  describe("Delete a trip from the user's trips array", () => {
    const mockDeleteTrip = jest.fn();
    usersService.deleteTrip = mockDeleteTrip;
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
    it("Should return the user details with the newly added trip in the trips array", async () => {
      mockDeleteTrip.mockResolvedValue(mockUserDetailsResponse);
      const response = await usersService.deleteTrip(
        "1234567890abcdef",
        "trip123456"
      );
      expect(response?.trips?.length).toBe(0);
    });
  });
});
