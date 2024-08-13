import { hotelType } from "../../types/types";
import { FC, useState } from "react";
import loading from "../../assets/loading.png";

type Props = {
  hotel: hotelType;
};

const Hotel: FC<Props> = ({ hotel }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div className="bg-teal flex items-center gap-8 mr-auto w-full">
        {!isImageLoaded && <img src={loading} alt="Loading..." />}
        <img
          src={`https://picsum.photos/seed/${hotel.id}/200/150`}
          onLoad={() => setIsImageLoaded(true)}
        ></img>
        <div className="flex flex-col justify-start">
          <p className="text-white text-md md:text-lg font-Rethink">
            Location: {hotel.city}
          </p>
          <a
            href={hotel.url}
            className="text-white text-2xl md:text-3xl font-Oswald"
          >
            {hotel.name}
          </a>
        </div>
      </div>
    </>
  );
};

export default Hotel;
