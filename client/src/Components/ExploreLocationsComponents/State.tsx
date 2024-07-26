import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { stateType } from "../../types/types";
import { UserContext } from "../../App";
import loading from "../../assets/loading.png";

type Props = {
  state: stateType;
};
const State = ({ state }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div className="bg-teal flex items-center gap-8 mr-auto ">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${state.name}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>
        <div className="flex flex-col md:text-left">
          <p className="text-white text-base text-lg whitespace-nowrap">
            Country: {state.countryName}, {state.countryCode}
          </p>
          <h1 className="text-white text-3xl font-medium hover:cursor-pointer">
            {state.name}, {state.code}
          </h1>
        </div>
      </div>
    </>
  );
};

export default State;
