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
  const [locationType, setLocationType] = useState<string | null>("countries");
  const [searchParams] = useSearchParams();
  const [continent, setContinent] = useState<string>("all");
  const [countries, setCountries] = useState<countryType[] | null>(null);
  const [states, setStates] = useState<stateType[] | null>(null);
  const [cities, setCities] = useState<cityType[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [currentCountry, setCurrentCountry] = useState<countryType | null>(
    null
  );
  const [currentState, setCurrentState] = useState<stateType | null>(null);
  const [currentCity, setCurrentCity] = useState<cityType | null>(null);
  const [activityType, setActivityType] = useState<string>("");
  const [activities, setActivities] = useState<[] | null>(null);
  const [currentLocations, setCurrentLocations] = useState<string>("");
  const exploreNewLocation = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActivities(null);
    setActivityType("Hotels");
    const locations = currentLocations.split(",");
    navigate(
      `/explore?locationType=activities&country=${locations[2]}&state=${locations[1]}&city=${locations[0]}`
    );
  };
  const navigate = useNavigate();
  const debouncedHandleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setCurrentPageNumber(1);
      }, 300),
    []
  );
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedHandleSearch(e.target.value);
  };
  const handleActivityTypeChange = (newActivityType: string) => () => {
    setActivityType(newActivityType);
  };
  const updatePageNumber = (direction: string) => () => {
    if (direction == "next") {
      setCurrentPageNumber((prevPage) =>
        prevPage === Math.ceil(total / 10) ? 1 : prevPage + 1
      );
    } else {
      setCurrentPageNumber((prevPage) =>
        prevPage == 1 ? (prevPage = Math.ceil(total / 10)) : (prevPage -= 1)
      );
    }
  };
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { setCurrentPage } = pageContext;

  useEffect(() => {
    setCurrentPage(locationType == "activities" ? "Explore" : "Locations");
  }, []);
  const changeContinent = (e: ChangeEvent<HTMLSelectElement>) => {
    setContinent(e.target.value);
    setCurrentPageNumber(1);
  };

  useEffect(() => {
    if (searchParams.get("locationType") != null) {
      setLocationType(searchParams.get("locationType"));
    } else {
      setLocationType("countries");
    }
    setCurrentPageNumber(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      switch (locationType) {
        case "countries":
          setCountries(null);
          try {
            response = await getAllCountries(
              continent,
              currentPageNumber,
              search
            );
            setCountries(response.data);
            setTotal(response.total);
          } catch (e) {
            setCountries([]);
            setTotal(0);
            setCurrentPageNumber(0);
          }
          break;
        case "states":
          setStates(null);
          try {
            if (currentCountry == null) {
              const country = await getCountryByName(
                searchParams.get("country") || ""
              );
              setCurrentCountry(country);
            }
            response = await getAllStates(
              currentCountry?.name || searchParams.get("country") || "",
              currentPageNumber,
              search
            );
            setStates(response.data);
            setTotal(response.total);
          } catch (e) {
            setStates([]);
            setTotal(0);
            setCurrentPageNumber(0);
          }
          break;
        case "cities":
          setCities(null);
          try {
            if (currentCountry == null) {
              const country = await getCountryByName(
                searchParams.get("country") || ""
              );
              setCurrentCountry(country);
            }
            if (currentState == null) {
              const state = await getStateByName(
                searchParams.get("state") || "",
                currentCountry?.name || searchParams.get("") || ""
              );
              setCurrentState(state);
            }
          } catch (e) {
            setCurrentCountry(null);
            setCurrentState(null);
            setCurrentPageNumber(0);
          }
          try {
            response = await getAllCities(
              currentState?.name || searchParams.get("state") || "",
              currentCountry?.name || searchParams.get("country") || "",
              currentPageNumber,
              search
            );

            setCities(response.data);
            setTotal(response.total);
          } catch (e) {
            setCities([]);
            setTotal(0);
            setCurrentPageNumber(0);
          }
          break;
        case "activities":
          setActivities(null);
          try {
            if (currentCountry == null) {
              const country = await getCountryByName(
                searchParams.get("country") || ""
              );
              setCurrentCountry(country);
            }
            if (currentState == null) {
              const state = await getStateByName(
                searchParams.get("state") || "",
                currentCountry?.name || searchParams.get("country") || ""
              );
              setCurrentState(state);
            }
            if (currentCity == null) {
              const city = await getCityByName(
                searchParams.get("city") || "",
                currentCountry?.name || searchParams.get("country") || "",
                currentState?.name || searchParams.get("state") || ""
              );
              setCurrentCity(city);
            }
          } catch (e) {
            setCurrentCountry(null);
            setCurrentState(null);
            setCurrentCity(null);
            setCurrentPageNumber(0);
          }
          switch (activityType) {
            case "Hotels":
              try {
                response = await getAllHotels(
                  currentCity?.name || searchParams.get("city") || "",
                  currentCountry?.name || searchParams.get("country") || "",
                  currentPageNumber,
                  search
                );
                setActivities(response.data);
                setTotal(response.total);
              } catch (e) {
                setActivities([]);
                setTotal(0);
                setCurrentPageNumber(0);
              }

              break;
            case "Airports":
              try {
                response = await getAllAirports(
                  currentCity?.name ||
                    searchParams.get("city") ||
                    "Los Angeles",
                  currentState?.name ||
                    searchParams.get("state") ||
                    "California",
                  currentPageNumber,
                  search
                );

                setActivities(response.data);
                setTotal(response.total);
              } catch (e) {
                setActivities([]);
                setTotal(0);
                setCurrentPageNumber(0);
              }
              break;
            case "Restaurants":
              try {
                response = await getAllAttractions(
                  currentCity?.name || searchParams.get("city") || "",
                  currentState?.name || searchParams.get("state") || "",
                  "restaurants",
                  currentPageNumber,
                  search
                );
                setActivities(response.data);
                setTotal(response.total);
              } catch (e) {
                setActivities([]);
                setTotal(0);
                setCurrentPageNumber(0);
              }
              break;
            case "Things To Do":
              try {
                response = await getAllAttractions(
                  currentCity?.name || searchParams.get("city") || "",
                  currentState?.name || searchParams.get("state") || "",
                  "attractions",
                  currentPageNumber,
                  search
                );
                setActivities(response.data);
                setTotal(response.total);
              } catch (e) {
                setActivities([]);
                setTotal(0);
                setCurrentPageNumber(0);
              }
              break;
            case "Videos":
              try {
                response = await getAllVideos(
                  currentCity?.name ||
                    searchParams.get("city") ||
                    "Los Angeles",
                  currentPageNumber,
                  search
                );
                setActivities(response.data);
                setTotal(response.total);
              } catch (e) {
                setActivities([]);
                setTotal(0);
                setCurrentPageNumber(0);
              }
              break;
          }
          break;
      }
    };

    fetchData();
  }, [
    locationType,
    continent,
    currentPageNumber,
    search,
    searchParams,
    activityType,
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
