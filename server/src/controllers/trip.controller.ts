import { Request, Response } from "express";
import tripsService from "../services/trips.service.js";
import usersService from "../services/users.service.js";
const addTrip = async (req: Request, res: Response) => {
  try {
    const user = await usersService.getUserDetails(req.params.id);
    if (!user) {
      throw new Error("error");
    }
    const trip = await tripsService.addTrip(user._id, req.body.name);
    await usersService.addTrip(req.params.id, trip._id);
    return res.status(200).json(trip);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getTripDetails = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await tripsService.getTripDetails(req.params.tripId));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  addTrip,
  getTripDetails,
};
