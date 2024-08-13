import { useState, FC } from "react";
import { motion } from "framer-motion";
import AddToTripModal from "./AddToTripModal";

// Define the type for component props
type Props = {
  itineraries: any[]; // Array of itinerary objects to be passed to the modal
};

// Functional component to add itineraries to a trip
const AddToTrip: FC<Props> = ({ itineraries }: Props) => {
  // State to manage the visibility of the modal
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="md:ml-auto pr-16 flex flex-col items-center justify-center">
      {/* Button to open the modal */}
      <motion.button
        className="bg-oxford-blue text-baby-powder px-6 ml-8 py-3 rounded-full text-lg whitespace-nowrap font-Rethink"
        whileHover={{ scale: 1.05 }} // Scale up the button on hover
        whileTap={{ scale: 0.9 }} // Scale down the button on tap
        onClick={() => setModalShow(true)} // Show the modal when the button is clicked
      >
        Add to Trip
      </motion.button>
      {/* Modal component to handle adding itineraries to a trip */}
      <AddToTripModal
        show={modalShow} // Control visibility of the modal
        onHide={() => setModalShow(false)} // Hide the modal when needed
        itineraries={itineraries} // Pass itineraries data to the modal
      />
    </div>
  );
};

export default AddToTrip;
