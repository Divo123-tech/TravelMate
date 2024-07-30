import { attractionType } from "../../types/types";
import { useState } from "react";
import loading from "../../assets/loading.png";

type Props = {
  restaurant: attractionType;
};

const Restaurant = ({ restaurant }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div className="bg-teal flex items-center gap-8 mr-auto w-full">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${restaurant.id}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>
        <div className="flex flex-col justify-start">
          <p className="text-white text-md md:text-lg">
            {restaurant.city} , {restaurant.country}
          </p>
          <a href={restaurant.url} className="text-white text-2xl md:text-3xl">
            {restaurant.name}
          </a>
          <p className="text-white text-md md:text-lg">
            @ {restaurant.address}
          </p>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
