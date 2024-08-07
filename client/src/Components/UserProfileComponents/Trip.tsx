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
import { deleteTrip, getCurrentUser } from "../../services/apiService";
import loading from "../../assets/loading.png";
import DeleteButton from "../DeleteButton";
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
      setUser(await getCurrentUser());
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async () => {
    navigate(`/trip/${id}`);
  };
  return (
    <>
      {!isImageLoaded && <img src={loading} alt="Loading..." />}
      <img
        src={`https://picsum.photos/seed/${id}/200/150`}
        onLoad={() => setIsImageLoaded(true)}
      ></img>
      {/* </object> */}
      <div className="text-white flex flex-col gap-3">
        <p className="text-md md:text-lg font-Rethink">
          <FontAwesomeIcon icon={faUser} /> Role: {role}
        </p>
        <p className="text-xl md:text-3xl font-Oswald">{name}</p>
        <p className="text-md md:text-lg font-Rethink">
          <FontAwesomeIcon icon={faCalendarDays} /> {startDate.slice(0, 10)} -{" "}
          {endDate}
        </p>
      </div>
    </>
  );
};

export default Trip;
