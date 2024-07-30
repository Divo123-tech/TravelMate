import { videoType } from "../../types/types";

type Props = {
  video: videoType;
};

const Video = ({ video }: Props) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="h-[300px] w-[420px]">
          <iframe
            src={video.url}
            width="420px"
            height="300px"
            title="My Iframe"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center md:text-start p-2">
          <p className="text-3xl text-baby-powder">{video.title}</p>
          <p className="text-xl text-baby-powder">{video.channel}</p>
          <p className="text-xl text-baby-powder">
            {video.views} - {video.date}
          </p>
          <p className="text-xl text-baby-powder">Duration: {video.length}</p>
        </div>
      </div>
    </>
  );
};

export default Video;
