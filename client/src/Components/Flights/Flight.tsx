import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { flightType } from "../../types/types";
import { motion } from "framer-motion";
import { FC, ReactElement } from "react";

// Define the props type for the Flight component
type Props = {
  flight: flightType; // Flight details
  Button: ReactElement; // Button element to be displayed with the flight information
};

// Functional component to display flight information
const Flight: FC<Props> = ({ flight, Button }: Props) => {
  return (
    <motion.div className="flex flex-col md:flex-row items-center mb-4 pl-4 md:pl-12 md:gap-24 bg-alice-blue ">
      {/* Link to the flight's URL */}
      <a href={flight.url} className="block">
        <div className="flex flex-col hover:scale-105">
          <div className="flex items-center gap-8">
            {/* Origin and departure details */}
            <div className="flex flex-col justify-center items-center text-black">
              <h1 className="text-3xl md:text-4xl">{flight.origin}</h1>
              <p className="text-md md:text-xl">
                {flight.departureDate.split("T")[1].slice(0, 5)}
              </p>
              <p className="text-sm md:text-lg whitespace-nowrap">
                {flight.departureDate.split("T")[0]}
              </p>
            </div>
            {/* Flight details such as cabin class, duration, and stops */}
            <div className="flex flex-col justify-center items-center text-black gap-2">
              <p className="text-black">{flight.cabin} CLASS</p>
              <p className="text-md md:text-xl">{flight.duration}</p>
              <div className="flex items-center gap-2">
                <hr className="w-32 md:w-72 border-3" />
                <FontAwesomeIcon
                  icon={faPlane}
                  className="text-md md:text-xl"
                />
              </div>
              <p className="text-md md:text-xl">
                {flight.stops === 0 ? "Direct" : `${flight.stops} stops`}
              </p>
            </div>
            {/* Destination and arrival details */}
            <div className="flex flex-col justify-center text-black items-center">
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
      {/* Price and action button */}
      <div className="flex flex-col md:flex-row md:px-4 justify-center md:justify-between w-full items-center">
        <p className="text-xl md:text-3xl text-black pl-4">
          {flight.price} {flight.currency}
        </p>
      </div>
      {Button}
    </motion.div>
  );
};

export default Flight;
