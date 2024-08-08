import { FC, useEffect, useState, ChangeEvent } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  editUserDetails,
  getCurrentUser,
  deleteTrip,
} from "../../services/users.service";
import { getAllCountries } from "../../services/locations.service";
import { motion } from "framer-motion";
import Trip from "./Trip";
import CreateNewTrip from "./CreateNewTrip";
import EditSuccessToast from "./EditSuccessToast";
import { useContext } from "react";
import { UserContext, PageContext } from "../../App";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "../DeleteButton";
import { countryType } from "../../types/types";
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};
const childVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const UserProfile: FC = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);
  if (!userContext || !pageContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { user, setUser } = userContext;
  const { setCurrentPage } = pageContext;
  const [countries, setCountries] = useState([]);
  const [editSuccess, setEditSuccess] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      setUser(await getCurrentUser()); // Set user state with the fetched data
    };

    getUser(); // Call getUser when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount
  useEffect(() => {
    setCurrentPage("Profile");
  }, []);
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await getAllCountries(
          "all",
          undefined,
          undefined,
          1000
        );
        const countriesData = response.data;
        setCountries(countriesData);
      } catch (err) {
        setCountries([]);
      }
    };

    getCountries();
  }, []);
  const handleDelete = async (tripId: string) => {
    try {
      await deleteTrip(user?.googleId || "", tripId);
      setUser(await getCurrentUser());
    } catch (err) {
      return;
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name == "passport") {
      let code = e.target.value.split(",")[0];
      let name = e.target.value.split(",")[1];
      if (user) {
        setUser({
          ...user,
          ["passport"]: {
            code,
            name,
          },
        });
      }
    } else {
      if (user) {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      }
    }
  };
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editUser = async () => {
      try {
        if (!user) {
          throw new Error("user not found");
        }
        const userData = await editUserDetails(
          user.googleId,
          user.name,
          user.passport,
          user.currencyUsed
        );
        setUser({
          ...user,
          ["name"]: userData.name,
          ["passport"]: userData.passport,
          ["currencyUsed"]: userData.currencyUsed,
        });
        setEditSuccess(true);
      } catch (err) {
        return;
      }
    };

    editUser();
  };

  // Create a Set to store unique currencies and then sort them alphabetically
  const uniqueCurrencies = Array.from(
    new Set(countries.map((country: countryType) => country.currency))
  ).sort((a, b) => a.localeCompare(b));
  return (
    <>
      {user ? (
        <section>
          <div className="pt-16 pb-2 px-32 flex items-center justify-center gap-3 md:justify-around flex-wrap">
            <div className="flex items-center flex-col gap-2">
              <img src={user.picture} className="rounded-full" />
              <p className="text-xl font-Oswald">User ID</p>
              <p className="text-lg italic font-Rethink">{user.googleId}</p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <Container className="flex flex-wrap md:grid font-Rethink">
                  <Row className="mb-2">
                    <Col>
                      <div className="flex flex-col">
                        <label className="text-lg">Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          name="name"
                          className="border-oxford-blue border-2 rounded-lg w-80 h-8"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex flex-col">
                        <label className="text-lg">Currency</label>
                        <select
                          defaultValue={user.currencyUsed}
                          className="border-oxford-blue border-2 rounded-lg w-80 h-8"
                          onChange={handleChange}
                          name="currencyUsed"
                        >
                          {user.currencyUsed ? (
                            <option
                              key={user.currencyUsed}
                              value={user.currencyUsed}
                            >
                              {user.currencyUsed}
                            </option>
                          ) : (
                            <option></option>
                          )}
                          {Array.from(uniqueCurrencies).map((currency) => (
                            <option key={currency} value={currency}>
                              {currency}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="flex flex-col">
                        <label className="text-lg">Passport</label>
                        <select
                          className="border-oxford-blue border-2 rounded-lg w-80 h-8"
                          name="passport"
                          onChange={handleChange}
                        >
                          {user.passport ? (
                            <option
                              key={user.passport.code}
                              value={user.passport.code}
                            >
                              {user.passport.name}
                            </option>
                          ) : (
                            <option></option>
                          )}
                          {countries.map((country: any) => (
                            <option
                              key={country.iso2}
                              value={country.iso2 + "," + country.name}
                            >
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex flex-col items-center justify-center">
                        <motion.button
                          type="submit"
                          className="bg-teal hover:bg-oxford-blue text-white rounded-lg px-2 py-2 mt-3 w-80 text-lg disabled:opacity-80"
                          disabled={
                            user.name == "" ||
                            user.passport.code == "" ||
                            user.currencyUsed == ""
                          }
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Save Changes
                        </motion.button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </form>
              <p className="mt-4 text-center italic">
                Fill in these fields to get personalized visa and exchange
                information when exploring!
              </p>
            </div>
          </div>
          <EditSuccessToast
            editSuccess={editSuccess}
            setEditSuccess={setEditSuccess}
          />

          <section className="py-16">
            <motion.div
              className="bg-baby-powder w-48 text-center my-10 p-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -75 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="text-2xl font-medium font-Oswald">MY TRIPS</p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1 }}
              variants={container}
            >
              {user.trips.map((trip: any, index: number) => {
                return (
                  <motion.div
                    className="bg-oxford-blue flex gap-4 md:gap-12 pr-4 md:pr-24 items-center"
                    variants={childVariant}
                  >
                    <Trip
                      role={trip.owner == user._id ? "Owner" : "Collaborator"}
                      id={trip._id}
                      name={trip.name}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                      key={index}
                      userId={user.googleId}
                    />
                    <div className="flex flex-col gap-3 ml-auto items-center justify-center font-Rethink">
                      <motion.button
                        className="text-baby-powder md:text-oxford-blue md:bg-baby-powder rounded-full md:px-12 md:py-2 md:rounded-full text-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/trip/${trip._id}`)}
                      >
                        <FontAwesomeIcon icon={faFilePen} />
                        <span className="hidden md:inline"> Edit</span>
                      </motion.button>
                      <DeleteButton
                        deleteFunction={() => handleDelete(trip._id)}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
          <CreateNewTrip />
        </section>
      ) : (
        <div className="flex flex-col gap-8 justify-center items-center my-auto text-2xl">
          <Spinner
            animation="border"
            role="status"
            className="mb-auto text-center"
          ></Spinner>
          <h1>Loading.......</h1>
        </div>
      )}
    </>
  );
};

export default UserProfile;
