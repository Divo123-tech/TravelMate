import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FC } from "react";

// Define the Footer component
const Footer: FC = () => {
  return (
    <>
      {/* Main footer container */}
      <footer className="bg-oxford-blue flex justify-between px-8 md:px-16 py-4 font-light bottom-0 z-50">
        {/* Left section: Menu links */}
        <div className="flex flex-col text-white gap-3 text-md">
          {/* Menu header */}
          <div className="flex flex-col gap-1 mb-4 text-lg">
            <p className="border-white">MENU</p>
            <hr className="w-1/4 border-2" />
          </div>
          {/* Individual menu items */}
          <p>About Us</p>
          <p>FAQ</p>
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </div>

        {/* Center section: Social media links */}
        <div className="flex flex-col items-start gap-8 text-white">
          {/* Social media header */}
          <div className="flex flex-col gap-1 text-lg">
            <p>FOLLOW US</p>
            <hr className="border-2" />
          </div>
          {/* Social media icons */}
          <div className="flex flex-wrap gap-3 text-black">
            {/* Facebook icon */}
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faFacebookF} className="text-lg" />
            </div>
            {/* Twitter icon */}
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faTwitter} className="text-lg" />
            </div>
            {/* YouTube icon */}
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faYoutube} className="text-lg" />
            </div>
            {/* Instagram icon */}
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faInstagram} className="text-lg" />
            </div>
          </div>
        </div>

        {/* Right section: Copyright notice */}
        <div className="text-white font-light text-sm md:text-md">
          <p>&copy; 2024 TravelMate | All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
