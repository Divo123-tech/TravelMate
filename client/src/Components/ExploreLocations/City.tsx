import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { cityType, timeZoneType } from "../../types/types";
import loading from "../../assets/loading.png";
import { getLocationTime } from "../../services/locations.service";

// Define the type for the props that the City component will receive
type Props = {
  city: cityType; // The city object containing information to display
  setCurrentCity?: (city: cityType) => void; // Optional callback to set the current city
};

// Functional component to display city details and handle navigation
const City: FC<Props> = ({ city, setCurrentCity }: Props) => {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // State to manage image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // State to manage the visibility of time zone details
  const [timeZoneShown, setTimeZoneShown] = useState(false);

  // State to hold the fetched time zone details
  const [timeZoneDetails, setTimeZoneDetails] = useState<timeZoneType | null>(
    null
  );

  // Function to navigate to the activities page for the current city
  const goToActivities = () => {
    // Set the current city if the callback is provided
    if (setCurrentCity) {
      setCurrentCity(city);
    }

    // Navigate to the explore page with query parameters for city activities
    navigate(
      `/explore?locationType=activities&country=${city.country}&state=${city.state}&city=${city.name}`
    );
  };

  // Function to fetch and toggle the display of time zone details
  const fetchLocationTimeZone = async (city: cityType) => {
    try {
      // Toggle the visibility of the time zone details
      setTimeZoneShown((prevTimeZoneShown) => !prevTimeZoneShown);

      // Fetch time zone details if they are not currently shown
      if (!timeZoneShown) {
        const timeZoneDetails = await getLocationTime(city.name, city.country);
        setTimeZoneDetails(timeZoneDetails);
      }
    } catch (err: any) {
      // Handle errors by resetting time zone details to null
      setTimeZoneDetails(null);
    }
  };

  return (
    <>
      {/* Container for city details */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:mr-auto">
        {/* Display a loading image while the actual city image is loading */}
        {!isImageLoaded && <img src={loading} alt="Loading..." />}

        {/* City image */}
        <img
          src={`https://picsum.photos/seed/${city.name}/200/150`} // URL for the image, using the city name as a seed for randomness
          onLoad={() => setIsImageLoaded(true)} // Set image loaded state to true once the image has fully loaded
          alt={`Image of ${city.name}`} // Alt text for accessibility
        />

        {/* Container for city details */}
        <div className="flex flex-col md:text-left gap-3 dark:text-white">
          {/* Display the city state */}
          <p className="text-oxford-blue text-base text-lg whitespace-nowrap font-Rethink dark:text-white">
            State: {city.state}
          </p>

          {/* Display the city name and make it clickable to navigate to activities */}
          <h1
            className="text-oxford-blue text-2xl font-medium hover:cursor-pointer font-Raleway dark:text-white"
            onClick={goToActivities}
          >
            {city.name}
          </h1>

          {/* Display the city country */}
          <p className="text-oxford-blue text-base text-lg whitespace-nowrap font-Rethink dark:text-white">
            Country: {city.country}
          </p>
        </div>
      </div>

      {/* Container for time zone details */}
      <div className="flex flex-col dark:text-white text-oxford-blue text-center mx-16 hover:cursor-pointer">
        <motion.h1
          className="bg-oxford-blue dark:bg-champion-blue text-alice-blue text-center px-6 py-3 text-lg whitespace-nowrap font-Raleway"
          onClick={() => fetchLocationTimeZone(city)} // Fetch time zone details on click
          whileHover={{ scale: 1.05 }} // Animation effect on hover
          whileTap={{ scale: 0.9 }} // Animation effect on tap
        >
          <FontAwesomeIcon icon={faClock} /> TimeZone
        </motion.h1>

        {/* Display time zone details if they are shown */}
        {timeZoneShown ? (
          timeZoneDetails ? (
            <div>
              <p className="text-lg  font-Rethink">
                Time: {timeZoneDetails.time}, {timeZoneDetails.date}
              </p>
              <p className="text-lg font-Rethink">
                TimeZone: {timeZoneDetails.timeZone}
              </p>
            </div>
          ) : (
            <h1>Loading...</h1>
          )
        ) : null}
      </div>
    </>
  );
};

export default City;
