export const mockNewUserResponse = {
  _id: "123456789",
  googleId: "1234567890abcdef",
  email: "user@example.com",
  picture: "https://example.com/user-picture.jpg",
  name: "",
  passport: {},
  currencyUsed: "",
  trips: [],
};

export const mockEditedUserResponse = {
  _id: "123456789",
  googleId: "1234567890abcdef",
  email: "user@example.com",
  picture: "https://example.com/user-picture.jpg",
  name: "newName",
  passport: {
    code: "ID",
    name: "Indonesia",
  },
  currencyUsed: "IDR",
  trips: [],
};

export const mockUserDetailsResponse = {
  _id: "123456789",
  googleId: "1234567890abcdef",
  email: "user@example.com",
  picture: "https://example.com/user-picture.jpg",
  name: "newName",
  passport: {
    code: "ID",
    name: "Indonesia",
  },
  currencyUsed: "IDR",
  trips: [],
};

export const mockTripAddedResponse = {
  _id: "123456789",
  googleId: "1234567890abcdef",
  email: "user@example.com",
  picture: "https://example.com/user-picture.jpg",
  name: "newName",
  passport: {
    code: "ID",
    name: "Indonesia",
  },
  currencyUsed: "IDR",
  trips: [{ _id: "trip123456" }],
};
