import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { childVariant } from "../../data/animation";
import { FC } from "react";

// Define the props type for the Review component
type Props = {
  imgSrc: string; // URL of the reviewer's profile image
  name: string; // Name of the reviewer
  title: string; // Title or headline of the review
  body: string; // Main content of the review
};

// Functional component for displaying a review
const Review: FC<Props> = ({ imgSrc, name, title, body }: Props) => {
  return (
    <motion.div
      // Apply animation variants to the container div
      className="review w-full md:w-1/4 lg:w-1/4 flex flex-col items-center text-justify px-4 md:px-10 gap-4 dark:text-alice-blue"
      variants={childVariant}
    >
      {/* Display the reviewer's profile image */}
      <img src={imgSrc} className="rounded-full w-24 md:w-40" alt={name} />
      {/* Display the reviewer's name in italics */}
      <p className="italic font-Raleway">-{name}-</p>
      {/* Display a row of stars to indicate rating */}
      <div className="flex gap-2 text-yellow-400 justify-center">
        {/* Generate 5 star icons */}
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} />
        ))}
      </div>
      {/* Display the review title in bold */}
      <p className="font-bold font-Raleway">"{title}"</p>
      {/* Display the body of the review */}
      <p className="text-sm md:text-base font-Rethink">{body}</p>
    </motion.div>
  );
};

export default Review;
