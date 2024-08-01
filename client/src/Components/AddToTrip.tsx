import { useState, FC } from "react";
import { motion } from "framer-motion";
import AddToTripModal from "./AddToTripModal";
type Props = {
  itineraries: any[];
  itineraryType: string;
};
const AddToTrip: FC<Props> = ({ itineraries, itineraryType }: Props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="md:ml-auto pr-16 flex flex-col items-center justify-center">
      <motion.button
        className="bg-oxford-blue text-baby-powder px-6 ml-8 py-3 rounded-full text-lg whitespace-nowrap"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setModalShow(true)}
      >
        Add to Trip
      </motion.button>
      <AddToTripModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        itineraries={itineraries}
        itineraryType={itineraryType}
      />
    </div>
  );
};

export default AddToTrip;
