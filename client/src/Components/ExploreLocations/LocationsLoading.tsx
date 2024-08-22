import Placeholder from "react-bootstrap/Placeholder"; // Importing the Placeholder component from React Bootstrap
import loading from "../../assets/loading.png"; // Importing a loading image asset
import { FC } from "react"; // Importing the FC type from React

// Define the LocationsLoading component as a functional component (FC)
const LocationsLoading: FC = () => {
  return (
    // Generate an array of 5 items to render loading placeholders
    Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center bg-turquoise dark:bg-oxford-blue mt-4"
      >
        {/* Display the loading image */}
        <img src={loading} alt="Loading..." className="mr-4" />

        {/* Container for loading placeholders */}
        <div className="flex flex-col space-y-2 w-full h-[150px] pt-3">
          {/* Placeholder for the first line of text */}
          <Placeholder as="p" animation="glow">
            <Placeholder xs={3} /> {/* Placeholder width */}
          </Placeholder>

          {/* Placeholder for the second line of text */}
          <Placeholder as="p" animation="glow">
            <Placeholder xs={5} /> {/* Placeholder width */}
          </Placeholder>

          {/* Placeholder for the third line of text */}
          <Placeholder as="p" animation="glow">
            <Placeholder xs={7} /> {/* Placeholder width */}
          </Placeholder>

          {/* Placeholder for the fourth line of text */}
          <Placeholder as="p" animation="glow">
            <Placeholder xs={4} /> {/* Placeholder width */}
          </Placeholder>
        </div>
      </div>
    ))
  );
};

export default LocationsLoading; // Export the LocationsLoading component for use in other parts of the application
