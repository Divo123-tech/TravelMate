import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDays,
  faFilePen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { deleteTrip, getUserDetails } from "../../services/apiService";
import loading from "../../assets/loading.png";
type Props = {
  role: string;
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  userId: string;
};

const childVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const Trip = ({ role, id, name, startDate, endDate, userId }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { setUser } = context;
  const handleDelete = async () => {
    try {
      await deleteTrip(userId, id);
      setUser(await getUserDetails());
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async () => {
    navigate(`/trip/${id}`);
  };
  return (
    <motion.div
      className="bg-oxford-blue flex gap-4 md:gap-12 pr-4 md:pr-24 items-center"
      variants={childVariant}
    >
      {!isImageLoaded && <img src={loading} alt="Loading..." />}
      <img
        src={`https://picsum.photos/seed/${id}/200/150`}
        onLoad={() => setIsImageLoaded(true)}
      ></img>
      {/* </object> */}
      <div className="text-white flex flex-col gap-3">
        <p className="text-md md:text-lg">
          <FontAwesomeIcon icon={faUser} /> Role: {role}
        </p>
        <p className="text-xl md:text-3xl">{name}</p>
        <p className="text-md md:text-lg">
          <FontAwesomeIcon icon={faCalendarDays} /> {startDate.slice(0, 10)} -{" "}
          {endDate}
        </p>
      </div>
      <div className="flex flex-col gap-3 ml-auto mt-3 justify-center">
        <motion.button
          className="text-baby-powder md:text-oxford-blue md:bg-baby-powder ml-auto rounded-full md:px-12 md:py-2 md:rounded-full text-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faFilePen} />
          <span className="hidden md:inline"> Edit</span>
        </motion.button>
        <motion.button
          className="text-red-700 md:bg-red-200 ml-auto rounded-full md:px-9 md:py-2 md:rounded-full text-2xl mr-2 md:mr-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          <span className="hidden md:inline"> Delete</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Trip;
