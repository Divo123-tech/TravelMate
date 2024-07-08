import { motion } from "framer-motion";
import Itinerary from "./HomePageComponents/Itinerary";
import ItalyImage from "../assets/Italy.jpg";
import BrazilImage from "../assets/Brazil.jpg";
import IndiaImage from "../assets/India.jpg";
import JapanImage from "../assets/Japan.jpg";
import headshot1 from "../assets/headshot1.jpg";
import headshot2 from "../assets/headshot3.webp";
import headshot3 from "../assets/headshot4.jpg";
import Review from "./HomePageComponents/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
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

const reviews = [
  {
    imgSrc: headshot1,
    name: "Anthony Davis",
    title: "Fantastic Travel Companion!",
    body: "I absolutely love using this travel app! It has everything I need to plan my trips seamlessly, from booking flights and hotels to finding local attractions and restaurants. The user interface is intuitive and easy to navigate, and the real-time updates and alerts have been invaluable. It even allows me to keep all my travel documents organized in one place. Highly recommend it to any traveler!",
  },
  {
    imgSrc: headshot2,
    name: "LeBron James",
    title: "Made My Vacation Stress-Free!",
    body: "This app is a game-changer for travel planning. It took all the hassle out of organizing my recent vacation. I could easily compare prices for flights and accommodations, read reviews, and even book activities in advance. The offline mode was super handy when I didn't have internet access, and the personalized recommendations helped me discover some hidden gems. Will definitely use it for all my future trips!",
  },
  {
    imgSrc: headshot3,
    name: "Austin Reaves",
    title: "A Must-Have for Every Traveler!",
    body: "This travel app has been my go-to tool for all my travels. The detailed itineraries and maps ensured I never missed a landmark, and the currency converter and language translator features were lifesavers abroad. I particularly appreciate the social aspect, where I could connect with other travelers and share tips. It's like having a personal travel assistant right in my pocket. Five stars all the way!",
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
      <section className="bg-baby-powder py-8 mt-24 px-20 ">
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="text-center">
            <h1 className="text-oxford-blue text-5xl font-bold">
              WHAT OUR TRAVELLERS ARE SAYING
            </h1>
          </div>
        </motion.div>
        <motion.div
          className="flex justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {reviews.map((review) => {
            return (
              <Review
                imgSrc={review.imgSrc}
                name={review.name}
                title={review.title}
                body={review.body}
              />
            );
          })}
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;
