import FlightsWP from "../../assets/FlightsWP.jpg";
import { useState, FC, useEffect, useContext } from "react";
import { getAllFlights } from "../../services/locations.service";
import { flightType } from "../../types/types";
import loading from "../../assets/loading.png";
import { UserContext, PageContext } from "../../App";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Placeholder from "react-bootstrap/Placeholder";
import DetailsModal from "./DetailsModal";
import Flight from "./Flight";
import AddToTrip from "../ExploreLocations/AddToTrip";
import LocationsLoading from "../ExploreLocations/LocationsLoading";

// Functional component to display flight search and results
const Flights: FC = () => {
  // State to manage flight search criteria
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

  // Contexts for user and page information
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);

  // Ensure the component is used within the necessary providers
  if (!userContext || !pageContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user } = userContext;
  const { setCurrentPage } = pageContext;

  // Set the current page to "Flights" on component mount
  useEffect(() => {
    setCurrentPage("Flights");
  }, []);

  // State to manage modal visibility
  const [modalShow, setModalShow] = useState(false);

  // State to manage flight data and pagination
  const [flights, setFlights] = useState<flightType[] | null>(null);
  const [showFlights, setShowFlights] = useState(false);
  const [totalFlights, settotalFlights] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // Function to fetch flights based on current search criteria
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
      // Fetch flight data from the service
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
        currentPageNumber
      );
      setFlights(fetchedFlights.data);
      settotalFlights(fetchedFlights.total);
    } catch (err) {
      setFlights([]);
      settotalFlights(0);
      setCurrentPageNumber(0);
    }
  };

  // Fetch flights when the page number or showFlights changes
  useEffect(() => {
    if (showFlights) {
      getFlights();
    }
  }, [currentPageNumber, showFlights]);

  // Handle input changes in the flight search form
  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setFlightDetails((prevFlightDetails) => ({
      ...prevFlightDetails,
      [`${name}`]: value,
    }));
  };

  return (
    <>
      {/* Background image and overlay */}
      <div
        className="relative bg-cover bg-center h-screen mb-auto"
        style={{ backgroundImage: `url(${FlightsWP})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1
            className="text-4xl text-white mb-8 text-center font-Playfair"
            id="title-header"
          >
            Millions of Cheap Flights. One Simple Search.
          </h1>
          {/* Flight search form */}
          <form className="bg-oxford-blue flex py-3 px-4 gap-4 justify-center rounded-full flex-wrap">
            {/* Origin input */}
            <div className="flex flex-col justify-center items-center gap-1">
              <label className="text-white font-medium text-xl font-Raleway">
                Origin
              </label>
              <input
                type="text"
                className="bg-white p-2 rounded-full text-md font-Rethink"
                placeholder="Airport Code eg.CGK, LHR, LAX"
                name="origin"
                onChange={handleChange}
              />
            </div>
            {/* Destination input */}
            <div className="flex flex-col justify-center items-center gap-1">
              <label className="text-white font-medium text-xl font-Raleway">
                Destination
              </label>
              <input
                type="text"
                className="bg-white p-2 rounded-full text-md font-Rethink"
                placeholder="Airport Code eg.CGK, LHR, LAX"
                name="destination"
                onChange={handleChange}
              />
            </div>
            {/* Departure Date input */}
            <div className="flex flex-col justify-center items-center">
              <label className="text-white font-medium text-xl font-Raleway">
                Departure Date
              </label>
              <input
                type="date"
                className="bg-white p-2 rounded-full text-md text-gray-400 font-Rethink"
                name="departureDate"
                min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                onChange={handleChange}
              />
            </div>
            {/* Advanced Filters button */}
            <button
              className="bg-alice-blue text-md h-10 px-2 mt-4 text-oxford-blue font-medium font-Raleway hover:bg-champion-blue hover:text-white"
              type="button"
              onClick={() => setModalShow(true)}
            >
              Advanced Filters
            </button>
            {/* Search button */}
            <button
              className="bg-alice-blue text-lg h-10 px-4 mt-4 text-oxford-blue font-Raleway font-medium disabled:bg-champion-blue disabled:cursor-not-allowed"
              disabled={flightDetails.origin === ""}
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

      {/* Container for flight results */}
      <div id="flights"></div>
      <div
        className={`${
          showFlights ? "block" : "hidden"
        } flex flex-col gap-4 py-4 dark:bg-black dark:bg-opacity-90`}
      >
        {/* Flight results header */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-oxford-blue dark:text-white">
          Flights From {flightDetails.origin} to {flightDetails.destination}
        </h1>
        {/* Conditional rendering based on flight data */}
        {flights ? (
          flights.length > 0 ? (
            <div>
              {/* Render a list of Flight components */}
              {flights.map((flight: flightType) => (
                <Flight
                  key={flight.url} // Add a unique key prop for each flight
                  flight={flight}
                  Button={<AddToTrip itineraries={[flight]} />}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-oxford-blue text-2xl md:text-3xl text-center my-24">
              No Flights Matched your search {":("}
            </h1>
          )
        ) : (
          <LocationsLoading />
        )}

        {/* Pagination controls */}
        <div className="flex justify-center px-12 py-8 mb-auto">
          <h1 className="text-xl dark:text-white">
            <FontAwesomeIcon
              icon={faCaretLeft}
              className="text-2xl dark:text-white"
              onClick={() =>
                setCurrentPageNumber((prevPage) =>
                  prevPage === 1 ? Math.ceil(totalFlights / 10) : prevPage - 1
                )
              }
            />{" "}
            Page: {totalFlights === 0 ? 0 : currentPageNumber} of{" "}
            {Math.ceil(totalFlights / 10)}{" "}
            <FontAwesomeIcon
              icon={faCaretRight}
              className="text-2xl dark:text-white"
              onClick={() =>
                setCurrentPageNumber((prevPage) =>
                  prevPage === Math.ceil(totalFlights / 10) ? 1 : prevPage + 1
                )
              }
            />
          </h1>
        </div>
      </div>
      {/* Details Modal component */}
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
