import {
  useState,
  useEffect,
  useContext,
  useMemo,
  ChangeEvent,
  FC,
} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import {
  faMagnifyingGlass,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllCountries,
  getAllStates,
  getAllCities,
  getAllHotels,
  getAllAirports,
  getAllAttractions,
  getAllVideos,
  getCountryByName,
  getStateByName,
  getCityByName,
} from "../../services/locations.service";
import { countryType, stateType, cityType } from "../../types/types";
import { PageContext } from "../../App";
import Country from "./Country";
import State from "./State";
import City from "./City";
import Hotel from "./Hotel";
import Airport from "./Airport";
import Attraction from "./Attraction";
import Video from "./Video";
import AddToTrip from "./AddToTrip";
import LocationsLoading from "./LocationsLoading";
import { container } from "../../data/animation";

const ExploreLocations: FC = () => {
  // State to manage the type of location being explored
  const [locationType, setLocationType] = useState<string | null>("countries");

  // State to manage search parameters from the URL
  const [searchParams] = useSearchParams();

  // State to manage continent filter
  const [continent, setContinent] = useState<string>("all");

  // State to manage the list of countries, states, and cities
  const [countries, setCountries] = useState<countryType[] | null>(null);
  const [states, setStates] = useState<stateType[] | null>(null);
  const [cities, setCities] = useState<cityType[] | null>(null);

  // State to manage the total number of items and pagination
  const [total, setTotal] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  // State for search input and currently selected location
  const [search, setSearch] = useState<string>("");
  const [currentCountry, setCurrentCountry] = useState<countryType | null>(
    null
  );
  const [currentState, setCurrentState] = useState<stateType | null>(null);
  const [currentCity, setCurrentCity] = useState<cityType | null>(null);

  // State to manage activity type and list of activities
  const [activityType, setActivityType] = useState<string>("");
  const [activities, setActivities] = useState<[] | null>(null);

  // State to manage current location input
  const [currentLocations, setCurrentLocations] = useState<string>("");

  // Navigate to a new location based on form submission
  const exploreNewLocation = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setActivities(null); // Clear activities when a new location is explored
    setActivityType("Hotels"); // Set the default activity type
    const locations = currentLocations.split(","); // Split locations input
    navigate(
      `/explore?locationType=activities&country=${locations[2]}&state=${locations[1]}&city=${locations[0]}`
    ); // Navigate to the new location with query parameters
  };

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Debounced search handler to reduce the number of search calls
  const debouncedHandleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value); // Update search state
        setCurrentPageNumber(1); // Reset page number to 1 on search
      }, 300), // 300ms debounce delay
    []
  );

  // Handle input changes for search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedHandleSearch(e.target.value); // Debounced search call
  };

  // Handle changes to the activity type
  const handleActivityTypeChange = (newActivityType: string) => () => {
    setActivityType(newActivityType); // Update activity type state
  };

  // Update the current page number for pagination
  const updatePageNumber = (direction: string) => () => {
    if (direction === "next") {
      // Navigate to the next page or loop back to the first page
      setCurrentPageNumber((prevPage) =>
        prevPage === Math.ceil(total / 10) ? 1 : prevPage + 1
      );
    } else {
      // Navigate to the previous page or loop back to the last page
      setCurrentPageNumber((prevPage) =>
        prevPage === 1 ? Math.ceil(total / 10) : prevPage - 1
      );
    }
  };

  // Access page context to update the current page
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { setCurrentPage } = pageContext;

  // Handle changes to the continent filter
  const changeContinent = (e: ChangeEvent<HTMLSelectElement>) => {
    setContinent(e.target.value); // Update continent state
    setCurrentPageNumber(1); // Reset page number to 1 when continent changes
  };

  // Effect to set the locationType state based on URL parameters
  useEffect(() => {
    const locationTypeParam = searchParams.get("locationType");
    setLocationType(locationTypeParam ?? "countries"); // Default to "countries" if parameter is null
    setCurrentPageNumber(1); // Reset page number to 1 when locationType changes
  }, [searchParams]);

  // Effect to set the current page in the PageContext based on locationType
  useEffect(() => {
    setCurrentPage(
      searchParams.get("locationType") === "activities"
        ? "Explore"
        : "Locations"
    );
  }, [searchParams, setCurrentPage]);

  useEffect(() => {
    // Define an asynchronous function to fetch data based on locationType
    const fetchData = async () => {
      let response;

      // Determine the type of data to fetch based on locationType
      switch (locationType) {
        case "countries":
          // Reset the countries state before fetching new data
          setCountries(null);

          // Fetch countries data based on continent, current page, and search term
          response = await getAllCountries(
            continent,
            currentPageNumber,
            search
          );

          // Update the states with the fetched data
          setCountries(response.data);
          setTotal(response.total); // Update the total number of countries
          break;

        case "states":
          // Reset the states state before fetching new data
          setStates(null);

          // If no current country is set, fetch the country based on the URL parameter
          if (currentCountry == null) {
            const country = await getCountryByName(
              searchParams.get("country") || ""
            );
            setCurrentCountry(country);
          }

          // Fetch states data based on the current or fetched country, page number, and search term
          response = await getAllStates(
            currentCountry?.name || searchParams.get("country") || "",
            currentPageNumber,
            search
          );

          // Update the states with the fetched data
          setStates(response.data);
          setTotal(response.total); // Update the total number of states
          break;

        case "cities":
          // Reset the cities state before fetching new data
          setCities(null);

          // If no current country is set, fetch the country based on the URL parameter
          if (currentCountry == null) {
            const country = await getCountryByName(
              searchParams.get("country") || ""
            );
            setCurrentCountry(country);
          }

          // If no current state is set, fetch the state based on the URL parameter and current country
          if (currentState == null) {
            const state = await getStateByName(
              searchParams.get("state") || "",
              currentCountry?.name || searchParams.get("country") || ""
            );
            setCurrentState(state);
          }

          // Fetch cities data based on the current or fetched state and country, page number, and search term
          response = await getAllCities(
            currentState?.name || searchParams.get("state") || "",
            currentCountry?.name || searchParams.get("country") || "",
            currentPageNumber,
            search
          );

          // Update the states with the fetched data
          setCities(response.data);
          setTotal(response.total); // Update the total number of cities
          break;

        case "activities":
          // Reset the activities state before fetching new data
          setActivities(null);

          // If no current country is set, fetch the country based on the URL parameter
          if (currentCountry == null) {
            const country = await getCountryByName(
              searchParams.get("country") || ""
            );
            setCurrentCountry(country);
          }

          // If no current state is set, fetch the state based on the URL parameter and current country
          if (currentState == null) {
            const state = await getStateByName(
              searchParams.get("state") || "",
              currentCountry?.name || searchParams.get("country") || ""
            );
            setCurrentState(state);
          }

          // If no current city is set, fetch the city based on the URL parameter, current state, and country
          if (currentCity == null) {
            const city = await getCityByName(
              searchParams.get("city") || "",
              currentCountry?.name || searchParams.get("country") || "",
              currentState?.name || searchParams.get("state") || ""
            );
            setCurrentCity(city);
          }

          // Fetch activities data based on activityType and current or fetched location data
          switch (activityType) {
            case "Hotels":
              response = await getAllHotels(
                currentCity?.name || searchParams.get("city") || "",
                currentCountry?.name || searchParams.get("country") || "",
                currentPageNumber,
                search
              );
              break;

            case "Airports":
              response = await getAllAirports(
                currentCity?.name || searchParams.get("city") || "Los Angeles",
                currentState?.name || searchParams.get("state") || "California",
                currentPageNumber,
                search
              );
              break;

            case "Restaurants":
              response = await getAllAttractions(
                currentCity?.name || searchParams.get("city") || "",
                currentState?.name || searchParams.get("state") || "",
                "restaurants",
                currentPageNumber,
                search
              );
              break;

            case "Things To Do":
              response = await getAllAttractions(
                currentCity?.name || searchParams.get("city") || "",
                currentState?.name || searchParams.get("state") || "",
                "attractions",
                currentPageNumber,
                search
              );
              break;

            case "Videos":
              response = await getAllVideos(
                currentCity?.name || searchParams.get("city") || "Los Angeles",
                currentPageNumber,
                search
              );
              break;
          }

          // Update the activities state with the fetched data
          setActivities(response.data);
          setTotal(response.total); // Update the total number of activities
          break;
      }
    };

    // Call the fetchData function to initiate data fetching
    fetchData();
  }, [
    locationType, // Dependency: Trigger effect when locationType changes
    continent, // Dependency: Trigger effect when continent changes
    currentPageNumber, // Dependency: Trigger effect when currentPageNumber changes
    search, // Dependency: Trigger effect when search term changes
    searchParams, // Dependency: Trigger effect when search parameters change
    activityType, // Dependency: Trigger effect when activityType changes
  ]);

  const renderLocations = () => {
    switch (locationType) {
      case "countries":
        return (
          <div>
            <header className="flex items-center align-center py-8 px-12 flex-wrap justify-center gap-4">
              <h1 className="text-oxford-blue text-3xl md:text-4xl font-bold font-Oswald">
                SELECT COUNTRY FROM
              </h1>
              <select
                className="text-oxford-blue text-3xl md:text-4xl font-bold border-2 font-Oswald"
                onChange={changeContinent}
                defaultValue={continent}
              >
                <option value="all">All</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Oceana">Oceana</option>
              </select>
              <div className="md:ml-auto flex">
                <input
                  onChange={handleSearch}
                  placeholder={`Search Country...`}
                  className="border-2 text-2xl px-1 rounded-md font-Oswald"
                ></input>
                <button className="bg-oxford-blue text-baby-powder text-2xl py-2 px-3 rounded-md">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </header>
            <section>
              {countries ? (
                countries.length > 0 ? (
                  <motion.div
                    className="flex flex-col items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.4 }}
                    variants={container}
                  >
                    {countries.map((country: countryType) => {
                      return (
                        <motion.div
                          layout
                          className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20  w-full"
                          key={country.iso2}
                        >
                          <Country
                            country={country}
                            setCurrentCountry={setCurrentCountry}
                            setSearch={setSearch}
                          />
                          <AddToTrip itineraries={[country]} />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <h1 className="text-oxford-blue text-2xl md:text-3xl text-center my-24 font-Oswald">
                    No Countries Matched Your Search {":("}
                  </h1>
                )
              ) : (
                <LocationsLoading />
              )}
            </section>
            <div className="flex justify-end px-12 py-8 mb-auto">
              <h1 className="text-xl font-Oswald">
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  className="text-2xl hover:cursor-pointer"
                  onClick={updatePageNumber("back")}
                />{" "}
                Page: {total == 0 ? 0 : currentPageNumber} of{" "}
                {Math.ceil(total / 10)}{" "}
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className="text-2xl hover:cursor-pointer hover:cursor-pointer"
                  onClick={updatePageNumber("next")}
                />
              </h1>
            </div>
          </div>
        );
      case "states":
        return (
          <div>
            <p
              className="pt-4 pb-2 px-12 hover:cursor-pointer font-Rethink"
              onClick={() => {
                navigate(`/explore`);
              }}
            >
              <FontAwesomeIcon icon={faCaretLeft} /> Back to Countries
            </p>
            <header className="flex items-center align-center pb-8 px-12 flex-wrap justify-center gap-4">
              <h1 className="text-oxford-blue text-3xl md:text-4xl font-bold font-Oswald">
                SELECT STATE
              </h1>
              <div className="md:ml-auto flex">
                <input
                  onChange={handleSearch}
                  placeholder={`Search State...`}
                  className="border-2 text-2xl px-1 rounded-md font-Oswald"
                ></input>
                <button className="bg-oxford-blue text-baby-powder text-2xl py-2 px-3 rounded-md">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </header>
            <section>
              {states ? (
                states.length > 0 ? (
                  <div>
                    {states.map((state: stateType) => {
                      return (
                        <motion.div
                          layout
                          className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20  w-full"
                          key={state.code}
                        >
                          <State
                            state={state}
                            setCurrentState={setCurrentState}
                            setSearch={setSearch}
                          />
                          <AddToTrip itineraries={[currentCountry, state]} />
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <h1 className="text-oxford-blue text-2xl md:text-3xl text-center my-24 font-Oswald">
                    No States Matched your search {":("}
                  </h1>
                )
              ) : (
                <LocationsLoading />
              )}
            </section>
            <div className="flex justify-end px-12 py-8 mb-auto">
              <h1 className="text-xl font-Oswald">
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  className="text-2xl hover:cursor-pointer"
                  onClick={updatePageNumber("back")}
                />{" "}
                Page: {total == 0 ? 0 : currentPageNumber} of{" "}
                {Math.ceil(total / 10)}{" "}
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className="text-2xl hover:cursor-pointer hover:cursor-pointer"
                  onClick={updatePageNumber("next")}
                />
              </h1>
            </div>
          </div>
        );
      case "cities":
        return (
          <div>
            <p
              className="pt-4 pb-2 px-12 hover:cursor-pointer font-Oswald"
              onClick={() => {
                navigate(
                  `/explore?locationType=states&country=${searchParams.get(
                    "country"
                  )}`
                );
              }}
            >
              <FontAwesomeIcon icon={faCaretLeft} /> Back to States
            </p>
            <header className="flex items-center align-center pb-8 px-12 flex-wrap justify-center gap-4">
              <h1 className="text-oxford-blue text-3xl md:text-4xl font-bold font-Oswald">
                SELECT CITY
              </h1>
              <div className="md:ml-auto flex">
                <input
                  onChange={handleSearch}
                  placeholder={`Search City...`}
                  className="border-2 text-2xl px-1 rounded-md font-Oswald"
                ></input>
                <button className="bg-oxford-blue text-baby-powder text-2xl py-2 px-3 rounded-md">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </header>
            <section>
              {cities ? (
                cities.length > 0 ? (
                  <div>
                    {cities.map((city: cityType) => {
                      return (
                        <motion.div
                          layout
                          className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-16  w-full"
                          key={city.name}
                        >
                          <City city={city} setCurrentCity={setCurrentCity} />
                          <AddToTrip
                            itineraries={[currentCountry, currentState, city]}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <h1 className="text-oxford-blue text-2xl md:text-3xl text-center my-24 font-Oswald">
                    No Cities Matched your search {":("}
                  </h1>
                )
              ) : (
                <LocationsLoading />
              )}
            </section>
            <div className="flex justify-end px-12 py-8 mb-auto">
              <h1 className="text-xl font-Oswald">
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  className="text-2xl hover:cursor-pointer"
                  onClick={updatePageNumber("back")}
                />{" "}
                Page: {total == 0 ? 0 : currentPageNumber} of{" "}
                {Math.ceil(total / 10)}{" "}
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className="text-2xl hover:cursor-pointer hover:cursor-pointer"
                  onClick={updatePageNumber("next")}
                />
              </h1>
            </div>
          </div>
        );
      case "activities":
        return (
          <div className="flex flex-col items-center p-16 gap-8">
            <h1 className="text-6xl font-medium text-oxford-blue text-center font-FatFace">
              Explore {currentCity?.name || searchParams.get("city") || "..."}
            </h1>
            <form className="flex items-center" onSubmit={exploreNewLocation}>
              <input
                type="text"
                placeholder="Search City,State,Country"
                className="border-2 border-oxford-blue pr-10 py-1 pl-1 text-left font-Rethink"
                name="locations"
                onChange={(e) => setCurrentLocations(e.target.value)}
              ></input>
              <button
                className="bg-oxford-blue text-baby-powder text-xl px-2 py-1"
                type="submit"
              >
                Search
              </button>
            </form>
            <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between w-full text-4xl font-medium text-teal px-8 flex-wrap ">
              <p
                className={`${
                  activityType == "Hotels"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={handleActivityTypeChange("Hotels")}
              >
                Hotels
              </p>
              <p
                className={`${
                  activityType == "Airports"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={handleActivityTypeChange("Airports")}
              >
                Airports
              </p>
              <p
                className={`${
                  activityType == "Restaurants"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={handleActivityTypeChange("Restaurants")}
              >
                Restaurants
              </p>
              <p
                className={`${
                  activityType == "Things To Do"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={handleActivityTypeChange("Things To Do")}
              >
                Things To Do
              </p>
              <p
                className={`${
                  activityType == "Videos"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={handleActivityTypeChange("Videos")}
              >
                Videos
              </p>
            </div>
            {activityType != "" ? (
              <section className="w-full">
                <div className="flex md:justify-end mb-4">
                  <input
                    onChange={handleSearch}
                    placeholder={`Search ${activityType}...`}
                    className="border-2 text-2xl px-1 rounded-md font-Oswald"
                  ></input>
                  <button className="bg-oxford-blue text-baby-powder text-2xl py-2 px-3 rounded-md">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>

                {activities ? (
                  activities.length > 0 ? (
                    <div>
                      {activities.map((activity: any) => {
                        return (
                          <motion.div
                            layout
                            className="bg-teal flex flex-col md:flex-row justify-center mb-4 items-center gap-8 sm:gap-12 md:gap-20  w-full"
                            key={activity.id}
                          >
                            {activityType == "Hotels" && (
                              <Hotel hotel={activity} />
                            )}
                            {activityType == "Airports" && (
                              <Airport airport={activity} />
                            )}
                            {activityType == "Restaurants" && (
                              <Attraction attraction={activity} />
                            )}
                            {activityType == "Things To Do" && (
                              <Attraction attraction={activity} />
                            )}
                            {activityType == "Videos" && (
                              <Video video={activity} />
                            )}
                            {activityType != "Airports" && (
                              <AddToTrip
                                itineraries={[
                                  currentCountry,
                                  currentState,
                                  currentCity,
                                  activity,
                                ]}
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <h1 className="text-oxford-blue text-2xl md:text-3xl text-center my-24">
                      No {activityType} Matched your search {":("}
                    </h1>
                  )
                ) : (
                  <LocationsLoading />
                )}

                <div className="flex justify-end px-12 py-8 mb-auto">
                  <h1 className="text-xl font-Oswald">
                    <FontAwesomeIcon
                      icon={faCaretLeft}
                      className="text-2xl hover:cursor-pointer"
                      onClick={updatePageNumber("back")}
                    />{" "}
                    Page: {total == 0 ? 0 : currentPageNumber} of{" "}
                    {Math.ceil(total / 10)}{" "}
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-2xl hover:cursor-pointer hover:cursor-pointer"
                      onClick={updatePageNumber("next")}
                    />
                  </h1>
                </div>
              </section>
            ) : (
              <div className="flex items-center justify-center mt-12">
                <h1 className="mb-auto text-4xl font-Oswald">
                  Find a City And Explore What it Has to Offer!
                </h1>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="min-h-screen flex flex-col justify-center items-center text-white">
            <div className="text-center">
              <h1 className="text-9xl font-bold mb-4 text-oxford-blue">404</h1>
              <h2 className="text-6xl font-bold mb-8 text-oxford-blue">
                Page Not Found
              </h2>
              <p className="text-2xl mb-8 text-teal">
                Oops! The page you're looking for doesn't exist.
              </p>
              <Link
                to="/"
                className="bg-white text-teal py-2 px-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Return Home
              </Link>
            </div>
          </div>
        );
    }
  };

  return <div className="mb-auto">{renderLocations()}</div>;
};

export default ExploreLocations;
