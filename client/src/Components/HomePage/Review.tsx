import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { childVariant } from "../../data/animation";

type Props = {
  imgSrc: string;
  name: string;
  title: string;
  body: string;
};

const Review = ({ imgSrc, name, title, body }: Props) => {
  return (
    <motion.div
      className="review w-full md:w-1/4 lg:w-1/4 flex flex-col items-center text-justify px-4 md:px-10 gap-4"
      variants={childVariant}
    >
      <img src={imgSrc} className="rounded-full w-24 md:w-40" alt={name} />
      <p className="italic font-Oswald">-{name}-</p>
      <div className="flex gap-2 text-yellow-400 justify-center">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} />
        ))}
      </div>
      <p className="font-bold font-Oswald">"{title}"</p>
      <p className="text-sm md:text-base font-Rethink">{body}</p>
    </motion.div>
  );
};

export default Review;
