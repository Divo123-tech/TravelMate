import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  imgSrc: string;
  name: string;
  title: string;
  body: string;
};

const Review = ({ imgSrc, name, title, body }: Props) => {
  return (
    <motion.div
      className="review w-1/4 flex flex-col items-center text-justify px-10 gap-2"
      variants={childVariant}
    >
      <img src={imgSrc} className="rounded-full w-40 "></img>
      <p className="italic">-{name}-</p>
      <div className="flex gap-2 text-yellow-400">
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
      <p className="font-bold">"{title}"</p>
      <p>{body}</p>
    </motion.div>
  );
};

export default Review;
