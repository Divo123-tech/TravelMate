import { hotelType } from "../../types/types"; // Importing the hotelType interface
import { FC, useState } from "react"; // Importing FC and useState from React
import loading from "../../assets/loading.png"; // Importing a loading image asset

// Define the Props type for the component, specifying that it receives a hotel of type hotelType
type Props = {
  hotel: hotelType;
};

// Define the Hotel component as a functional component (FC) with Props
const Hotel: FC<Props> = ({ hotel }: Props) => {
  // State to track whether the hotel image has finished loading
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-8 md:mr-auto">
        {/* Display the loading image if the hotel image has not loaded yet */}
        {!isImageLoaded && <img src={loading} alt="Loading..." />}

        {/* Hotel image with dynamic source URL based on hotel.id */}
        <img
          src={`https://picsum.photos/seed/${hotel.id}/200/150`} // URL for the hotel image
          onLoad={() => setIsImageLoaded(true)} // Update state to true when the image has loaded
          alt={`Image of ${hotel.name}`} // Alt text for the image
        ></img>

        {/* Container for hotel details */}
        <div className="flex flex-col justify-center text-left">
          {/* Display the hotel location (city) */}
          <p className="text-oxford-blue text-md md:text-lg font-Rethink dark:text-white">
            Location: {hotel.city}
          </p>

          {/* Link to the hotel's website */}
          <a
            href={hotel.url} // URL to the hotel website
            className="text-oxford-blue text-2xl md:text-3xl font-Raleway dark:text-white"
          >
            {hotel.name}
          </a>
        </div>
      </div>
    </>
  );
};

export default Hotel; // Export the Hotel component for use in other parts of the application
