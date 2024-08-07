import { useState, useEffect, useContext, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Placeholder from "react-bootstrap/Placeholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
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
} from "../services/apiService";
import { countryType, stateType, cityType } from "../types/types";
import { UserContext } from "../App";
import loading from "../assets/loading.png";
import Country from "./ExploreLocationsComponents/Country";
import State from "./ExploreLocationsComponents/State";
import City from "./ExploreLocationsComponents/City";
import Hotel from "./ExploreLocationsComponents/Hotel";
import Airport from "./ExploreLocationsComponents/Airport";
import Attraction from "./ExploreLocationsComponents/Attraction";
import Video from "./ExploreLocationsComponents/Video";
import AddToTrip from "./AddToTrip";
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const ExploreLocations = () => {
  const [locationType, setLocationType] = useState<string | null>("countries");
  const [searchParams] = useSearchParams();
  const [continent, setContinent] = useState<string>("all");
  const [countries, setCountries] = useState<countryType[] | null>(null);
  const [states, setStates] = useState<stateType[] | null>(null);
  const [cities, setCities] = useState<cityType[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [currentCountry, setCurrentCountry] = useState<countryType | null>(
    null
  );
  const [currentState, setCurrentState] = useState<stateType | null>(null);
  const [currentCity, setCurrentCity] = useState<cityType | null>(null);
  const [activityType, setActivityType] = useState<string>("");
  const [activities, setActivities] = useState<[] | null>(null);
  const [currentLocations, setCurrentLocations] = useState<string>("");
  const exploreNewLocation = (e: any) => {
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
        setCurrentPage(1);
      }, 300),
    []
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleSearch(e.target.value);
  };

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const changeContinent = (e: any) => {
    setContinent(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (searchParams.get("locationType") != null) {
      setLocationType(searchParams.get("locationType"));
    } else {
      setLocationType("countries");
    }
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (locationType) {
          case "countries":
            setCountries(null);
            try {
              response = await getAllCountries(continent, currentPage, search);
              setCountries(response.data);
              setTotal(response.total);
            } catch (e) {
              setCountries([]);
              setTotal(0);
              setCurrentPage(0);
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
                currentPage,
                search
              );
              setStates(response.data);
              setTotal(response.total);
            } catch (e) {
              setStates([]);
              setTotal(0);
              setCurrentPage(0);
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
                  currentCountry?.name ||
                    searchParams.get("") ||
                    "United States"
                );
                setCurrentState(state);
              }
            } catch (e) {
              setCurrentCountry(null);
              setCurrentState(null);
            }
            try {
              response = await getAllCities(
                currentState?.name || searchParams.get("state") || "California",
                currentCountry?.name ||
                  searchParams.get("country") ||
                  "United States",
                currentPage,
                search
              );

              setCities(response.data);
              setTotal(response.total);
            } catch (e) {
              setCities([]);
              setTotal(0);
              setCurrentPage(0);
            }
            break;
          case "activities":
            setActivities(null);
            try {
              if (currentCountry == null) {
                const country = await getCountryByName(
                  searchParams.get("country") || ""
                );
                console.log(country);
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
                console.log(city);
                setCurrentCity(city);
              }
            } catch (e) {
              setCurrentCountry(null);
              setCurrentState(null);
              setCurrentCity(null);
            }
            switch (activityType) {
              case "Hotels":
                try {
                  response = await getAllHotels(
                    currentCity?.name || searchParams.get("city") || "",
                    currentCountry?.name || searchParams.get("country") || "",
                    currentPage,
                    search
                  );
                  setActivities(response.data);
                  setTotal(response.total);
                } catch (e) {
                  setActivities([]);
                  setTotal(0);
                  setCurrentPage(0);
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
                    currentPage,
                    search
                  );

                  setActivities(response.data);
                  setTotal(response.total);
                } catch (e) {
                  setActivities([]);
                  setTotal(0);
                  setCurrentPage(0);
                }
                break;
              case "Restaurants":
                try {
                  response = await getAllAttractions(
                    currentCity?.name || searchParams.get("city") || "",
                    currentState?.name || searchParams.get("state") || "",
                    "restaurants",
                    currentPage,
                    search
                  );
                  setActivities(response.data);
                  setTotal(response.total);
                } catch (e) {
                  setActivities([]);
                  setTotal(0);
                  setCurrentPage(0);
                }
                break;
              case "Things To Do":
                try {
                  response = await getAllAttractions(
                    currentCity?.name || searchParams.get("city") || "",
                    currentState?.name || searchParams.get("state") || "",
                    "attractions",
                    currentPage,
                    search
                  );
                  setActivities(response.data);
                  setTotal(response.total);
                } catch (e) {
                  setActivities([]);
                  setTotal(0);
                  setCurrentPage(0);
                }
                break;
              case "Videos":
                try {
                  response = await getAllVideos(
                    currentCity?.name ||
                      searchParams.get("city") ||
                      "Los Angeles",
                    currentPage,
                    search
                  );
                  setActivities(response.data);
                  setTotal(response.total);
                } catch (e) {
                  setActivities([]);
                  setTotal(0);
                  setCurrentPage(0);
                }
                break;
            }

            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state
      }
    };

    fetchData();
  }, [
    locationType,
    continent,
    currentPage,
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
            </section>
            <div className="flex justify-end px-12 py-8 mb-auto">
              <h1 className="text-xl font-Oswald">
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  className="text-2xl hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage == 1
                        ? (prevPage = Math.ceil(total / 10))
                        : (prevPage -= 1)
                    )
                  }
                />{" "}
                Page: {total == 0 ? 0 : currentPage} of {Math.ceil(total / 10)}{" "}
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className="text-2xl hover:cursor-pointer hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage == Math.ceil(total / 10)
                        ? (prevPage = 1)
                        : (prevPage += 1)
                    )
                  }
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
            </section>
            <div className="flex justify-end px-12 py-8 mb-auto">
              <h1 className="text-xl font-Oswald ">
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  className="text-2xl hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage == 1
                        ? (prevPage = Math.ceil(total / 10))
                        : (prevPage -= 1)
                    )
                  }
                />{" "}
                Page: {total == 0 ? 0 : currentPage} of {Math.ceil(total / 10)}{" "}
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className="text-2xl hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage == Math.ceil(total / 10)
                        ? (prevPage = 1)
                        : (prevPage += 1)
                    )
                  }
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
            </section>
            <div className="flex justify-end px-12 py-8 mb-auto">
              <h1 className="text-xl font-Oswald">
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  className="text-2xl hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage == 1
                        ? (prevPage = Math.ceil(total / 10))
                        : (prevPage -= 1)
                    )
                  }
                />{" "}
                Page: {total == 0 ? 0 : currentPage} of {Math.ceil(total / 10)}{" "}
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className="text-2xl hover:cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage == Math.ceil(total / 10)
                        ? (prevPage = 1)
                        : (prevPage += 1)
                    )
                  }
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
                onClick={() => setActivityType("Hotels")}
              >
                Hotels
              </p>
              <p
                className={`${
                  activityType == "Airports"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={() => setActivityType("Airports")}
              >
                Airports
              </p>
              <p
                className={`${
                  activityType == "Restaurants"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={() => setActivityType("Restaurants")}
              >
                Restaurants
              </p>
              <p
                className={`${
                  activityType == "Things To Do"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={() => setActivityType("Things To Do")}
              >
                Things To Do
              </p>
              <p
                className={`${
                  activityType == "Videos"
                    ? "text-oxford-blue underline font-bold"
                    : "hover:cursor-pointer"
                } font-Oswald`}
                onClick={() => setActivityType("Videos")}
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
                  <h1 className="text-xl font-Oswald">
                    <FontAwesomeIcon
                      icon={faCaretLeft}
                      className="text-2xl hover:cursor-pointer"
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          prevPage == 1
                            ? (prevPage = Math.ceil(total / 10))
                            : (prevPage -= 1)
                        )
                      }
                    />{" "}
                    Page: {total == 0 ? 0 : currentPage} of{" "}
                    {Math.ceil(total / 10)}{" "}
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-2xl hover:cursor-pointer"
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          prevPage == Math.ceil(total / 10)
                            ? (prevPage = 1)
                            : (prevPage += 1)
                        )
                      }
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
        return <h1>country</h1>;
    }
  };

  return (
    <>
      <div className="mb-auto">{renderLocations()}</div>
    </>
  );
};

export default ExploreLocations;
