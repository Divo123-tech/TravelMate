import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../App";
import { getTripDetails, getUserDetails } from "../services/apiService";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { TripType } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const EditTrip = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user } = context;
  const { tripId } = useParams();
  const [trip, setTrip] = useState<TripType | null>(null);

  const handleUserDetails = (e: any) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    const getTrip = async () => {
      try {
        if (!user) {
          throw new Error("user not found");
        }
        if (!tripId) {
          throw new Error("trip not found");
        }
        console.log();
        setTrip(await getTripDetails(user?._id, tripId)); // Set user state with the fetched data
      } catch (err) {
        console.log(err);
      }
    };
    getTrip(); // Call getUser when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

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
          <header className="text-center">
            <input
              className="text-5xl font-medium text-center border-b-2 py-2 w-2/3 md:w-1/3 border-oxford-blue focus:outline-none"
              defaultValue={trip.name}
              onBlur={handleUserDetails}
            ></input>
          </header>
          <section>
            <form className="flex justify-center text-center text-2xl md:gap-72 py-8 px-24 flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-medium">From</label>
                <input
                  type="date"
                  defaultValue={String(trip.startDate).slice(0, 10)}
                  className="py-2 px-3 border-1 border-black focus:outline-none rounded-full"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">To</label>
                <input
                  type="date"
                  defaultValue={String(trip.startDate).slice(0, 10)}
                  className="py-2 px-3 border-1 border-black focus:outline-none rounded-full"
                ></input>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <h1>loading....</h1>
      )}
    </>
  );
};

export default EditTrip;
