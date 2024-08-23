import { FC, useState } from "react"; // Importing React and useState hook
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import {} from "@fortawesome/free-solid-svg-icons"; // (Unused) Import for Font Awesome icons
import { stateType } from "../../types/types"; // Importing stateType for TypeScript typing
import loading from "../../assets/loading.png"; // Importing a loading image asset

// Define the Props type for the State component
type Props = {
  state: stateType; // State object with type stateType
  setCurrentState?: (state: stateType) => void; // Optional callback to set current state
  setSearch?: (searchQuery: string) => void; // Optional callback to set search query
};

// Define the State component as a functional component (FC)
const State: FC<Props> = ({ state, setCurrentState, setSearch }: Props) => {
  const navigate = useNavigate(); // Initialize the navigate function for routing
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State to track if the image has loaded

  // Function to handle navigation to cities and optionally update state and search query
  const goToCities = () => {
    if (setCurrentState && setSearch) {
      setCurrentState(state); // Update the current state if the callback is provided
      setSearch(""); // Clear the search query if the callback is provided
    }
    navigate(
      `/explore?locationType=cities&country=${state.countryName}&state=${state.name}`
    ); // Navigate to the cities page with query parameters
  };

  return (
    <>
      <div className="flex items-center gap-8 mr-auto">
        {/* Show a loading image while the actual image is loading */}
        {!isImageLoaded && <img src={loading} alt="Loading..." />}

        {/* Image of the state with dynamic source and onLoad handler */}
        <img
          src={`https://picsum.photos/seed/${state.name}/200/150`}
          onLoad={() => setIsImageLoaded(true)} // Set image loaded state to true when the image has loaded
        ></img>

        {/* Container for state information with an onClick handler for navigation */}
        <div className="flex flex-col md:text-left" onClick={goToCities}>
          {/* Display country information */}
          <p className="text-oxford-blue dark:text-white text-base text-lg whitespace-nowrap font-Rethink">
            Country: {state.countryName}, {state.countryCode}
          </p>

          {/* Display state name with a hover effect for cursor pointer */}
          <h1 className="text-oxford-blue dark:text-white text-3xl font-medium hover:cursor-pointer font-Raleway">
            {state.name}, {state.code}
          </h1>
        </div>
      </div>
    </>
  );
};

export default State; // Export the State component for use in other parts of the application
