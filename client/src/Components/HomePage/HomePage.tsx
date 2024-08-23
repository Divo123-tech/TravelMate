import { motion } from "framer-motion";
import Itinerary from "./Itinerary";
import Review from "./Review";
import CarouselComponent from "./Carousel";
import { itineraries, reviews } from "../../data/homepage";
import { ItineraryType, ReviewType } from "../../types/types";
import { FC, useContext, useEffect } from "react";
import { PageContext } from "../../App";
import { container, rightSlideVariant } from "../../data/animation";

const HomePage: FC = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { setCurrentPage } = pageContext;
  useEffect(() => {
    setCurrentPage("Home");
  }, []);
  return (
    <>
      <div id="home"></div>
      <CarouselComponent />

      {/* Itineraries  */}
      <section className=" pb-24">
        <motion.div
          className="w-full text-center my-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={rightSlideVariant}
        >
          <p className="text-oxford-blue dark:text-white text-4xl font-medium font-Raleway whitespace-nowrap">
            TOP DESTINATIONS
          </p>
        </motion.div>
        <motion.div
          className="justify-center px-6 flex md:justify-between flex-wrap gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1 }}
          variants={container}
        >
          {itineraries.map((itinerary: ItineraryType, index: number) => (
            <Itinerary key={index} {...itinerary} />
          ))}
        </motion.div>
      </section>
      {/* Reviews */}
      <section className="bg-alice-blue dark:bg-black dark:bg-opacity-90 py-8 px-20 pb-12 ">
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
            <h1 className="text-oxford-blue text-3xl md:text-5xl dark:text-alice-blue font-bold font-Playfair">
              Hear From Our Travellers
            </h1>
          </div>
        </motion.div>
        <motion.div
          className="px-2 md:px-6 flex flex-wrap justify-between gap-4 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          {reviews.map((review: ReviewType, index: number) => {
            return <Review key={index} {...review} />;
          })}
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;
