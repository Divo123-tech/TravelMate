import { motion } from "framer-motion";
const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
import { faTrashCan, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flightType } from "../../types/types";

type Props = {
  flight: flightType;
};

const Hotel = ({ flight }: Props) => {
  const handleDelete = (flight: flightType) => {
    console.log(flight);
  };
  return (
    <motion.div
      className="bg-oxford-blue flex items-center mb-4 h-[150px] pl-4 md:pl-12 gap-16 md:gap-24 "
      variants={childVariant}
    >
      <a href={flight.url}>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <p className="text-white">{flight.cabin} CLASS</p>
          </div>
          <div className="bg-oxford-blue flex items-center gap-8">
            <div className="flex flex-col justify-center items-center text-white">
              <h1 className="text-3xl md:text-4xl">{flight.origin}</h1>
              <p className="text-md md:text-xl">
                {flight.departureDate.split("T")[1].slice(0, 5)}
              </p>
              <p className="text-sm md:text-lg">
                {flight.departureDate.split("T")[0]}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center text-white">
              <p className="text-md md:text-xl">{flight.duration}</p>
              <div className="flex items-center gap-2">
                <hr className="w-32 md:w-72 border-3" />
                <FontAwesomeIcon
                  icon={faPlane}
                  className="text-md md:text-xl"
                />
              </div>
              <p className="text-md md:text-xl">
                {flight.stops == 0 ? "Direct" : `${flight.stops} stops`}
              </p>
            </div>
            <div className="flex flex-col justify-center text-white items-center">
              <h1 className="text-3xl md:text-4xl">{flight.destination}</h1>
              <p className="text-lg md:text-xl">
                {flight.arrivalDate.split("T")[1].slice(0, 5)}
              </p>
              <p className="text-sm md:text-lg">
                {flight.arrivalDate.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      </a>
      <div className="ml-auto pr-12">
        <motion.button
          className="text-red-700 md:bg-red-200 ml-auto rounded-full md:px-9 md:py-2 md:rounded-full text-2xl mr-2 md:mr-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(flight)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          <span className="hidden md:inline"> Remove</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Hotel;
