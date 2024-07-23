import { FC, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchCountries, editUserDetails } from "../services/apiService";
import { motion } from "framer-motion";
import Trip from "./UserProfileComponents/Trip";
import CreateNewTrip from "./UserProfileComponents/CreateNewTrip";
import EditSuccessToast from "./UserProfileComponents/EditSuccessToast";
import { useContext } from "react";
import { UserContext } from "../App";
import Spinner from "react-bootstrap/Spinner";
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const UserProfile: FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user, setUser } = context;
  const [countries, setCountries] = useState([]);
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countriesData = await fetchCountries("all");
        setCountries(countriesData);
      } catch (err) {
        console.error(err);
      }
    };

    getCountries();
  }, []);

  const handleChange = (e: any) => {
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
  const handleSubmit = (e: any) => {
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
        console.log(err);
      }
    };

    editUser();
  };

  // Create a Set to store unique currencies and then sort them alphabetically
  const uniqueCurrencies = Array.from(
    new Set(countries.map((country: any) => country.currency))
  ).sort((a, b) => a.localeCompare(b));
  return (
    <>
      {user ? (
        <section>
          <div className="pt-16 pb-2 px-32 flex items-center justify-center gap-3 md:justify-around flex-wrap">
            <div className="flex items-center flex-col gap-2">
              <img src={user.picture} className="rounded-full" />
              <p className="text-xl">User Id</p>
              <p className="text-lg italic">{user.googleId}</p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <Container className="flex flex-wrap md:grid">
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
                              selected
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
              <p className="text-lg font-medium">MY TRIPS</p>
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
                  <Trip
                    {...trip}
                    role={trip.owner == user._id ? "Owner" : "Collaborator"}
                    id={trip._id}
                    key={index}
                    userId={user.googleId}
                  />
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
