import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction } from "react";

/**
 * Defines the shape of a user object in the system.
 */
export type UserType = {
  _id: string; // Unique identifier for the user
  googleId: string; // Google ID of the user
  email: string; // Email address of the user
  picture: string; // URL to the user's profile picture
  name: string; // Name of the user
  passport: PassportType; // Passport details of the user
  currencyUsed: string; // Currency used by the user
  trips: TripType[]; // Array of trips associated with the user
};

/**
 * Defines the context type for user state management in the application.
 */
export type UserContextType = {
  user: UserType | null; // The current user object or null if no user is logged in
  setUser: Dispatch<SetStateAction<UserType | null>>; // Function to update the user state
};

/**
 * Defines the context type for managing the current page state.
 */
export type PageContextType = {
  currentPage: string; // The name of the current page
  setCurrentPage: Dispatch<SetStateAction<string>>; // Function to update the current page state
};

/**
 * Defines the context type for managing socket connection and events.
 */
export type SocketContextType = {
  socket: Socket | null; // The socket instance or null if not connected
  emitEvent: (eventName: string, data: any) => void; // Function to emit events via socket
};

/**
 * Defines the shape of a passport object.
 */
export type PassportType = {
  name: string; // Name of the passport type
  code: string; // Code representing the passport type
};

/**
 * Defines the shape of a trip object.
 */
export type TripType = {
  _id: string; // Unique identifier for the trip
  name: string; // Name of the trip
  owner: UserType; // The user who owns the trip
  collaborators: []; // Array of collaborators on the trip (currently an empty array)
  startDate: Date; // Start date of the trip
  endDate?: Date; // Optional end date of the trip
  countries?: []; // Optional array of countries involved in the trip
  states?: []; // Optional array of states involved in the trip
  cities?: []; // Optional array of cities involved in the trip
  activities?: []; // Optional array of activities planned for the trip
  flights?: []; // Optional array of flights related to the trip
  hotels?: []; // Optional array of hotels for the trip
  videos?: []; // Optional array of videos related to the trip
  type: string; // Type of the trip
};

/**
 * Defines the shape of an itinerary object.
 */
export type ItineraryType = {
  countryName: string; // Name of the country
  desc: string; // Description of the itinerary item
  imgSrc: string; // URL of the image associated with the itinerary item
  url: string; // URL for more information about the itinerary item
};

/**
 * Defines the shape of a review object.
 */
export type ReviewType = {
  imgSrc: string; // URL of the image for the review
  name: string; // Name of the reviewer
  title: string; // Title of the review
  body: string; // Body content of the review
};

/**
 * Defines the shape of a country object.
 */
export type countryType = {
  name: string; // Name of the country
  iso2: string; // ISO 3166-1 alpha-2 code of the country
  currency: string; // Currency used in the country
  capital: string; // Capital city of the country
  continent: string; // Continent where the country is located
  type: string; // Type of country (e.g., developed, developing)
};

/**
 * Defines the shape of a state object.
 */
export type stateType = {
  name: string; // Name of the state
  code: string; // State code
  countryName: string; // Name of the country the state belongs to
  countryCode: string; // ISO 3166-1 alpha-2 code of the country
  type: string; // Type of state (e.g., province, territory)
};

/**
 * Defines the shape of a city object.
 */
export type cityType = {
  name: string; // Name of the city
  country: string; // Country where the city is located
  state: string; // State where the city is located
  type: string; // Type of city (e.g., metropolis, town)
};

/**
 * Defines the shape of a hotel object.
 */
export type hotelType = {
  name: string; // Name of the hotel
  id: string; // Unique identifier for the hotel
  url: string; // URL for the hotel's website or booking page
  city: string; // City where the hotel is located
  country: string; // Country where the hotel is located
  type: string; // Type of hotel (e.g., luxury, budget)
};

/**
 * Defines the shape of an attraction object.
 */
export type attractionType = {
  name: string; // Name of the attraction
  id: string; // Unique identifier for the attraction
  address: string; // Address of the attraction
  city: string; // City where the attraction is located
  country: string; // Country where the attraction is located
  url: string; // URL for more information about the attraction
  type: string; // Type of attraction (e.g., museum, park)
};

/**
 * Defines the shape of a flight object.
 */
export type flightType = {
  origin: string; // City or airport of origin
  destination: string; // City or airport of destination
  duration: string; // Duration of the flight
  adults: number; // Number of adult passengers
  stops: number; // Number of stops on the flight
  departureDate: string; // Departure date of the flight
  arrivalDate: string; // Arrival date of the flight
  cabin: string; // Cabin class (e.g., economy, business)
  url: string; // URL for booking or more information about the flight
  price: number; // Price of the flight
  airline: string; // Airline operating the flight
  currency: string; // Currency of the flight price
  type: string; // Type of flight (e.g., direct, layover)
};

/**
 * Defines the shape of a country exchange rate object.
 */
export type CountryExchangeType = {
  conversionRate: number; // Conversion rate of the currency
};

/**
 * Defines the shape of a visa requirements object.
 */
export type VisaRequirementsType = {
  visaStatus: string; // Visa status (e.g., required, not required)
  visaDuration: string; // Duration of the visa validity
};

/**
 * Defines the shape of a timezone object.
 */
export type timeZoneType = {
  date: string; // Date in the timezone
  time: string; // Time in the timezone
  timeZone: string; // Name of the timezone
};

/**
 * Defines the shape of an airport object.
 */
export type airportType = {
  name: string; // Name of the airport
  region: string; // Region where the airport is located
  city: string; // City where the airport is located
  iata: string; // IATA code of the airport
};

/**
 * Defines the shape of a video object.
 */
export type videoType = {
  url: string; // URL of the video
  title: string; // Title of the video
  views: string; // Number of views
  channel: string; // Channel where the video is posted
  date: string; // Date the video was posted
  length: string; // Duration of the video
  type: string; // Type of video content
};
