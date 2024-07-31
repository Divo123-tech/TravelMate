import FlightsWP from "../assets/FlightsWP.jpg";
import { useState, FC, useEffect, useContext } from "react";
import { getAllFlights } from "../services/apiService";
import { flightType } from "../types/types";
import loading from "../assets/loading.png";
import { UserContext } from "../App";
import {
  faPlane,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Placeholder from "react-bootstrap/Placeholder";
import DetailsModal from "./FlightsComponents/DetailsModal";

const Flights: FC = () => {
  const [flightDetails, setFlightDetails] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    adults: 1,
    nonstop: false,
    children: 0,
    cabin: "ECONOMY",
    maxPrice: 1000000000,
  });
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { user } = context;
  const [modalShow, setModalShow] = useState(false);
  const [flights, setFlights] = useState<flightType[] | null>(null);
  const [showFlights, setShowFlights] = useState(false);
  const [totalFlights, settotalFlights] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const getFlights = async () => {
    const {
      origin,
      destination,
      departureDate,
      adults,
      nonstop,
      children,
      cabin,
      maxPrice,
    } = flightDetails;
    setShowFlights(true);
    setFlights(null);
    try {
      const fetchedFlights = await getAllFlights(
        origin,
        destination,
        departureDate,
        adults,
        nonstop,
        children,
        cabin,
        user?.currencyUsed || "USD",
        maxPrice,
        currentPage
      );
      setFlights(fetchedFlights.data);
      settotalFlights(fetchedFlights.total);
      console.log(fetchedFlights);
    } catch (err) {
      setFlights([]);
      settotalFlights(0);
      setCurrentPage(0);
    }
  };
  useEffect(() => {
    if (showFlights) {
      getFlights();
    }
  }, [currentPage, showFlights]);

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setFlightDetails((prevFlightDetails) => {
      return {
        ...prevFlightDetails,
        [`${name}`]: value,
      };
    });
  };
  return (
    <>
      <div
        className="relative bg-cover bg-center h-screen mb-auto"
        style={{ backgroundImage: `url(${FlightsWP})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1
            className="text-4xl font-bold text-white mb-8 text-center"
            id="title-header"
          >
            Millions of cheap flights. One simple search.
          </h1>
          <form className="bg-teal flex py-3 px-4 gap-4 justify-center rounded-full flex-wrap">
            <div className="flex flex-col justify-center items-center gap-1">
              <label className="text-baby-powder font-medium text-xl">
                Origin
              </label>
              <input
                type="text"
                className="bg-baby-powder p-2 rounded-full text-md"
                placeholder="Airport Code eg.CGK, LHR, LAX"
                name="origin"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <label className="text-baby-powder font-medium text-xl">
                Destination
              </label>
              <input
                type="text"
                className="bg-baby-powder p-2 rounded-full text-md"
                placeholder="Airport Code eg.CGK, LHR, LAX"
                name="destination"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="text-baby-powder font-medium text-xl">
                Departure Date
              </label>
              <input
                type="date"
                className="bg-baby-powder p-2 rounded-full text-md text-gray-400"
                name="departureDate"
                onChange={handleChange}
              ></input>
            </div>
            <button
              className="bg-baby-powder text-md px-2 rounded-full text-oxford-blue font-medium"
              type="button"
              onClick={() => setModalShow(true)}
            >
              Advanced Filters
            </button>
            <button
              className="bg-oxford-blue text-lg px-4 py-2 rounded-full text-baby-powder font-medium disabled:opacity-80 disabled:cursor-not-allowed"
              disabled={flightDetails.origin == ""}
              type="button"
              onClick={() => {
                getFlights();
                document
                  .getElementById("flights")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Search!
            </button>
          </form>
        </div>
      </div>

      <div id="flights"></div>
      <div
        className={`${
          showFlights ? "block" : "hidden"
        } flex flex-col gap-4 py-4`}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-oxford-blue">
          Flights From {flightDetails.origin} to {flightDetails.destination}
        </h1>
        {flights ? (
          flights.length > 0 ? (
            <div>
              {flights.map((flight: flightType) => {
                return (
                  <motion.div className="bg-teal flex items-center mb-4 h-[150px] pl-4 md:pl-12 md:gap-24 ">
                    <a href={flight.url}>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-8">
                          <div className="flex flex-col justify-center items-center text-white">
                            <h1 className="text-3xl md:text-4xl">
                              {flight.origin}
                            </h1>
                            <p className="text-md md:text-xl">
                              {flight.departureDate.split("T")[1].slice(0, 5)}
                            </p>
                            <p className="text-sm md:text-lg whitespace-nowrap">
                              {flight.departureDate.split("T")[0]}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center items-center text-white gap-2">
                            <p className="text-white">{flight.cabin} CLASS</p>

                            <p className="text-md md:text-xl">
                              {flight.duration}
                            </p>
                            <div className="flex items-center gap-2">
                              <hr className="w-32 md:w-72 border-3" />
                              <FontAwesomeIcon
                                icon={faPlane}
                                className="text-md md:text-xl"
                              />
                            </div>
                            <p className="text-md md:text-xl">
                              {flight.stops == 0
                                ? "Direct"
                                : `${flight.stops} stops`}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center text-white items-center">
                            <h1 className="text-3xl md:text-4xl">
                              {flight.destination}
                            </h1>
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
                      <motion.button
                        className="bg-oxford-blue text-baby-powder px-6 ml-8 py-3 rounded-full text-lg whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Add to Trip
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <h1 className="text-oxford-blue text-2xl md:text-3xl text-center my-24">
              No Flights Matched your search {":("}
            </h1>
          )
        ) : (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center bg-teal mt-4">
              <img src={loading} alt="Loading..." className="mr-4" />
              <div className="flex flex-col space-y-2 w-full h-[150px] pt-3">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={3} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={5} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={7} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-end px-12 py-8 mb-auto">
          <h1 className="text-xl">
            <FontAwesomeIcon
              icon={faCaretLeft}
              className="text-2xl"
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage == 1
                    ? (prevPage = Math.ceil(totalFlights / 10))
                    : (prevPage -= 1)
                )
              }
            />{" "}
            Page: {totalFlights == 0 ? 0 : currentPage} of{" "}
            {Math.ceil(totalFlights / 10)}{" "}
            <FontAwesomeIcon
              icon={faCaretRight}
              className="text-2xl"
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage == Math.ceil(totalFlights / 10)
                    ? (prevPage = 1)
                    : (prevPage += 1)
                )
              }
            />
          </h1>
        </div>
      </div>
      <DetailsModal
        flightDetails={flightDetails}
        setFlightDetails={setFlightDetails}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Flights;
