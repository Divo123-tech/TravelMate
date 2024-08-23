import { FC, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faGlobe,
  faPassport,
} from "@fortawesome/free-solid-svg-icons";
import {
  getCountryVisa,
  getCountryExchange,
} from "../../services/locations.service";
import { countryType, VisaRequirementsType } from "../../types/types";
import { UserContext } from "../../App";
import loading from "../../assets/loading.png";

// Define the type for the props that the Country component will receive
type Props = {
  country: countryType; // The country object containing information to display
  setCurrentCountry?: (country: countryType) => void; // Optional callback to set the current country
  setSearch?: (searchQuery: string) => void; // Optional callback to set the search query
};

// Functional component to display country details and handle data fetching
const Country: FC<Props> = ({
  country,
  setCurrentCountry,
  setSearch,
}: Props) => {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // State to manage image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // State to manage the visibility of visa details
  const [visaShown, setVisaShown] = useState(false);

  // State to manage the visibility of currency exchange details
  const [currencyShown, setCurrencyShown] = useState(false);

  // State to hold the fetched visa details
  const [visaDetails, setVisaDetails] = useState<VisaRequirementsType | null>(
    null
  );

  // State to hold the fetched exchange rate
  const [exchangeRate, setExchangeRate] = useState(0);

  // Access user context for user-specific data
  const context = useContext(UserContext);

  // Ensure the component is used within a UserProvider
  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user } = context;

  // Function to navigate to the states page for the current country
  const goToStates = () => {
    if (setCurrentCountry && setSearch) {
      setCurrentCountry(country); // Set the current country in the parent component
      setSearch(""); // Clear the search query
    }
    // Navigate to the explore page with query parameters for states
    navigate(`/explore?locationType=states&country=${country.name}`);
  };

  // Effect to reset visa and currency details when the country prop changes
  useEffect(() => {
    setVisaShown(false);
    setCurrencyShown(false);
    setVisaDetails(null);
    setExchangeRate(0);
  }, [country]);

  // Function to fetch and toggle the display of visa details
  const fetchCountryVisa = async (country: countryType) => {
    setVisaShown((prevVisaShown) => !prevVisaShown);
    if (!visaShown) {
      const visaDetails = await getCountryVisa(
        user?.passport.code || "US", // Default to "US" if user passport code is not available
        country.iso2
      );
      setVisaDetails(visaDetails);
    }
  };

  // Function to fetch and toggle the display of currency exchange details
  const fetchCountryExchange = async (country: countryType) => {
    setCurrencyShown((prevCurrencyShown) => !prevCurrencyShown);
    const exchangeRate = await getCountryExchange(
      user?.currencyUsed || "USD", // Default to "USD" if user currency is not available
      country.name === "Albania" ? "ALL" : country.currency
    );
    setExchangeRate(exchangeRate);
  };

  return (
    <>
      {/* Container for country details */}
      <div className="flex items-center gap-8 mr-auto" id="image-header-div">
        {/* Display a loading image while the actual country image is loading */}
        {!isImageLoaded && <img src={loading} alt="Loading..." />}

        {/* Country image */}
        <img
          src={`https://picsum.photos/seed/${country.name}/200/150`} // URL for the image, using the country name as a seed for randomness
          onLoad={() => setIsImageLoaded(true)} // Set image loaded state to true once the image has fully loaded
          alt={`Image of ${country.name}`} // Alt text for accessibility
        />

        {/* Container for country details */}
        <div className="flex flex-col gap-2 md:text-left">
          {/* Display the country continent */}
          <p className="text-oxford-blue dark:text-white text-base text-lg whitespace-nowrap font-Rethink">
            Region: {country.continent}
          </p>

          {/* Display the country name and ISO code, make it clickable to navigate to states */}
          <h1
            className="text-oxford-blue dark:text-white text-3xl font-medium hover:cursor-pointer font-Raleway"
            onClick={goToStates}
          >
            {country.name}, {country.iso2}
          </h1>

          {/* Display the country capital */}
          <p className="text-oxford-blue dark:text-white text-base md:text-lg whitespace-nowrap font-Rethink">
            Capital: {country.capital}
          </p>
        </div>
      </div>
      {/* Container for visa details */}
      <div className="flex flex-col dark:text-white text-oxford-blue text-center hover:cursor-pointer font-Raleway">
        <motion.h1
          className="bg-oxford-blue dark:bg-champion-blue text-alice-blue text-center px-6 py-3 text-lg whitespace-nowrap font-Rethink"
          onClick={() => fetchCountryVisa(country)} // Fetch visa details on click
          whileHover={{ scale: 1.05 }} // Animation effect on hover
          whileTap={{ scale: 0.9 }} // Animation effect on tap
        >
          <FontAwesomeIcon icon={faPassport} /> Visa Requirements
        </motion.h1>

        {/* Display visa details if they are shown */}
        {visaShown ? (
          visaDetails ? (
            <div>
              <p className="text-lg ml-80 font-Rethink">
                Status: {visaDetails.visaStatus}
              </p>
              <p className="text-lg ml-80 font-Rethink">
                Duration: {visaDetails.visaDuration || 0} Days
              </p>
            </div>
          ) : (
            <h1 className="ml-80">Loading...</h1>
          )
        ) : null}
      </div>

      {/* Container for currency exchange details */}
      <div className="flex flex-col dark:text-white text-oxford-blue text-center">
        <motion.h1
          className="bg-oxford-blue dark:bg-champion-blue text-alice-blue px-6 py-3 text-lg whitespace-nowrap font-Rethink hover:cursor-pointer"
          onClick={() => fetchCountryExchange(country)} // Fetch exchange rate on click
          whileHover={{ scale: 1.05 }} // Animation effect on hover
          whileTap={{ scale: 0.9 }} // Animation effect on tap
        >
          <FontAwesomeIcon icon={faGlobe} /> Exchange Rate
        </motion.h1>

        {/* Display exchange rate details if they are shown */}
        {currencyShown ? (
          exchangeRate ? (
            <div>
              <p className="text-lg ml-8 font-Rethink">
                1 {user?.currencyUsed || "USD"}{" "}
                <FontAwesomeIcon icon={faArrowRight} />{" "}
                {exchangeRate.toString().slice(0, 7)}{" "}
                {country.name === "Albania" ? "ALL" : country.currency}
              </p>
              <p className="text-lg ml-8 font-Rethink">
                1 {country.name === "Albania" ? "ALL" : country.currency}{" "}
                <FontAwesomeIcon icon={faArrowRight} />{" "}
                {(1 / exchangeRate).toString().slice(0, 7)}{" "}
                {user?.currencyUsed || "USD"}
              </p>
            </div>
          ) : (
            <h1>Loading...</h1>
          )
        ) : null}
      </div>
    </>
  );
};

export default Country;
