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
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Container for the iframe */}
        <div className="h-[300px] w-[420px]">
          <iframe
            src={video.url} // URL of the video
            width="420px" // Width of the iframe
            height="300px" // Height of the iframe
            title="My Iframe" // Title for the iframe
          />
        </div>
        {/* Container for video details */}
        <div className="flex flex-col gap-4 justify-center md:text-start p-2 font-Rethink">
          {/* Video title */}
          <p className="text-3xl text-baby-powder font-Oswald">{video.title}</p>
          {/* Channel name */}
          <p className="text-xl text-baby-powder">{video.channel}</p>
          {/* Video views and date */}
          <p className="text-xl text-baby-powder">
            {video.views} - {video.date}
          </p>
          {/* Video length */}
          <p className="text-xl text-baby-powder">Duration: {video.length}</p>
        </div>
      </div>
    </>
  );
};

export default Video; // Export the Video component for use in other parts of the application
