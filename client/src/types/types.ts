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

export type countryType = {
  name: string;
  iso2: string;
  currency: string;
  capital: string;
  continent: string;
};

export type stateType = {
  name: string;
  code: string;
  countryName: string;
  countryCode: string;
};

export type cityType = {
  name: string;
  country: string;
  state: string;
};

export type hotelType = {
  name: string;
  id: string;
  url: string;
  city: string;
  country: string;
};
//delete later
export type activityType = {
  name: string;
  id: string;
  address: string;
  city: string;
  countryCode: string;
  country: string;
  url: string;
};

export type attractionType = {
  name: string;
  id: string;
  address: string;
  city: string;
  country: string;
  url: string;
};

export type flightType = {
  origin: string;
  destination: string;
  duration: string;
  stops: number;
  departureDate: string;
  arrivalDate: string;
  cabin: string;
  url: string;
};
export type CountryExchangeType = {
  conversionRate: number;
};

export type VisaRequirementsType = {
  visaStatus: string;
  visaDuration: string;
};

export type timeZoneType = {
  date: string;
  time: string;
  timeZone: string;
};

//create AirportInterface for the output
export type airportType = {
  name: string;
  region: string;
  city: string;
  iata: string;
};

export type videoType = {
  url: string;
  title: string;
  views: string;
  channel: string;
  date: string;
  length: string;
};
