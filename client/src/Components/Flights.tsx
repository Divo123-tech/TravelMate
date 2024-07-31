import FlightsWP from "../assets/FlightsWP.jpg";
import { useState, FC } from "react";
import { getAllFlights } from "../services/apiService";
import { flightType } from "../types/types";
const Flights: FC = () => {
  const [flightDetails, setFlightDetails] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    adults: 1,
    nonstop: false,
    children: 0,
    cabin: "ECONOMY",
  });
  const [flights, setFlights] = useState<flightType[] | null>(null);
  const [showFlights, setShowFlights] = useState(false);
  const [totalFlights, setTotalFlights] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      origin,
      destination,
      departureDate,
      adults,
      nonstop,
      children,
      cabin,
    } = flightDetails;
    try {
      const fetchedFlights = await getAllFlights(
        origin,
        destination,
        departureDate,
        adults,
        nonstop,
        children,
        cabin
      );
      setFlights(fetchedFlights.data);
      setTotalFlights(fetchedFlights.total);
      console.log(fetchedFlights);
    } catch (err) {
      setFlights([]);
      setTotalFlights(0);
      setCurrentPage(0);
    }
  };
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
        className="relative h-screen bg-cover bg-center h-[400px] mb-auto"
        style={{ backgroundImage: `url(${FlightsWP})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white mb-8">
            Millions of cheap flights. One simple search.
          </h1>
          <form
            className="bg-teal flex py-3 px-4 gap-4 justify-center rounded-full flex-wrap"
            onSubmit={handleSubmit}
          >
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
              onClick={() => console.log(flightDetails)}
            >
              Advanced Filters
            </button>
            <button
              className="bg-oxford-blue text-lg px-4 py-2 rounded-full text-baby-powder font-medium disabled:opacity-80 disabled:cursor-not-allowed"
              disabled={flightDetails.origin == ""}
            >
              Search!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Flights;
