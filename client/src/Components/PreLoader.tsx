import { FC, useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../assets/LoadingAnimation.json";

interface PreloaderProps {
  onLoaded: () => void;
}

const Preloader: FC<PreloaderProps> = ({ onLoaded }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (animationComplete) {
      onLoaded();
    }
  }, [animationComplete, onLoaded]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-64 h-64">
        <Lottie
          animationData={animationData}
          loop={false}
          lottieRef={lottieRef}
          onComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
};

export default Preloader;
