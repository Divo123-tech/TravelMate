export type UserType = {
  _id: string;
  googleId: string;
  email: string;
  picture: string;
  name: string;
  passport: PassportType;
  currencyUsed: string;
  trips: TripType[];
};

export type PassportType = {
  name: string;
  code: string;
};

export type TripType = {
  _id: string;
  name: string;
  owner: UserType;
  collaborators?: [];
  startDate: Date;
  endDate?: Date;
  countries?: [];
  states?: [];
  cities?: [];
  activities?: [];
  flights?: [];
  hotels?: [];
};

export type ItineraryType = {
  countryName: string;
  desc: string;
  imgSrc: string;
};

export type ReviewType = {
  imgSrc: string;
  name: string;
  title: string;
  body: string;
};
