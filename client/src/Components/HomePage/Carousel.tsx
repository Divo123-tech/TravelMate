import Carousel from "react-bootstrap/Carousel";
import Carousel1 from "../../assets/Carousel1.jpg";
import Carousel2 from "../../assets/Carousel2.jpg";
import Carousel3 from "../../assets/Carousel3.jpg";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faMagnifyingGlassLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FC, useContext, useState } from "react";
import { UserContext } from "../../App";
import AuthModal from "../AuthModal";
import NewTripModal from "../UserProfile/NewTripModal";

const CarouselComponent: FC = () => {
  const [authModalShow, setauthModalShow] = useState(false);
  const [addTripModalShow, setAddTripModalShow] = useState(false);

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const navigate = useNavigate();
  const { user } = userContext;

  return (
    <motion.div
      className="relative mb-0 md:mb-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      <Carousel className="md:h-full">
        {[Carousel1, Carousel2, Carousel3].map((src, index) => (
          <Carousel.Item key={index} interval={5000}>
            <img
              className="w-full object-cover h-[50vh] md:h-auto"
              src={src}
              alt={`Carousel${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="absolute inset-0 flex flex-col items-center justify-around">
        <div className="text-center text-white bg-black bg-opacity-50 rounded-md p-12 sm:p-24 flex flex-col gap-4 md:gap-8 max-w-[90%] mx-auto">
          <h1 className="text-2xl md:text-6xl font-Playfair">
            Global Traveling, Easy Planning
          </h1>
          <p className="text-sm md:text-xl font-Raleway">
            Plan Your Vacations Anywhere in The World
          </p>
        </div>

        <div className="flex flex-col xs:flex-row gap-4 xs:gap-8 md:gap-24 lg:gap-48 w-full px-4 xs:px-0 justify-around">
          {[
            {
              text: "Explore",
              icon: faMagnifyingGlassLocation,
              onClick: () => navigate("/explore"),
            },
            {
              text: "Create A Trip",
              icon: faPlaneDeparture,
              onClick: user
                ? () => setAddTripModalShow(true)
                : () => setauthModalShow(true),
            },
          ].map((button, index) => (
            <div key={index} className="bg-black w-full xs:w-auto">
              <button
                className="text-white h-12 w-full xs:h-20 xs:w-36 md:h-28 md:w-72 lg:h-48 lg:w-92 hover:bg-champion-blue flex items-center justify-center px-2 xs:px-4"
                onClick={button.onClick}
              >
                <div className="flex gap-2 md:gap-4 items-center">
                  <p className="text-md xs:text-lg md:text-3xl lg:text-3xl font-Rethink">
                    {button.text}
                  </p>
                  <FontAwesomeIcon
                    icon={button.icon}
                    className="text-lg xs:text-xl md:text-3xl lg:text-4xl"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <AuthModal show={authModalShow} onHide={() => setauthModalShow(false)} />
      <NewTripModal
        show={addTripModalShow}
        onHide={() => setAddTripModalShow(false)}
      />
    </motion.div>
  );
};

export default CarouselComponent;