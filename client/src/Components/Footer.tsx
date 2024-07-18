import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-oxford-blue flex justify-between px-8 md:px-16 py-4 font-light">
        <div className="flex flex-col text-white gap-3 text-md ">
          <div className="flex flex-col gap-1 mb-4 text-lg">
            <p className="border-white">MENU</p>
            <hr className="w-1/4 border-2" />
          </div>
          <p>About Us</p>
          <p>FAQ</p>
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <div className="flex flex-col items-start gap-8 text-white">
          <div className="flex flex-col gap-1 text-lg">
            <p>FOLLOW US</p>
            <hr className="border-2" />
          </div>
          <div className="flex flex-wrap gap-3 text-black">
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faFacebookF} className="text-lg" />
            </div>
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faTwitter} className="text-lg" />
            </div>
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faYoutube} className="text-lg" />
            </div>
            <div className="bg-white flex justify-center items-center rounded-full p-1 h-10 w-10">
              <FontAwesomeIcon icon={faInstagram} className="text-lg" />
            </div>
          </div>
        </div>
        <div className="text-white font-light text-sm md:text-md">
          <p>&copy; 2024 TravelMate | All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
