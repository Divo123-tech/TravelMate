import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import loading from "../../assets/loading.png";
type Props = {
  role: string;
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  userId: string;
};

const Trip = ({ role, id, name, startDate, endDate }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
