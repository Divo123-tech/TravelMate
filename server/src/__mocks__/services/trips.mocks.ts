import mongoose from "mongoose";

export const mockTrip = {
  _id: "66a0704655cdf4fcde3f855g",
  owner: new mongoose.Types.ObjectId("66a0704655cdf4fcde3d858d"),
  name: "newTrip",
  startDate: "2024-07-18",
  endDate: "2024-07-29",
  collaborators: [], // Empty array for collaborators
  countries: [], // Empty array for countries
  states: [], // Empty array for states
  cities: [], // Empty array for cities
  activities: [], // Empty array for activities
  flights: [], // Empty array for flights
  hotels: [], // Empty array for hotels
  videos: [], // Empty array for videos
};

export const mockTripCollaboratorAdded = {
  _id: "66a0704655cdf4fcde3f855g",

  owner: new mongoose.Types.ObjectId("66a0704655cdf4fcde3d858d"),
  name: "newTrip",
  startDate: "2024-07-18",
  endDate: "2024-07-29",
  collaborators: [
    { _id: new mongoose.Types.ObjectId("66f0704655cdf4fcde3d858d") },
  ], // Empty array for collaborators
  countries: [], // Empty array for countries
  states: [], // Empty array for states
  cities: [], // Empty array for cities
  activities: [], // Empty array for activities
  flights: [], // Empty array for flights
  hotels: [], // Empty array for hotels
  videos: [], // Empty array for videos
};

export const mockTripDetailsEdited = {
  _id: "66a0704655cdf4fcde3f855g",

  owner: new mongoose.Types.ObjectId("66a0704655cdf4fcde3d858d"),
  name: "EditedName",
  startDate: "2024-08-18",
  endDate: "2024-08-29",
  collaborators: [], // Empty array for collaborators
  countries: [], // Empty array for countries
  states: [], // Empty array for states
  cities: [], // Empty array for cities
  activities: [], // Empty array for activities
  flights: [], // Empty array for flights
  hotels: [], // Empty array for hotels
  videos: [], // Empty array for videos
};

export const mockTripLocationAdded = {
  _id: "66a0704655cdf4fcde3f855g",
  owner: new mongoose.Types.ObjectId("66a0704655cdf4fcde3d858d"),
  name: "newTrip",
  startDate: "2024-07-18",
  endDate: "2024-07-29",
  collaborators: [], // Empty array for collaborators
  countries: [], // Empty array for countries
  states: [
    {
      name: "Bali",
      code: "BA",
      countryName: "Indonesia",
      countryCode: "ID",
      type: "states",
    },
  ], // Empty array for states
  cities: [], // Empty array for cities
  activities: [], // Empty array for activities
  flights: [], // Empty array for flights
  hotels: [], // Empty array for hotels
  videos: [], // Empty array for videos
};
