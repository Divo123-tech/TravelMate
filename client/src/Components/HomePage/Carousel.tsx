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
import { Link, useNavigate } from "react-router-dom";
import { FC, useContext, useState } from "react";
import { googleAuthenticate } from "../../services/users.service";
import { UserContext } from "../../App";
import AuthModal from "../AuthModal";

// Functional Component for Carousel
const CarouselComponent: FC = () => {
  const [modalShow, setModalShow] = useState(false);

  const userContext = useContext(UserContext);
  // Ensure that the component is used within the necessary context providers
  if (!userContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const navigate = useNavigate();
  const { user } = userContext; // Destructure user state and updater function
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
      {/* Bootstrap Carousel Component */}
      <Carousel className="h-full">
        {/* Carousel Item 1 */}
        <Carousel.Item interval={5000}>
          <img
            className="w-full object-cover"
            src={Carousel1}
            alt="Carousel1"
          />
        </Carousel.Item>
        {/* Carousel Item 2 */}
        <Carousel.Item interval={5000}>
          <img
            className="w-full object-cover"
            src={Carousel2}
            alt="Carousel2"
          />
        </Carousel.Item>
        {/* Carousel Item 3 */}
        <Carousel.Item interval={5000}>
          <img
            className="w-full object-cover"
            src={Carousel3}
            alt="Carousel3"
          />
        </Carousel.Item>
      </Carousel>

      {/* Overlay content positioned over the carousel */}
      <div className="absolute inset-0 flex flex-col items-center justify-around">
        {/* Text section with background styling */}
        <div className="text-center text-white bg-black bg-opacity-50 rounded-md p-6 md:p-16 flex flex-col gap-8">
          <h1 className="text-lg md:text-6xl font-FatFace">
            Global Traveling, Easy Planning
          </h1>
          <p className="text-xs md:text-xl font-Oswald">
            Plan Your Vacations Anywhere in The World
          </p>
        </div>

        {/* Button section with navigation links */}
        <div className="flex flex-row gap-24 md:gap-48">
          {/* Explore Button */}
          <Link to={"/explore"} className="rounded-full bg-black">
            <button className="text-white h-24 w-24 md:h-48 md:w-48 rounded-full hover:bg-teal flex items-center justify-center">
              <div className="flex flex-col gap-2 md:gap-4 items-center">
                <p className="text-lg md:text-2xl font-Rethink">Explore</p>
                <FontAwesomeIcon
                  icon={faMagnifyingGlassLocation}
                  className="text-xl md:text-4xl"
                />
              </div>
            </button>
          </Link>
          {/* Create A Trip Button */}
          <div className="bg-black rounded-full">
            <button
              className="text-white h-24 w-24 md:h-48 md:w-48 rounded-full  hover:bg-oxford-blue flex items-center justify-center"
              onClick={
                user ? () => navigate("/profile") : () => setModalShow(true)
              }
            >
              <div className="flex flex-col gap-2 md:gap-4 items-center">
                <p className="text-md md:text-2xl font-Rethink">
                  Create A Trip
                </p>
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  className="text-xl md:text-4xl"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
    </motion.div>
  );
};

export default CarouselComponent;
