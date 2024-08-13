import CreateTripImage from "../../assets/CreateTripImage.png";
import { FC, useState } from "react";
import NewTripModal from "./NewTripModal";

// Define the CreateNewTrip component
const CreateNewTrip: FC = () => {
  // State to control the visibility of the modal
  const [modalShow, setModalShow] = useState(false);

  return (
    <section className="relative inline-block bg-oxford-blue mb-16">
      {/* Background image for the section */}
      <img
        src={CreateTripImage}
        alt="Example"
        className="w-full h-full"
        // Ensures the image covers the entire section
      />
      {/* Button to trigger the creation of a new trip */}
      <button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-oxford-blue font-medium font-Oswald bg-baby-powder bg-opacity-50 hover:bg-opacity-70 border-none p-8 md:py-12 md:px-24 text-2xl md:text-5xl rounded-full"
        // Styles the button with text color, background color, padding, font, and rounded corners
        // Positioned in the center of the section using absolute positioning and transforms
        onClick={() => setModalShow(true)}
        // Opens the modal when the button is clicked
      >
        CREATE NEW TRIP
      </button>
      {/* Modal component for creating a new trip */}
      <NewTripModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // Passes `modalShow` state to control the visibility of the modal
        // Passes a function to close the modal when triggered
      />
    </section>
  );
};

export default CreateNewTrip;
