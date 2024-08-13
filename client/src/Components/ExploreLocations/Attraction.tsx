import { attractionType } from "../../types/types";
import { FC, useState } from "react";
import loading from "../../assets/loading.png";

type Props = {
  attraction: attractionType;
};

const Attraction: FC<Props> = ({ attraction }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div className="bg-teal flex items-center gap-8 mr-auto w-full">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${attraction.name}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>
        <div className="flex flex-col justify-start">
          <p className="text-white text-md md:text-lg font-Rethink">
            {attraction.city} , {attraction.country}
          </p>
          <a
            href={attraction.url}
            className="text-white text-2xl md:text-3xl font-Oswald"
          >
            {attraction.name}
          </a>
          <p className="text-white text-md md:text-lg font-Rethink">
            @ {attraction.address}
          </p>
        </div>
      </div>
    </>
  );
};

export default Attraction;
