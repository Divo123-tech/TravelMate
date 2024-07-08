import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { motion } from "framer-motion";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  countryName: string;
  imgSrc: string;
  desc: string;
};
const Itinerary = ({ countryName, imgSrc, desc }: Props) => {
  return (
    <motion.div variants={childVariant}>
      <Card className="w-72 bg-baby-powder hover:opacity-90 h-full flex flex-col items-center justify-between ">
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body className="text-center">
          <Card.Title className="text-4xl text-oxford-blue ">
            {countryName}
          </Card.Title>
          <Card.Text className="my-3 ">{desc}</Card.Text>
          <Button className="px-16 bg-teal border-none ">Explore!</Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default Itinerary;
