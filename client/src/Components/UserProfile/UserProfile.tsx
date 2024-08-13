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
import { TripType, countryType } from "../../types/types";
import { container, childVariant } from "../../data/animation";
const UserProfile: FC = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const userContext = useContext(UserContext); // Access user context
  const pageContext = useContext(PageContext); // Access page context

  // Ensure that the component is used within the necessary context providers
  if (!userContext || !pageContext) {
    throw new Error(
      "YourComponent must be used within a UserProvider and PageProvider"
    );
  }

  const { user, setUser } = userContext; // Destructure user state and updater function
  const { setCurrentPage } = pageContext; // Destructure page updater function

  const [countries, setCountries] = useState<countryType[]>([]); // State to hold the list of countries
  const [editSuccess, setEditSuccess] = useState(false); // State to manage edit success status

  // Effect to fetch and set the current user data on component mount
  useEffect(() => {
    const getUser = async () => {
      setUser(await getCurrentUser()); // Set user state with the fetched data
    };

    getUser(); // Call getUser when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Effect to set the current page context on component mount
  useEffect(() => {
    setCurrentPage("Profile"); // Set the current page to "Profile"
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Effect to fetch the list of countries and update state
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await getAllCountries(
          "all",
          undefined,
          undefined,
          1000
        ); // Fetch country data with a limit of 1000
        const countriesData = response.data; // Extract countries data from response
        setCountries(countriesData); // Update state with the fetched countries
      } catch (err) {
        setCountries([]); // Set an empty array if an error occurs
      }
    };

    getCountries(); // Call getCountries when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Handler function for deleting a trip
  const handleDelete = async (tripId: string) => {
    try {
      await deleteTrip(tripId); // Delete the trip with the given ID
      setUser(await getCurrentUser()); // Refresh user data after deletion
    } catch (err) {
      // Optionally handle the error or provide feedback
    }
  };

  // Handler function for input changes in the form
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "passport") {
      const [code, name] = e.target.value.split(","); // Split passport value into code and name
      if (user) {
        setUser({
          ...user,
          passport: {
            code,
            name,
          },
        });
      }
    } else {
      if (user) {
        setUser({
          ...user,
          [e.target.name]: e.target.value, // Update user state with the new value
        });
      }
    }
  };

  // Handler function for form submission
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    const editUser = async () => {
      try {
        if (!user) {
          throw new Error("User not found"); // Throw an error if user is not found
        }
        const userData = await editUserDetails(
          user.name,
          user.passport,
          user.currencyUsed
        ); // Call service to edit user details
        setUser({
          ...user,
          name: userData.name,
          passport: userData.passport,
          currencyUsed: userData.currencyUsed,
        }); // Update user state with the new data
        setEditSuccess(true); // Set edit success status to true
      } catch (err) {
        // Optionally handle the error or provide feedback
      }
    };

    editUser(); // Call editUser to update user details
  };

  // Create a Set to store unique currencies and then sort them alphabetically
  const uniqueCurrencies = Array.from(
    new Set(countries.map((country: countryType) => country.currency)) // Extract and deduplicate currencies
  ).sort((a, b) => a.localeCompare(b)); // Sort currencies alphabetically
  return (
    <>
      {user ? (
        // Render content if the user is authenticated
        <section>
          {/* User Profile Section */}
          <div className="pt-16 pb-2 px-32 flex items-center justify-center gap-3 md:justify-around flex-wrap">
            <div className="flex items-center flex-col gap-2">
              {/* User's profile picture and ID */}
              <img
                src={user.picture}
                className="rounded-full"
                alt="User Profile"
              />
              <p className="text-xl font-Oswald">User ID</p>
              <p className="text-lg italic font-Rethink">{user.googleId}</p>
            </div>
            <div>
              {/* Form for editing user details */}
              <form onSubmit={handleSubmit}>
                {/* Form layout using Container, Row, and Col */}
                <Container className="flex flex-wrap md:grid font-Rethink">
                  <Row className="mb-2">
                    <Col>
                      {/* Input field for user's name */}
                      <div className="flex flex-col">
                        <label className="text-lg">Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          name="name"
                          className="border-oxford-blue border-2 rounded-lg w-80 h-8"
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                      </div>
                    </Col>
                    <Col>
                      {/* Dropdown for selecting currency */}
                      <div className="flex flex-col">
                        <label className="text-lg">Currency</label>
                        <select
                          defaultValue={user.currencyUsed}
                          className="border-oxford-blue border-2 rounded-lg w-80 h-8"
                          onChange={handleChange}
                          name="currencyUsed"
                        >
                          {/* Option for the currently selected currency */}
                          {user.currencyUsed ? (
                            <option
                              key={user.currencyUsed}
                              value={user.currencyUsed}
                            >
                              {user.currencyUsed}
                            </option>
                          ) : (
                            <option value="">Select currency</option>
                          )}
                          {/* Options for all unique currencies */}
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
                      {/* Dropdown for selecting passport */}
                      <div className="flex flex-col">
                        <label className="text-lg">Passport</label>
                        <select
                          className="border-oxford-blue border-2 rounded-lg w-80 h-8"
                          name="passport"
                          onChange={handleChange}
                        >
                          {/* Option for the currently selected passport */}
                          {user.passport ? (
                            <option
                              key={user.passport.code}
                              value={user.passport.code}
                            >
                              {user.passport.name}
                            </option>
                          ) : (
                            <option value="">Select passport</option>
                          )}
                          {/* Options for all available passports */}
                          {countries.map((country: any) => (
                            <option
                              key={country.iso2}
                              value={`${country.iso2},${country.name}`}
                            >
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                    <Col>
                      {/* Submit button for the form */}
                      <div className="flex flex-col items-center justify-center">
                        <motion.button
                          type="submit"
                          className="bg-teal hover:bg-oxford-blue text-white rounded-lg px-2 py-2 mt-3 w-80 text-lg disabled:opacity-80"
                          disabled={
                            user.name === "" ||
                            user.passport.code === "" ||
                            user.currencyUsed === ""
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
              {/* Message indicating the purpose of the form */}
              <p className="mt-4 text-center italic">
                Fill in these fields to get personalized visa and exchange
                information when exploring!
              </p>
            </div>
          </div>
          {/* Success toast notification component */}
          <EditSuccessToast
            editSuccess={editSuccess}
            setEditSuccess={setEditSuccess}
          />

          {/* Trips Section */}
          <section className="py-16">
            {/* Section title with animation */}
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
            {/* List of user's trips with animation */}
            <motion.div
              className="flex flex-col gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1 }}
              variants={container}
            >
              {user.trips.map((trip: any) => {
                return (
                  <motion.div
                    className="bg-oxford-blue flex gap-4 md:gap-12 pr-4 md:pr-24 items-center"
                    variants={childVariant}
                    key={trip._id} // Unique key for each trip item
                  >
                    {/* Trip component displaying details */}
                    <Trip
                      role={trip.owner === user._id ? "Owner" : "Collaborator"}
                      id={trip._id}
                      name={trip.name}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                      userId={user.googleId}
                    />
                    <div className="flex flex-col gap-3 ml-auto items-center justify-center font-Rethink">
                      {/* Edit button with animation and navigation */}
                      <motion.button
                        className="text-baby-powder md:text-oxford-blue md:bg-baby-powder rounded-full md:px-12 md:py-2 md:rounded-full text-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/trip/${trip._id}`)}
                      >
                        <FontAwesomeIcon icon={faFilePen} />
                        <span className="hidden md:inline"> Edit</span>
                      </motion.button>
                      {/* Delete button for removing the trip */}
                      <DeleteButton
                        deleteFunction={() => handleDelete(trip._id)}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
          {/* Component for creating a new trip */}
          <CreateNewTrip />
        </section>
      ) : (
        // Loading state when user data is not available
        <div className="flex flex-col gap-8 justify-center items-center my-auto text-2xl">
          <Spinner
            animation="border"
            role="status"
            className="mb-auto text-center"
          />
          <h1>Loading.......</h1>
        </div>
      )}
    </>
  );
};

export default UserProfile;
