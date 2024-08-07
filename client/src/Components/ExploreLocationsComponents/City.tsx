import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { cityType, timeZoneType } from "../../types/types";
import loading from "../../assets/loading.png";
import { getLocationTime } from "../../services/apiService";
type Props = {
  city: cityType;
  setCurrentCity?: (city: cityType) => void;
};
const City = ({ city, setCurrentCity }: Props) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [timeZoneShown, setTimeZoneShown] = useState(false);
  const [timeZoneDetails, setTimeZoneDetails] = useState<timeZoneType | null>(
    null
  );

  const goToActivities = () => {
    if (setCurrentCity) {
      setCurrentCity(city);
    }
    navigate(
      `/explore?locationType=activities&country=${city.country}&state=${city.state}&city=${city.name}`
    );
  };

  const fetchLocationTimeZone = async (city: cityType) => {
    try {
      setTimeZoneShown((prevTimeZoneShown) => !prevTimeZoneShown);
      if (!timeZoneShown) {
        const timeZoneDetails = await getLocationTime(city.name, city.country);
        setTimeZoneDetails(timeZoneDetails);
      }
    } catch (err: any) {
      setTimeZoneDetails(null);
    }
  };
  return (
    <>
      <div className="bg-teal flex items-center gap-8 mr-auto ">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${city.name}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>
        <div className="flex flex-col md:text-left gap-3">
          <p className="text-white text-base text-lg whitespace-nowrap font-Rethink">
            State: {city.state}
          </p>
          <h1
            className="text-white text-3xl font-medium hover:cursor-pointer font-Oswald"
            onClick={goToActivities}
          >
            {city.name}
          </h1>
          <p className="text-white text-base text-lg whitespace-nowrap font-Rethink">
            Country: {city.country}
          </p>
        </div>
      </div>
      <div className="flex flex-col text-baby-powder text-center mx-16 hover:cursor-pointer">
        <motion.h1
          className="text-baby-powder font-medium text-2xl font-Oswald"
          onClick={() => fetchLocationTimeZone(city)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faClock} /> TimeZone
        </motion.h1>
        {timeZoneShown ? (
          timeZoneDetails ? (
            <div>
              <p className="text-lg font-Rethink">
                Time: {timeZoneDetails.time}, {timeZoneDetails.date}
              </p>
              <p className="text-lg font-Rethink">
                TimeZone: {timeZoneDetails.timeZone}
              </p>
            </div>
          ) : (
            <h1>loading...</h1>
          )
        ) : null}
      </div>
    </>
  );
};

export default City;
