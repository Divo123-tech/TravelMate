import contactUsImage from "../../assets/Contact-us.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faEnvelope,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import FAQAccordion from "./Accordion";
import { FAQInformation } from "../../data/faq";
import { FC, useContext, useEffect } from "react";
import { PageContext } from "../../App";

// Functional component for the Contact page
const Contact: FC = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { setCurrentPage } = pageContext;
  useEffect(() => {
    setCurrentPage("Contact");
  }, []);
  return (
    <>
      <div className="dark:bg-black">
        {/* Hero section with background image and text */}
        <div className="relative">
          <img src={contactUsImage} className="w-full" alt="Contact Us" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-8xl p-4 font-Playfair">Contact Us</p>
            <p className="text-white text-3xl p-4 font-Raleway">
              We'd love to hear from you
            </p>
          </div>
        </div>

        {/* Contact details section */}
        <section className="text-center mt-8">
          <div className="font-Raleway font-medium text-black ">
            <h1 className=" text-5xl mb-5 dark:text-white">Contact Details</h1>
          </div>
          <div className="flex justify-around items-center text-oxford-blue dark:text-white">
            {/* Phone contact */}
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="rounded-full border-champion-blue border-5 p-3 ">
                <FontAwesomeIcon icon={faPhoneVolume} className="text-3xl " />
              </div>
              <p className="text-2xl font-bold font-Rethink">Contact Number</p>
              <p className="text-lg italic font-Rethink">6498 6332</p>
            </div>
            {/* Email contact */}
            <div className="flex flex-col justify-center items-center gap-2 ">
              <div className="rounded-full border-champion-blue border-5 p-3 ">
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
              </div>
              <p className="text-2xl font-bold font-Rethink">Email</p>
              <p className="text-lg italic font-Rethink">
                TravelMateHelp@gmail.com
              </p>
            </div>
            {/* Opening hours */}
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="rounded-full border-champion-blue border-5 p-3 ">
                <FontAwesomeIcon icon={faHourglassEnd} className="text-3xl" />
              </div>
              <p className="text-2xl font-bold font-Rethink">Opening Hours</p>
              <p className="text-lg italic font-Rethink">8:00 am - 6:00 pm</p>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section>
          <h1 className="text-center text-5xl font-medium my-4 font-Raleway dark:text-white">
            FAQ
          </h1>
          <div className="flex flex-col gap-4 ">
            <Accordion>
              {/* Map through FAQInformation to render FAQAccordion components */}
              {FAQInformation.map((faq, index) => {
                return (
                  <FAQAccordion
                    key={index}
                    eventKey={`${index}`}
                    question={faq.question}
                    answer={faq.answer}
                  />
                );
              })}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
