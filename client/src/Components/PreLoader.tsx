import { FC, useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../assets/LoadingAnimation.json";

// Define the type for the component's props
interface PreloaderProps {
  onLoaded: () => void; // Callback function to be called when the animation completes
}

// Functional component for displaying a preloader animation
const Preloader: FC<PreloaderProps> = ({ onLoaded }) => {
  // State to track if the animation has completed
  const [animationComplete, setAnimationComplete] = useState(false);

  // Reference to the Lottie animation instance
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Effect to call the onLoaded callback when the animation completes
  useEffect(() => {
    if (animationComplete) {
      onLoaded(); // Call the callback passed as a prop
    }
  }, [animationComplete, onLoaded]);

  // Handler function for when the animation completes
  const handleAnimationComplete = () => {
    setAnimationComplete(true); // Update state to indicate animation is complete
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Container for the Lottie animation */}
      <div className="w-64 h-64">
        {/* Lottie component for rendering the animation */}
        <Lottie
          animationData={animationData} // Animation data imported from JSON file
          loop={false} // Do not loop the animation
          lottieRef={lottieRef} // Reference to the Lottie animation instance
          onComplete={handleAnimationComplete} // Callback when the animation completes
        />
      </div>
    </div>
  );
};

export default Preloader;
