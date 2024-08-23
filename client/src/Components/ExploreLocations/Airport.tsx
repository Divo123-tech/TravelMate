import { airportType } from "../../types/types";
import { FC, useState } from "react";
import loading from "../../assets/loading.png";

// Define the type for the props that the Airport component will receive
type Props = {
  airport: airportType; // The airport object containing information to display
};

// Functional component to display airport details
const Airport: FC<Props> = ({ airport }: Props) => {
  // State to track if the image has been fully loaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {/* Container div with styling for the airport information */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:mr-auto">
        {/* Display a loading image while the actual airport image is loading */}
        {!isImageLoaded && <img src={loading} alt="Loading..." />}

        {/* Airport image */}
        <img
          src={`https://picsum.photos/seed/${airport.name}/200/150`} // URL for the image, using the airport name as a seed for randomness
          onLoad={() => setIsImageLoaded(true)} // Set image loaded state to true once the image has fully loaded
          alt={`Image of ${airport.name}`} // Alt text for accessibility
        />

        {/* Container for airport details */}
        <div className="flex flex-col justify-start">
          {/* Display the airport location */}
          <p className="text-oxford-blue text-md md:text-lg font-Rethink dark:text-white">
            Location: {airport.city}, {airport.region}
          </p>

          {/* Display the airport name */}
          <a className="text-oxford-blue text-2xl md:text-3xl font-Raleway dark:text-white">
            {airport.name}
          </a>
        </div>
      </div>
    </>
  );
};

export default Airport;
