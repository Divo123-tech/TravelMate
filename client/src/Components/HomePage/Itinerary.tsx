import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { childVariant } from "../../data/animation";
type Props = {
  countryName: string;
  imgSrc: string;
  desc: string;
  url: string;
};
const Itinerary = ({ countryName, imgSrc, desc, url }: Props) => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={childVariant}
      className="w-72  h-full flex flex-col items-center justify-between "
    >
      <Card className="bg-baby-powder hover:opacity-90">
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body className="text-center">
          <Card.Title className="text-4xl text-oxford-blue font-Oswald ">
            {countryName}
          </Card.Title>
          <Card.Text className="my-3 font-Rethink">{desc}</Card.Text>
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
