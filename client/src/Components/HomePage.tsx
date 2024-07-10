import { motion } from "framer-motion";
import Itinerary from "./HomePageComponents/Itinerary";
import Review from "./HomePageComponents/Review";
import CarouselComponent from "./HomePageComponents/Carousel";
import { itineraries, reviews } from "../data/homepage";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const HomePage = () => {
  return (
    <>
      <CarouselComponent />

      {/* Itineraries  */}
      <section className="mt-24">
        <motion.div
          className="bg-baby-powder w-48 text-center my-10 p-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -75 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <p className="text-lg font-medium">TOP ITINERARIES</p>
        </motion.div>
        <motion.div
          className="justify-center px-6 flex md:justify-between flex-wrap gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1 }}
          variants={container}
        >
          {itineraries.map((itinerary: any, index: number) => (
            <Itinerary
              key={index}
              countryName={itinerary.countryName}
              desc={itinerary.desc}
              imgSrc={itinerary.imgSrc}
            />
          ))}
        </motion.div>
      </section>
      {/* Reviews */}
      <section className="bg-baby-powder py-8 mt-24 px-20 pb-12 ">
        <motion.div
          className="mb-24"
          initial="hidden"
          animate="visible"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { duration: 1 } },
          }}
        >
          <div className="text-center">
            <h1 className="text-oxford-blue text-5xl font-bold">
              WHAT OUR TRAVELLERS ARE SAYING
            </h1>
          </div>
        </motion.div>
        <motion.div
          className="px-6 flex flex-wrap justify-between gap-4 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          {reviews.map((review, index) => {
            return (
              <Review
                key={index}
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
