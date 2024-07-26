import CreateTripImage from "../../assets/CreateTripImage.png";
// import { Link } from "react-router-dom";
import { useState } from "react";
import NewTripModal from "./NewTripModal";
const CreateNewTrip = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <section className="relative inline-block bg-oxford-blue mb-16">
      <img src={CreateTripImage} alt="Example" className="w-full h-full" />
      <button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-oxford-blue font-medium  bg-baby-powder bg-opacity-50 hover:bg-opacity-70 border-none p-8 md:py-12 md:px-24 text-2xl md:text-5xl rounded-full "
        onClick={() => setModalShow(true)}
      >
        Create New Trip
      </button>
      <NewTripModal show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
};

export default CreateNewTrip;
