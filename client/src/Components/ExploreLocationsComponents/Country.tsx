import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faGlobe,
  faPassport,
} from "@fortawesome/free-solid-svg-icons";
import { getCountryVisa, getCountryExchange } from "../../services/apiService";
import { countryType, VisaRequirementsType } from "../../types/types";
import { UserContext } from "../../App";
import loading from "../../assets/loading.png";

type CountryProps = {
  country: countryType;
  setCurrentCountry?: (country: countryType) => void;
  setSearch?: (searchQuery: string) => void;
};
const Country = ({ country, setCurrentCountry, setSearch }: CountryProps) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user } = context;
  const goToStates = () => {
    if (setCurrentCountry && setSearch) {
      setCurrentCountry(country);
      setSearch("");
    }
    navigate(`/explore?locationType=states&country=${country.name}`);
  };
  useEffect(() => {
    // Reset visaShown when the country prop changes
    setVisaShown(false);
    setCurrencyShown(false);
    setVisaDetails(null);
    setExchangeRate(0);
  }, [country]);

  const fetchCountryVisa = async (country: countryType) => {
    setVisaShown((prevVisaShown) => !prevVisaShown);
    if (!visaShown) {
      const visaDetails = await getCountryVisa(
        user?.passport.code || "US",
        country.iso2
      );
      setVisaDetails(visaDetails);
    }
  };
  const fetchCountryExchange = async (country: countryType) => {
    setCurrencyShown((prevCurrencyShown) => !prevCurrencyShown);
    const exchangeRate = await getCountryExchange(
      user?.currencyUsed || "USD",
      country.name == "Albania" ? "ALL" : country.currency
    );
    setExchangeRate(exchangeRate);
  };
  const [visaShown, setVisaShown] = useState(false);
  const [currencyShown, setCurrencyShown] = useState(false);
  const [visaDetails, setVisaDetails] = useState<VisaRequirementsType | null>(
    null
  );
  const [exchangeRate, setExchangeRate] = useState(0);
  return (
    <>
      {" "}
      <div className="flex items-center gap-8 mr-auto" id="image-header-div">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${country.name}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>
        <div className="flex flex-col gap-2 md:text-left">
          <p className="text-white text-base text-lg whitespace-nowrap font-Rethink">
            Region: {country.continent}
          </p>
          <h1
            className="text-white text-3xl font-medium hover:cursor-pointer font-Oswald"
            onClick={goToStates}
          >
            {country.name}, {country.iso2}
          </h1>
          <p className="text-white text-base md:text-lg whitespace-nowrap font-Rethink">
            Capital: {country.capital}
          </p>
        </div>
      </div>
      <div className="flex flex-col text-baby-powder text-center hover:cursor-pointer font-Oswald">
        <motion.h1
          className="text-baby-powder font-medium text-2xl"
          onClick={() => fetchCountryVisa(country)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faPassport} /> Visa Requirements
        </motion.h1>
        {visaShown ? (
          visaDetails ? (
            <div>
              <p className="text-lg font-Rethink">
                Status: {visaDetails.visaStatus}
              </p>
              <p className="text-lg font-Rethink">
                Duration: {visaDetails.visaDuration || 0} Days
              </p>
            </div>
          ) : (
            <h1>loading...</h1>
          )
        ) : null}
      </div>
      <div className="flex flex-col text-baby-powder text-center">
        <motion.h1
          className="text-baby-powder font-medium text-2xl hover:cursor-pointer font-Oswald"
          onClick={() => fetchCountryExchange(country)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faGlobe} /> Exchange Rate
        </motion.h1>
        {currencyShown ? (
          exchangeRate ? (
            <div>
              <p className="text-lg font-Rethink">
                1 {user?.currencyUsed || "USD"}{" "}
                <FontAwesomeIcon icon={faArrowRight} />{" "}
                {exchangeRate.toString().slice(0, 7)}{" "}
                {country.name == "Albania" ? "ALL" : country.currency}
              </p>
              <p className="text-lg font-Rethink">
                1 {country.name == "Albania" ? "ALL" : country.currency}{" "}
                <FontAwesomeIcon icon={faArrowRight} />{" "}
                {(1 / exchangeRate).toString().slice(0, 7)}{" "}
                {user?.currencyUsed || "USD"}
              </p>
            </div>
          ) : (
            <h1>loading...</h1>
          )
        ) : null}
      </div>
    </>
  );
};

export default Country;
