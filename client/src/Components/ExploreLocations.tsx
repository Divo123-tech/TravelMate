import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Placeholder from "react-bootstrap/Placeholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { getAllCountries, getAllStates } from "../services/apiService";
import { countryType, stateType } from "../types/types";
import { UserContext } from "../App";
import loading from "../assets/loading.png";
import Country from "./ExploreLocationsComponents/Country";
import State from "./ExploreLocationsComponents/State";
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const ExploreLocations = () => {
  const [locationType, setLocationType] = useState<string | null>("country");
  const [searchParams] = useSearchParams();
  const [continent, setContinent] = useState<string>("all");
  const [countries, setCountries] = useState<countryType[] | null>(null);
  const [states, setStates] = useState<stateType[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [currentCountry, setCurrentCountry] = useState<countryType | null>(
    null
  );
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    if (e.target.value == "") {
      setSearch("");
    } else {
      setSearch(e.target.value);
    }
    setCurrentPage(1); // Reset to first page on each search
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
    if (searchParams.get("location") != null) {
      setLocationType(searchParams.get("location"));
    } else {
      setLocationType("country");
    }
  }, [searchParams]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setCountries(null);
        const response = await getAllCountries(continent, currentPage, search);
        const fetchedCountries: countryType[] = response.data;
        const totalCountries: number = response.total;
        setTotal(totalCountries);
        setCountries(fetchedCountries);
      } catch (err: any) {
        console.log(err);
      }
    };
    const getStates = async () => {
      try {
        setStates(null);
        let currentCountry;
        if (currentCountry == null) {
          const { data } = await getAllCountries(
            "all",
            1,
            searchParams.get("country") || "United States"
          );
          currentCountry = data[0];
          setCurrentCountry(currentCountry);
        }
        const response = await getAllStates(
          currentCountry.name,
          currentPage,
          search
        );

        const fetchedStates: stateType[] = response.data;
        const totalStates: number = response.total;
        setTotal(totalStates);
        setStates(fetchedStates);
      } catch (err) {
        console.log(err);
      }
    };
    switch (locationType) {
      case "country":
        getCountries();
        return;
      case "state":
        getStates();
        return;
    }
  }, [continent, currentPage, search, locationType]);

  const renderLocations = () => {
    switch (locationType) {
      case "country":
        return (
          <div>
            <header className="flex items-center align-center py-8 px-12 flex-wrap justify-center gap-4">
              <h1 className="text-oxford-blue text-3xl md:text-4xl font-bold">
                SELECT COUNTRY FROM
              </h1>
              <select
                className="text-oxford-blue text-3xl md:text-4xl font-bold border-2 "
                onChange={changeContinent}
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
                  className="border-2 text-2xl px-1 rounded-md"
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
                          />
                          <div className="md:ml-auto pr-16 flex flex-col items-center justify-center">
                            <motion.button
                              className="bg-oxford-blue text-baby-powder px-6 ml-8 py-3 rounded-full text-lg whitespace-nowrap"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => console.log([country])}
                            >
                              Add to Trip
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <h1 className="text-oxford-blue text-2xl md:text-3xl text-center my-24">
                    No Countries Matched your search {":("}
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
          </div>
        );
      case "state":
        return (
          <div>
            <p
              className="pt-4 pb-2 px-12 hover:cursor-pointer"
              onClick={() => navigate("/explore")}
            >
              <FontAwesomeIcon icon={faCaretLeft} /> Back to Countries
            </p>
            <header className="flex items-center align-center pb-8 px-12 flex-wrap justify-center gap-4">
              <h1 className="text-oxford-blue text-3xl md:text-4xl font-bold">
                SELECT STATE
              </h1>
              <div className="md:ml-auto flex">
                <input
                  onChange={handleSearch}
                  placeholder={`Search State...`}
                  className="border-2 text-2xl px-1 rounded-md"
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
                          <State state={state} />
                          <div className="md:ml-auto pr-16 flex flex-col items-center justify-center">
                            <motion.button
                              className="bg-oxford-blue text-baby-powder px-6 ml-8 py-3 rounded-full text-lg whitespace-nowrap"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                console.log([currentCountry, state])
                              }
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
          </div>
        );
      default:
        return <h1>country</h1>;
    }
  };

  return (
    <>
      <div>{renderLocations()}</div>
      <div className="flex justify-end px-12 py-8 mb-auto">
        <h1 className="text-xl">
          <FontAwesomeIcon
            icon={faCaretLeft}
            className="text-2xl"
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
            className="text-2xl"
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
    </>
  );
};

export default ExploreLocations;
