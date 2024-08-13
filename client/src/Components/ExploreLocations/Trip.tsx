import { TripType } from "../../types/types"; // Importing the TripType type for TypeScript typing
import { motion } from "framer-motion"; // Importing motion for animations
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesomeIcon for icons
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons"; // Importing specific icons
import { FC, useEffect, useState } from "react"; // Importing React hooks and FC type

// Define the Props type for the Trip component
type Props = {
  trip: TripType; // Trip object with type TripType
  addItinerariesToTrip: (tripId: string) => void; // Function to add itineraries to a trip
};

// Define the Trip component as a functional component (FC)
const Trip: FC<Props> = ({ trip, addItinerariesToTrip }: Props) => {
  const [successfullyAdded, setSuccessfullyAdded] = useState<boolean>(false); // State to track if itineraries have been successfully added

  // Effect hook to handle showing and hiding the success icon
  useEffect(() => {
    if (successfullyAdded) {
      // Set a timer to reset the successfullyAdded state after 750ms
      const timer = setTimeout(() => {
        setSuccessfullyAdded(false);
      }, 750);

      // Cleanup function to clear the timer if the component unmounts or successfullyAdded changes
      return () => clearTimeout(timer);
    }
  }, [successfullyAdded]); // Dependency array includes successfullyAdded

  return (
    <div className="bg-teal px-4 py-2 rounded-full flex items-center justify-between">
      {/* Trip name display */}
      <h1 className="text-xl font-medium text-baby-powder font-Oswald">
        {trip.name}
      </h1>

      {/* Icon button with animations */}
      <motion.p
        className="text-2xl font-bold text-oxford-blue hover:cursor-pointer"
        whileHover={{ scale: 1.05 }} // Scale up on hover
        whileTap={{ scale: 0.9 }} // Scale down on click
        onClick={() => {
          addItinerariesToTrip(trip._id); // Call function to add itineraries
          setSuccessfullyAdded(true); // Set state to show success icon
        }}
      >
        {/* Display success icon if itineraries have been added, otherwise show plus icon */}
        {successfullyAdded ? (
          <FontAwesomeIcon icon={faCheck} /> // Success checkmark icon
        ) : (
          <FontAwesomeIcon icon={faPlus} /> // Plus icon for adding
        )}
      </motion.p>
    </div>
  );
};

export default Trip; // Export the Trip component for use in other parts of the application
