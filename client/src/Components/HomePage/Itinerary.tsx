import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { childVariant } from "../../data/animation";
import { FC } from "react";

// Define the props type for the Itinerary component
type Props = {
  countryName: string; // Name of the country
  imgSrc: string; // URL of the image
  desc: string; // Description of the itinerary
  url: string; // URL to navigate to when clicking the button
};

// Functional component for displaying an itinerary
const Itinerary: FC<Props> = ({ countryName, imgSrc, desc, url }: Props) => {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  return (
    <motion.div
      // Motion div to apply animation variants
      variants={childVariant}
      className="w-72 h-full flex flex-col items-center justify-between"
    >
      <Card className="bg-baby-powder hover:opacity-90">
        {/* Display the image at the top of the card */}
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body className="text-center">
          {/* Display the country name in a title */}
          <Card.Title className="text-4xl text-oxford-blue font-Oswald">
            {countryName}
          </Card.Title>
          {/* Display the description of the itinerary */}
          <Card.Text className="my-3 font-Rethink">{desc}</Card.Text>
          {/* Button to navigate to the URL */}
          <Button
            className="px-16 bg-teal border-none font-Rethink"
            onClick={() => navigate(url)}
          >
            Explore!
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default Itinerary;
