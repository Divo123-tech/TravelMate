import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDays,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
type Props = {
  role: string;
  id: string;
  name: string;
  startDate: string;
  endDate: string;
};

const childVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const Trip = ({ role, id, name, startDate, endDate }: Props) => {
  return (
    <motion.div
      className="bg-oxford-blue flex gap-4 md:gap-12 pr-4 md:pr-24 items-center"
      variants={childVariant}
    >
      <img src={`https://picsum.photos/seed/${id}/200/150`}></img>
      <div className="text-white flex flex-col gap-3">
        <p className="text-md md:text-lg">
          <FontAwesomeIcon icon={faUser} /> Role: {role}
        </p>
        <p className="text-xl md:text-3xl">{name}</p>
        <p className="text-md md:text-lg">
          <FontAwesomeIcon icon={faCalendarDays} /> {startDate.slice(0, 10)} -{" "}
          {endDate || "present"}
        </p>
      </div>
      <Link to={"/trip"} className="ml-auto">
        <motion.button
          className="text-oxford-blue bg-baby-powder ml-auto rounded-full py-3 px-12 text-xl hidden md:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faFilePen} /> Edit
        </motion.button>
      </Link>
      <Link to={"/trip"}>
        <motion.button
          className="block md:hidden text-white text-3xl ml-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faFilePen} />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Trip;
