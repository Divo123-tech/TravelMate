import { airportType } from "../../types/types";
import { useState } from "react";
import loading from "../../assets/loading.png";

type Props = {
  airport: airportType;
};

const Airport = ({ airport }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div className="bg-teal flex items-center gap-8 mr-auto w-full">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${airport.name}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>
        <div className="flex flex-col justify-start">
          <p className="text-white text-md md:text-lg">
            Location: {airport.city} , {airport.region}
          </p>
          <a className="text-white text-2xl md:text-3xl">{airport.name}</a>
        </div>
      </div>
    </>
  );
};

export default Airport;
