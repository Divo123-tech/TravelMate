import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTripDetails, getUserDetails } from "../services/apiService";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import {
  TripType,
  cityType,
  countryType,
  stateType,
  hotelType,
  activityType,
  flightType,
} from "../types/types";
import Country from "./EditTripComponents/Country";
import State from "./EditTripComponents/State";
import City from "./EditTripComponents/City";
import Hotel from "./EditTripComponents/Hotel";
import Activity from "./EditTripComponents/Activity";
import Flight from "./EditTripComponents/Flight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const EditTrip = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState<TripType | null>(null);

  const handleUserDetails = (e: any) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const fetchUserAndTrip = async () => {
      try {
        const userDetails = await getUserDetails();

        if (!userDetails) {
          throw new Error("User not found");
        }
        if (!tripId) {
          throw new Error("Trip ID not found");
        }

        const tripDetails = await getTripDetails(userDetails._id, tripId);
        setTrip(tripDetails); // Set trip state with the fetched data
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserAndTrip(); // Call fetchUserAndTrip when the component mounts
  }, [tripId]); // Depend on tripId so it refetches if the tripId changes
  return (
    <>
      {trip ? (
        <div>
          <div className="pt-8 px-16 flex justify-end">
            <motion.button
              className="bg-oxford-blue text-xl px-8 py-3 rounded-full text-baby-powder hover:bg-teal"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Collaborators <FontAwesomeIcon icon={faUserGroup} /> (
              {trip.collaborators?.length})
            </motion.button>
          </div>
          <header className="text-center flex flex-col gap-4 items-center">
            <input
              className="text-5xl font-medium text-center border-b-2 py-2 w-2/3 md:w-1/3 border-oxford-blue focus:outline-none"
              defaultValue={trip.name}
              onBlur={handleUserDetails}
            ></input>
            <p className="text-lg">
              Owner: {trip.owner.name} ({trip.owner.googleId})
            </p>
          </header>
          <section>
            <form className="flex justify-center text-center text-2xl md:gap-72 py-8 px-24 flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-medium">From</label>
                <input
                  type="date"
                  defaultValue={String(trip.startDate).slice(0, 10)}
                  className="py-2 px-3 border-1 border-black focus:outline-none rounded-full"
                  min={String(trip.startDate).slice(0, 10)}
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">To</label>
                <input
                  type="date"
                  defaultValue={String(trip.endDate).slice(0, 10)}
                  className="py-2 px-3 border-1 border-black focus:outline-none rounded-full"
                  min={String(trip.startDate).slice(0, 10)}
                ></input>
              </div>
            </form>
          </section>
          <section className="mb-12">
            <div id="countries-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-baby-powder w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-oxford-blue font-medium">
                    Countries
                  </h1>
                </motion.div>
                <motion.p
                  className="text-7xl font-bold text-teal pr-8 hover:cursor-pointer"
                  onClick={() => navigate("/explore/countries")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.p>
              </div>
              <motion.div
                className=""
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1 }}
                variants={container}
              >
                {trip.countries?.map((country: countryType, index: number) => {
                  return <Country key={index} country={country} />;
                })}
              </motion.div>
            </div>

            <div id="states-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-baby-powder w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-oxford-blue font-medium">
                    States
                  </h1>
                </motion.div>
                <motion.p
                  className="text-7xl font-bold text-teal pr-8 hover:cursor-pointer"
                  onClick={() => navigate("/explore/countries")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.p>
              </div>
              <motion.div
                className=""
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1 }}
                variants={container}
              >
                {trip.states?.map((state: stateType, index: number) => {
                  return <State key={index} state={state} />;
                })}
              </motion.div>
            </div>
            <div id="cities-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-baby-powder w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-oxford-blue font-medium">
                    Cities
                  </h1>
                </motion.div>
                <motion.p
                  className="text-7xl font-bold text-teal pr-8 hover:cursor-pointer"
                  onClick={() => navigate("/explore/countries")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.p>
              </div>
              <motion.div
                className=""
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1 }}
                variants={container}
              >
                {trip.cities?.map((city: cityType, index: number) => {
                  return <City city={city} key={index} />;
                })}
              </motion.div>
            </div>
            <div id="hotels-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-baby-powder w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-oxford-blue font-medium">
                    Hotels
                  </h1>
                </motion.div>
                <motion.p
                  className="text-7xl font-bold text-teal pr-8 hover:cursor-pointer"
                  onClick={() => navigate("/explore/countries")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.p>
              </div>
              <motion.div
                className=""
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1 }}
                variants={container}
              >
                {trip.hotels?.map((hotel: hotelType, index: number) => {
                  return <Hotel key={index} hotel={hotel} />;
                })}
              </motion.div>
            </div>
            <div id="attractions-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-baby-powder w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-oxford-blue font-medium">
                    Activities
                  </h1>
                </motion.div>
                <motion.p
                  className="text-7xl font-bold text-teal pr-8 hover:cursor-pointer"
                  onClick={() => navigate("/explore/countries")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.p>
              </div>
              <motion.div
                className=""
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1 }}
                variants={container}
              >
                {trip.activities?.map(
                  (activity: activityType, index: number) => {
                    return <Activity key={index} activity={activity} />;
                  }
                )}
              </motion.div>
            </div>
            <div id="flights-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-baby-powder w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-oxford-blue font-medium">
                    Flights
                  </h1>
                </motion.div>
                <motion.p
                  className="text-7xl font-bold text-teal pr-8 hover:cursor-pointer"
                  onClick={() => navigate("/explore/countries")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.p>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1 }}
                variants={container}
              >
                {trip.flights?.map((flight: flightType, index: number) => {
                  return <Flight flight={flight} key={index} />;
                })}
              </motion.div>
            </div>
          </section>
        </div>
      ) : (
        <h1>loading....</h1>
      )}
    </>
  );
};

export default EditTrip;
