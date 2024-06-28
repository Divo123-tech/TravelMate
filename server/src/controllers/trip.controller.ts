import { Request, Response } from "express";
import tripsService from "../services/trips.service.js";
import usersService from "../services/users.service.js";
import { TripInterface } from "../models/trips.model.js";
import { UserInterface } from "../models/users.model.js";

//function to add a trip into the trips database and the trips array of the user
const addTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    //get the user
    const user = await usersService.getUserDetails(req.params.id);
    //check if the user exists
    if (!user) {
      throw new Error("User Not Found");
    }
    //add the trip and get the newly created trip
    const trip = await tripsService.addTrip(user._id, req.body.name);
    //add a trip to the given user's trips array
    await usersService.addTrip(req.params.id, trip._id);
    res.status(200).json(trip);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//function to get the details of a trip
const getTripDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json(await tripsService.getTripDetails(req.params.tripId));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//function to delete a trip from both the trips database
//from the owners trip array and the collaborators trips array
const deleteTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    //get the trip wanting to be deleted
    const trip: TripInterface | null = await tripsService.getTripDetails(
      req.params.tripId
    );
    //check if the trip exists
    if (!trip) {
      throw new Error("Trip Not Found");
    }
    //get the owner of the trip
    const tripOwner: UserInterface | null = await usersService.findUserById(
      trip.owner
    );
    //check if the user trying to delete the trip is the owner

    //delete the trip from the owner's trips array
    await usersService.deleteTrip(req.params.id, req.params.tripId);
    //go through all the collaborators from the trip being deleted

    //if the owner deletes the trip
    if (tripOwner?.googleId == req.params.id) {
      for (const collaboratorId of trip.collaborators || []) {
        //find the collaborator
        const collaborator: UserInterface | null =
          await usersService.findUserById(collaboratorId);
        if (!collaborator) {
          throw new Error("User Not Found");
        }
        //delete it from the collaborator's trips array
        await usersService.deleteTrip(
          collaborator?.googleId,
          req.params.tripId
        );
      }
      //delete the trip from the owner's database and
      res.status(200).json(await tripsService.deleteTrip(req.params.tripId));
    }
    //else remove the collaborator from the trip
    else {
      const user: any = await usersService.getUserDetails(req.params.id);
      res
        .status(200)
        .json(
          await tripsService.removeCollaborator(req.params.tripId, user?._id)
        );
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//
const addCollaborator = async (req: Request, res: Response): Promise<void> => {
  try {
    const collaborator = await usersService.getUserDetails(
      req.body.collaborator
    );
    if (!collaborator) {
      throw new Error("User not found");
    }
    await usersService.addTrip(req.body.collaborator, req.params.tripId);
    res
      .status(200)
      .json(
        await tripsService.addCollaborator(req.params.tripId, collaborator._id)
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const removeCollaborator = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const collaborator = await usersService.getUserDetails(
      //googleId string
      req.body.collaborator
    );
    if (!collaborator) {
      throw new Error("User not found");
    }
    await usersService.deleteTrip(req.body.collaborator, req.params.tripId);
    res
      .status(200)
      .json(
        await tripsService.removeCollaborator(
          req.params.tripId,
          collaborator._id
        )
      );
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  addTrip,
  getTripDetails,
  deleteTrip,
  addCollaborator,
  removeCollaborator,
};
