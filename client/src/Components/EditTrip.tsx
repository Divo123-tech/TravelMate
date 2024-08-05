import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getTripDetails, getCurrentUser } from "../services/apiService";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import {
  TripType,
  cityType,
  countryType,
  stateType,
  hotelType,
  flightType,
  attractionType,
} from "../types/types";
import Country from "./ExploreLocationsComponents/Country";
import State from "./ExploreLocationsComponents/State";
import City from "./ExploreLocationsComponents/City";
import Hotel from "./ExploreLocationsComponents/Hotel";
import Flight from "./FlightsComponents/Flight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { SocketContext, UserContext } from "../App";
import DeleteButton from "./DeleteButton";
import { Spinner } from "react-bootstrap";
import CollaboratorsModal from "./CollaboratorsModal";
import Attraction from "./ExploreLocationsComponents/Attraction";
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const EditTrip = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { user } = context;
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [trip, setTrip] = useState<TripType | null>(null);
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { socket, emitEvent } = socketContext;

  useEffect(() => {
    if (socket) {
      // Set up the listener for 'tripUpdated' event
      const handleTripUpdate = (updatedTrip: TripType) => {
        setTrip(updatedTrip);
      };

      socket.on("tripUpdated", handleTripUpdate);
      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("tripUpdated", handleTripUpdate);
      };
    }
  }, [socket]);

  const handleChange = (e: any) => {
    setTrip((prevTrip: any) => {
      return {
        ...prevTrip,
        [e.target.name]: e.target.value,
      };
    });
  };

  const editDetails = () => {
    emitEvent("EditTrip", {
      tripId: trip?._id,
      name: trip?.name,
      startDate: trip?.startDate,
      endDate: trip?.endDate,
    });
  };

  const deleteFromTrip = (itineraryItem: any) => {
    emitEvent("RemoveLocationFromTrip", {
      tripId: trip?._id,
      data: { details: itineraryItem, type: itineraryItem.type },
    });
  };

  useEffect(() => {
    const fetchUserAndTrip = async () => {
      try {
        const userDetails = await getCurrentUser();

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
  }, [tripId, socket]); // Depend on tripId so it refetches if the tripId changes
  return (
    <>
      {trip ? (
        <div>
          <div className="pt-8 px-16 flex justify-end">
            <motion.button
              className="bg-oxford-blue text-xl px-8 py-3 rounded-full text-baby-powder hover:bg-teal"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalShow(true)}
            >
              Collaborators <FontAwesomeIcon icon={faUserGroup} /> (
              {trip.collaborators?.length})
            </motion.button>
          </div>
          <header className="text-center flex flex-col gap-4 items-center">
            <input
              className="text-5xl font-medium text-center border-b-2 py-2 w-2/3 md:w-1/3 border-oxford-blue focus:outline-none"
              defaultValue={trip.name}
              name="name"
              onChange={handleChange}
              onBlur={() => editDetails()}
            ></input>
            <p className="text-lg">
              Owner: {trip.owner.name || trip.owner.email} ({trip.owner.email})
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
                  name="startDate"
                  onChange={handleChange}
                  onBlur={() => editDetails()}
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">To</label>
                <input
                  type="date"
                  defaultValue={String(trip.endDate).slice(0, 10)}
                  className="py-2 px-3 border-1 border-black focus:outline-none rounded-full"
                  min={String(trip.startDate).slice(0, 10)}
                  name="endDate"
                  onChange={handleChange}
                  onBlur={() => editDetails()}
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
                  return (
                    <motion.div
                      layout
                      className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20 w-full pr-8"
                      key={country.iso2}
                    >
                      <Country key={index} country={country} />

                      <DeleteButton
                        deleteFunction={() => deleteFromTrip(country)}
                      />
                    </motion.div>
                  );
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
                {trip.states?.map((state: stateType) => {
                  return (
                    <motion.div
                      layout
                      className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20 w-full pr-8"
                      key={state.code}
                    >
                      <State state={state} />
                      <DeleteButton
                        deleteFunction={() => deleteFromTrip(state)}
                      />
                    </motion.div>
                  );
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
                {trip.cities?.map((city: cityType) => {
                  return (
                    <motion.div
                      layout
                      className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20 w-full pr-8"
                      key={city.name}
                    >
                      <City city={city} />
                      <DeleteButton
                        deleteFunction={() => deleteFromTrip(city)}
                      />
                    </motion.div>
                  );
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
                {trip.hotels?.map((hotel: hotelType) => {
                  return (
                    <motion.div
                      layout
                      className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center sm:gap-12 md:gap-20 pr-8"
                      key={hotel.id}
                    >
                      <Hotel hotel={hotel} />
                      <DeleteButton
                        deleteFunction={() => deleteFromTrip(hotel)}
                      />
                    </motion.div>
                  );
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
                {trip.activities?.map((activity: attractionType) => {
                  return (
                    <motion.div
                      layout
                      className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center sm:gap-12 md:gap-20 pr-8"
                      key={activity.id}
                    >
                      <Attraction attraction={activity} />
                      <DeleteButton
                        deleteFunction={() => deleteFromTrip(activity)}
                      />
                    </motion.div>
                  );
                })}
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
                {trip.flights?.map((flight: flightType) => {
                  return (
                    <Flight
                      flight={flight}
                      Button={
                        <DeleteButton
                          deleteFunction={() => deleteFromTrip(flight)}
                        />
                      }
                    />
                  );
                })}
              </motion.div>
            </div>
          </section>
          <CollaboratorsModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            collaborators={trip?.collaborators}
            tripId={tripId || ""}
            userId={user?.googleId || ""}
            setTrip={setTrip}
            isOwner={trip.owner.googleId == user?.googleId}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8 justify-center items-center my-auto text-2xl">
          <Spinner
            animation="border"
            role="status"
            className="mb-auto text-center"
          ></Spinner>
          <h1>Loading.......</h1>
        </div>
      )}
    </>
  );
};

export default EditTrip;
