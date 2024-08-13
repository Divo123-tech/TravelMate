import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

// Define the props type for the DeleteButton component
type Props = {
  deleteFunction: () => void; // Function to be called when the button is clicked
};

// Define the DeleteButton component
const DeleteButton: FC<Props> = ({ deleteFunction }: Props) => {
  return (
    <div className="md:ml-auto flex flex-col items-center justify-center">
      {/* Motion button with animation effects */}
      <motion.button
        className="text-red-700 md:bg-red-200 ml-auto rounded-full md:px-9 md:py-2 md:rounded-full text-4xl md:text-2xl mr-2 md:mr-0 whitespace-nowrap"
        // Animation effect when button is hovered
        whileHover={{ scale: 1.05 }}
        // Animation effect when button is clicked
        whileTap={{ scale: 0.9 }}
        // Event handler for button click
        onClick={deleteFunction}
      >
        {/* FontAwesome icon for trash can */}
        <FontAwesomeIcon icon={faTrashCan} />
        {/* Text label for button, hidden on small screens */}
        <span className="hidden md:inline"> Delete</span>
      </motion.button>
    </div>
  );
};

export default DeleteButton;
