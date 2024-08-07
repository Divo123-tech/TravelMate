import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { flightType } from "../../types/types";
import { motion } from "framer-motion";
import { ReactElement } from "react";
type Props = {
  flight: flightType;
  Button: ReactElement;
};

const Flight = ({ flight, Button }: Props) => {
  return (
    <motion.div className="bg-teal flex items-center mb-4 h-[150px] pl-4 md:pl-12 md:gap-24 ">
      <a href={flight.url}>
        <div className="flex flex-col">
          <div className="flex items-center gap-8">
            <div className="flex flex-col justify-center items-center text-white">
              <h1 className="text-3xl md:text-4xl">{flight.origin}</h1>
              <p className="text-md md:text-xl">
                {flight.departureDate.split("T")[1].slice(0, 5)}
              </p>
              <p className="text-sm md:text-lg whitespace-nowrap">
                {flight.departureDate.split("T")[0]}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center text-white gap-2">
              <p className="text-white">{flight.cabin} CLASS</p>

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
              <p className="text-sm md:text-lg whitespace-nowrap">
                {flight.arrivalDate.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      </a>
      <div className="flex flex-col md:flex-row md:px-4 justify-center md:justify-between w-full items-center">
        <p className="text-xl md:text-3xl text-baby-powder pl-4">
          {flight.price} {flight.currency}
        </p>
        {Button}
      </div>
    </motion.div>
  );
};

export default Flight;
