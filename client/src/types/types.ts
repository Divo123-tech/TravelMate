import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction } from "react";
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

export type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

export type PageContextType = {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
};

export type SocketContextType = {
  socket: Socket | null;
  emitEvent: (eventName: string, data: any) => void;
};
export type PassportType = {
  name: string;
  code: string;
};

export type TripType = {
  _id: string;
  name: string;
  owner: UserType;
  collaborators: [];
  startDate: Date;
  endDate?: Date;
  countries?: [];
  states?: [];
  cities?: [];
  activities?: [];
  flights?: [];
  hotels?: [];
  videos?: [];
  type: string;
};

export type ItineraryType = {
  countryName: string;
  desc: string;
  imgSrc: string;
  url: string;
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
  type: string;
};

export type stateType = {
  name: string;
  code: string;
  countryName: string;
  countryCode: string;
  type: string;
};

export type cityType = {
  name: string;
  country: string;
  state: string;
  type: string;
};

export type hotelType = {
  name: string;
  id: string;
  url: string;
  city: string;
  country: string;
  type: string;
};

export type attractionType = {
  name: string;
  id: string;
  address: string;
  city: string;
  country: string;
  url: string;
  type: string;
};

export type flightType = {
  origin: string;
  destination: string;
  duration: string;
  adults: number;
  stops: number;
  departureDate: string;
  arrivalDate: string;
  cabin: string;
  url: string;
  price: number;
  airline: string;
  currency: string;
  type: string;
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
  type: string;
};
