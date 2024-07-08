import { motion } from "framer-motion";
import Itinerary from "./HomePageComponents/Itinerary";
import ItalyImage from "../assets/Italy.jpg";
import BrazilImage from "../assets/Brazil.jpg";
import IndiaImage from "../assets/India.jpg";
import JapanImage from "../assets/Japan.jpg";

const itineraries = [
  {
    countryName: "ITALY",
    desc: "Italy, with its rich historical landmarks, like the Colosseum in Rome, offers a captivating blend of ancient culture and breathtaking landscapes.",
    imgSrc: ItalyImage,
  },
  {
    countryName: "INDIA",
    desc: " India enchants tourists with its diverse cultural heritage, from the beautifully iconic Taj Mahal to the vibrant streets of Delhi and Mumbai.",
    imgSrc: IndiaImage,
  },
  {
    countryName: "JAPAN",
    desc: "Japan offers a unique fusion of ancient traditions and cutting-edge modernity like the historic temples of Kyoto and the metropolis of Tokyo.",
    imgSrc: JapanImage,
  },
  {
    countryName: "BRAZIL",
    desc: " Brazil captivates visitors with its lively festivals, such as Rio de Janeiro's Carnival, and natural wonders like the Amazon Rainforest.",
    imgSrc: BrazilImage,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const HomePage = () => {
  return (
    <>
      <motion.div
        className="bg-baby-powder w-48 text-center my-10 p-1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        variants={{
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <p className="text-lg font-medium">TOP ITINERARIES</p>
      </motion.div>
      <motion.div
        className="justify-center px-6 flex md:justify-between flex-wrap gap-8 "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={container}
      >
        {itineraries.map((itinerary: any) => {
          return (
            <Itinerary
              countryName={itinerary.countryName}
              desc={itinerary.desc}
              imgSrc={itinerary.imgSrc}
            />
          );
        })}
      </motion.div>
      <h1>Home Page!</h1>
    </>
  );
};

export default HomePage;
