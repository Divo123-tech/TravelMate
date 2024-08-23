import { FC } from "react"; // Importing React's FC (Functional Component) type
import { videoType } from "../../types/types"; // Importing the videoType type for TypeScript typing

// Define the Props type for the Video component
type Props = {
  video: videoType; // Video object with type videoType
};

// Define the Video component as a functional component (FC)
const Video: FC<Props> = ({ video }: Props) => {
  return (
    <>
      {/* Container for video and details */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-oxford-blue dark:text-white">
        {/* Container for the iframe */}
        <div className="w-full md:w-auto">
          <iframe
            src={video.url}
            className="w-full max-w-[640px] h-[56.25vw] max-h-[300px]"
            title={video.title}
            allowFullScreen
          />
        </div>
        {/* Container for video details */}
        <div className="flex flex-col gap-4 justify-center text-center md:text-start p-2 font-Rethink w-full md:w-auto md:max-w-[400px]">
          {/* Video title */}
          <p className="text-xl md:text-2xl lg:text-3xl font-Raleway">
            {video.title}
          </p>
          {/* Channel name */}
          <p className="text-base md:text-lg lg:text-xl">{video.channel}</p>
          {/* Video views and date */}
          <p className="text-base md:text-lg lg:text-xl">
            {video.views} - {video.date}
          </p>
          {/* Video length */}
          <p className="text-base md:text-lg lg:text-xl">
            Duration: {video.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default Video; // Export the Video component for use in other parts of the application
