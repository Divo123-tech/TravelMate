import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
type Props = {
  deleteFunction: () => void;
};
const DeleteButton: FC<Props> = ({ deleteFunction }: Props) => {
  return (
    <div className="md:ml-auto flex flex-col items-center justify-center">
      <motion.button
        className="text-red-700 md:bg-red-200 ml-auto rounded-full md:px-9 md:py-2 md:rounded-full text-4xl md:text-2xl mr-2 md:mr-0 whitespace-nowrap"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={deleteFunction}
      >
        <FontAwesomeIcon icon={faTrashCan} />
        <span className="hidden md:inline"> Delete</span>
      </motion.button>
    </div>
  );
};

export default DeleteButton;
