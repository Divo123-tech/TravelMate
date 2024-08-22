import CreateTripImage from "../../assets/CreateTripImage.png";
import { FC, useState } from "react";
import NewTripModal from "./NewTripModal";

// Define the CreateNewTrip component
const CreateNewTrip: FC = () => {
  // State to control the visibility of the modal
  const [modalShow, setModalShow] = useState(false);

  return (
    <section className="relative inline-block bg-oxford-blue ">
      {/* Background image for the section */}
      <img
        src={CreateTripImage}
        alt="Example"
        className="w-full h-full"
        // Ensures the image covers the entire section
      />
      {/* Button to trigger the creation of a new trip */}
      <div className="block">
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-medium font-Oswald bg-turquoise bg-opacity-100 hover:bg-opacity-70 border-none p-8 md:py-6 md:px-24 text-xl md:text-4xl rounded-full block hover:scale-150"
          // Styles the button with text color, background color, padding, font, and rounded corners
          // Positioned in the center of the section using absolute positioning and transforms
          onClick={() => setModalShow(true)}
          // Opens the modal when the button is clicked
        >
          CREATE NEW TRIP
        </button>
      </div>
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
