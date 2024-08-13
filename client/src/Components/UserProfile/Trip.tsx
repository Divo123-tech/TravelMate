import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";
import loading from "../../assets/loading.png";

// Define the type for the component props
type Props = {
  role: string; // Role of the user associated with the trip
  id: string; // Unique identifier for the trip
  name: string; // Name of the trip
  startDate: string; // Start date of the trip
  endDate: string; // End date of the trip
  userId: string; // Unique identifier for the user
};

// Define the Trip component
const Trip: FC<Props> = ({ role, id, name, startDate, endDate }: Props) => {
  // State to manage image loading status
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {/* Display a loading image while the main image is being loaded */}
      {!isImageLoaded && <img src={loading} alt="Loading..." />}

      {/* Main trip image */}
      <img
        src={`https://picsum.photos/seed/${id}/200/150`} // Dynamic image URL based on the trip ID
        onLoad={() => setIsImageLoaded(true)} // Update the state when the image is fully loaded
        alt={`Trip image for ${name}`} // Alt text for accessibility
      />

      {/* Trip details */}
      <div className="text-white flex flex-col gap-3">
        {/* Display the user's role */}
        <p className="text-md md:text-lg font-Rethink">
          <FontAwesomeIcon icon={faUser} /> Role: {role}
        </p>

        {/* Display the trip name */}
        <p className="text-xl md:text-3xl font-Oswald">{name}</p>

        {/* Display the trip duration */}
        <p className="text-md md:text-lg font-Rethink">
          <FontAwesomeIcon icon={faCalendarDays} /> {startDate.slice(0, 10)} -{" "}
          {endDate}
        </p>
      </div>
    </>
  );
};

export default Trip;
