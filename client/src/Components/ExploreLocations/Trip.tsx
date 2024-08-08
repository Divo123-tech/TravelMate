import { TripType } from "../../types/types";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
type Props = {
  trip: TripType;
  addItinerariesToTrip: (tripId: string) => void;
};

const Trip = ({ trip, addItinerariesToTrip }: Props) => {
  const [successfullyAdded, setSuccessfullyAdded] = useState<boolean>(false);
  useEffect(() => {
    if (successfullyAdded) {
      const timer = setTimeout(() => {
        setSuccessfullyAdded(false);
      }, 750);

      // Cleanup function to clear the timeout if the component unmounts or successfullyAdded changes
      return () => clearTimeout(timer);
    }
  }, [successfullyAdded]);
  return (
    <div className="bg-teal px-4 py-2 rounded-full flex items-center justify-between">
      <h1 className="text-xl font-medium text-baby-powder font-Oswald">
        {trip.name}
      </h1>
      <motion.p
        className="text-2xl font-bold text-oxford-blue hover:cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          addItinerariesToTrip(trip._id);
          setSuccessfullyAdded(true);
        }}
      >
        {successfullyAdded ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </motion.p>
    </div>
  );
};

export default Trip;
