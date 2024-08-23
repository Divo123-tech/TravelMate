import { attractionType } from "../../types/types";
import { FC, useState } from "react";
import loading from "../../assets/loading.png";

// Define the type for the props that the Attraction component will receive
type Props = {
  attraction: attractionType; // The attraction object containing information to display
};

// Functional component to display attraction details
const Attraction: FC<Props> = ({ attraction }: Props) => {
  // State to track if the image has been fully loaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {/* Container div with styling for the attraction information */}
      <div className="flex dark:bg-oxford-blue bg-turquoise items-center gap-8 mr-auto w-full">
        {/* Display a loading image while the actual attraction image is loading */}
        {!isImageLoaded && <img src={loading} alt="Loading..." />}

        {/* Attraction image */}
        <img
          src={`https://picsum.photos/seed/${attraction.name}/200/150`} // URL for the image, using the attraction name as a seed for randomness
          onLoad={() => setIsImageLoaded(true)} // Set image loaded state to true once the image has fully loaded
          alt={`Image of ${attraction.name}`} // Alt text for accessibility
        />

        {/* Container for attraction details */}
        <div className="flex flex-col justify-start">
          {/* Display the attraction's city and country */}
          <p className="text-oxford-blue dark:text-white text-md md:text-lg font-Rethink">
            {attraction.city}, {attraction.country}
          </p>

          {/* Display the attraction's name as a link */}
          <a
            href={attraction.url} // URL for the attraction, makes the name a clickable link
            className="text-oxford-blue dark:text-white text-2xl md:text-3xl font-Raleway"
            target="_blank" // Open the link in a new tab
            rel="noopener noreferrer" // Security best practice for links opening in a new tab
          >
            {attraction.name}
          </a>

          {/* Display the attraction's address */}
          <p className="text-oxford-blue dark:text-white text-md md:text-lg font-Rethink">
            @ {attraction.address}
          </p>
        </div>
      </div>
    </>
  );
};

export default Attraction;
