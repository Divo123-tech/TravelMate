import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext, FC } from "react";
import { getTripDetails, getCurrentUser } from "../../services/users.service";
import { faUserGroup, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {
  TripType,
  cityType,
  countryType,
  stateType,
  hotelType,
  flightType,
  attractionType,
  videoType,
  UserType,
} from "../../types/types";
import Country from "../ExploreLocations/Country";
import State from "../ExploreLocations/State";
import City from "../ExploreLocations/City";
import Hotel from "../ExploreLocations/Hotel";
import Flight from "../Flights/Flight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { PageContext, SocketContext, UserContext } from "../../App";
import DeleteButton from "../DeleteButton";
import { Spinner } from "react-bootstrap";
import CollaboratorsModal from "./CollaboratorsModal";
import CustomActivityModal from "./CustomActivityModal";
import Attraction from "../ExploreLocations/Attraction";
import { container } from "../../data/animation";
import Video from "../ExploreLocations/Video";
import RejectedModal from "./RejectedModal";

const EditTrip: FC = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { setCurrentPage } = pageContext;
  useEffect(() => {
    setCurrentPage("");
  }, []);
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { user } = context;
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [collaboratorsModalShow, setCollaboratorsModalShow] =
    useState<boolean>(false);
  const [trip, setTrip] = useState<TripType | null>(null);
  const [activityModalShow, setActivityModalShow] = useState<boolean>(false);
  const [rejectedModalShow, setRejectedModalShow] = useState<boolean>(false);
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

        if (
          updatedTrip?.owner._id != user?._id &&
          !updatedTrip.collaborators.some((collab) => collab._id == user?._id)
        ) {
          setRejectedModalShow(true);
        }
      };
      // console.log(trip?.owner._id, user?._id)
      // if (
      //   trip?.owner._id != user?._id &&
      //   trip?.collaborators.some((collab) => collab._id != user?._id)
      // ) {
      //   setRejectedModalShow(true);
      // }

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

        if (!userDetails || !tripId) {
          throw new Error("404 not found");
        }

        const tripDetails = await getTripDetails(tripId);
        if (
          tripDetails?.owner._id != user?._id &&
          !tripDetails.collaborators.some(
            (collab: UserType) => collab._id == user?._id
          )
        ) {
          setRejectedModalShow(true);
        }
        setTrip(tripDetails); // Set trip state with the fetched data
      } catch (err) {
        setTrip(null);
      }
    };

    fetchUserAndTrip(); // Call fetchUserAndTrip when the component mounts
  }, [tripId, socket]); // Depend on tripId so it refetches if the tripId changes
  return (
    <>
      {trip ? (
        <div className="dark:bg-black">
          <div className="pt-8 px-16 flex justify-end">
            <motion.button
              className="bg-oxford-blue text-xl px-8 py-3 rounded-full text-alice-blue hover:bg-turquoise"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCollaboratorsModalShow(true)}
            >
              Collaborators <FontAwesomeIcon icon={faUserGroup} /> (
              {trip.collaborators?.length})
            </motion.button>
          </div>
          <header className="text-center flex flex-col gap-4 items-center dark:bg-black dark:text-white">
            <input
              className="text-5xl font-medium text-center border-b-2 py-2 w-2/3 md:w-1/3 border-oxford-blue dark:bg-black dark:border-white focus:outline-none"
              defaultValue={trip.name}
              name="name"
              onChange={handleChange}
              onBlur={editDetails}
            ></input>
            <p className="text-lg">
              Owner: {trip.owner.name || trip.owner.email}
            </p>
          </header>
          <section>
            <form className="flex justify-center text-center text-2xl md:gap-72 py-8 px-24 flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white">From</label>
                <input
                  type="date"
                  defaultValue={String(trip.startDate).slice(0, 10)}
                  className="py-2 px-3 border-1 border-black focus:outline-none rounded-full"
                  min={String(trip.startDate).slice(0, 10)}
                  name="startDate"
                  onChange={handleChange}
                  onBlur={editDetails}
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white">To</label>
                <input
                  type="date"
                  defaultValue={String(trip.endDate).slice(0, 10)}
                  className="py-2 px-3 border-1 border-black focus:outline-none rounded-full"
                  min={String(trip.startDate).slice(0, 10)}
                  name="endDate"
                  onChange={handleChange}
                  onBlur={editDetails}
                ></input>
              </div>
            </form>
          </section>
          <section className="flex justify-center items-center">
            <motion.button
              className="text-alice-blue font-medium text-2xl px-12 py-4 rounded-full bg-oxford-blue"
              onClick={() => setActivityModalShow(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faPenToSquare} /> Add Custom Activity!
            </motion.button>
          </section>
          <section className="mb-12">
            <div id="countries-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-oxford-blue bg-opacity-80 w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-alice-blue font-medium">
                    Countries
                  </h1>
                </motion.div>
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
                      className="bg-turquoise dark:bg-oxford-blue flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20 w-full pr-8"
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
                  className="bg-oxford-blue bg-opacity-80 w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-alice-blue font-medium">
                    States
                  </h1>
                </motion.div>
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
                      className="bg-turquoise dark:bg-oxford-blue flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20 w-full pr-8"
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
                  className="bg-oxford-blue bg-opacity-80 w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-alice-blue font-medium">
                    Cities
                  </h1>
                </motion.div>
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
                      className="bg-turquoise dark:bg-oxford-blue flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20 w-full pr-8"
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
                  className="bg-oxford-blue bg-opacity-80 w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-alice-blue font-medium">
                    Hotels
                  </h1>
                </motion.div>
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
                      className="bg-turquoise dark:bg-oxford-blue flex flex-col md:flex-row justify-center mb-4 items-center sm:gap-12 md:gap-20 pr-8"
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
                  className="bg-oxford-blue bg-opacity-80 w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-alice-blue font-medium">
                    Activities
                  </h1>
                </motion.div>
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
                      className="bg-turquoise dark:bg-oxford-blue flex flex-col md:flex-row justify-center mb-4 items-center sm:gap-12 md:gap-20 pr-8"
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
            <div id="videos-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-oxford-blue bg-opacity-80 w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-alice-blue font-medium">
                    Videos
                  </h1>
                </motion.div>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1 }}
                variants={container}
              >
                {trip.videos?.map((video: videoType) => {
                  return (
                    <motion.div
                      layout
                      className="bg-turquoise dark:bg-oxford-blue flex flex-col md:flex-row justify-center mb-4 items-center sm:gap-12 md:gap-20 pr-8"
                      key={video.url}
                    >
                      <Video
                        video={video}
                        key={Math.random().toString(36).substring(2, 8)}
                      />
                      <DeleteButton
                        deleteFunction={() => deleteFromTrip(video)}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            <div id="flights-div">
              <div className="flex justify-between items-center">
                <motion.div
                  className="bg-oxford-blue bg-opacity-80 w-48 text-center my-10 p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <h1 className="text-3xl text-alice-blue font-medium">
                    Flights
                  </h1>
                </motion.div>
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
                      key={Math.random().toString(36).substring(2, 8)}
                    />
                  );
                })}
              </motion.div>
            </div>
          </section>
          <CollaboratorsModal
            show={collaboratorsModalShow}
            onHide={() => setCollaboratorsModalShow(false)}
            collaborators={trip?.collaborators}
            tripId={tripId || ""}
            userId={user?.googleId || ""}
            setTrip={setTrip}
            isOwner={trip.owner.googleId == user?.googleId}
          />
          <CustomActivityModal
            show={activityModalShow}
            onHide={() => setActivityModalShow(false)}
            tripId={trip._id}
          />
          <RejectedModal
            show={rejectedModalShow}
            onHide={() => setRejectedModalShow(false)}
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
