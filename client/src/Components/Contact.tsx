import contactUsImage from "../assets/Contact-us.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faEnvelope,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import FAQAccordion from "./ContactComponents/Accordion";
import { FAQInformation } from "../data/faq";
import { FC } from "react";
const Contact: FC = () => {
  return (
    <>
      <div className="relative">
        <img src={contactUsImage} className="w-full" alt="Contact Us" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-white text-3xl p-4 rounded">
            We'd love to hear from you
          </p>
          <p className="text-white text-7xl font-bold p-4 rounded">
            Contact Us
          </p>
        </div>
      </div>
      <section className="text-center mt-8">
        <h1 className="text-oxford-blue font-medium text-5xl mb-5">
          Contact Details
        </h1>
        <div className="flex justify-around items-center text-oxford-blue">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="rounded-full border-gray border-5 p-3 ">
              <FontAwesomeIcon icon={faPhoneVolume} className="text-3xl" />
            </div>
            <p className="text-lg font-medium">Phone</p>
            <p className="italic">+6598100645</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="rounded-full border-gray border-5 p-3 ">
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
            </div>
            <p className="text-lg font-medium">Email</p>
            <p className="italic">TravelMateHelp@gmail.com</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="rounded-full border-gray border-5 p-3 ">
              <FontAwesomeIcon icon={faHourglassEnd} className="text-3xl" />
            </div>
            <p className="text-lg font-medium">Opening Hours</p>
            <p className="italic">8:00 - 18:00</p>
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-center text-3xl font-medium my-4">FAQ</h1>
        <div className="flex flex-col gap-4">
          <Accordion>
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
    </>
  );
};

export default Contact;
