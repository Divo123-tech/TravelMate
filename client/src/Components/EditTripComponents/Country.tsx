import { motion } from "framer-motion";
const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { countryType } from "../../types/types";
import { useState } from "react";
import loading from "../../assets/loading.png";
type Props = {
  country: countryType;
};

const Country = ({ country }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleDelete = (country: countryType) => {
    console.log(country);
  };
  return (
    <motion.div
      className="bg-oxford-blue flex items-center mb-4"
      variants={childVariant}
    >
      <div className="bg-oxford-blue flex items-center gap-4">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${country.name}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>

        <h1 className="text-white text-2xl md:text-3xl">{country.name}</h1>
      </div>
      <div className="ml-auto pr-12">
        <motion.button
          className="text-red-700 md:bg-red-200 ml-auto rounded-full md:px-9 md:py-2 md:rounded-full text-2xl mr-2 md:mr-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(country)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          <span className="hidden md:inline"> Remove</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Country;
