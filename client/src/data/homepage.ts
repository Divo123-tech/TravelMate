import MelbourneImage from "../assets/Melbourne.jpg";
import DenpasarImage from "../assets/Denpasar.jpg";
import GzImage from "../assets/Guangzhou.jpg";
import JapanImage from "../assets/Japan.jpg";
import headshot1 from "../assets/headshot1.jpg";
import headshot2 from "../assets/headshot3.webp";
import headshot3 from "../assets/headshot4.jpg";

type itinerary = {
  countryName: string;
  desc: string;
  imgSrc: any;
  url: string;
};

export const itineraries: itinerary[] = [
  {
    countryName: "MELBOURNE",
    desc: "Melbourne, Australia's vibrant cultural capital, enchants visitors with its diverse arts scene, iconic laneways, world-class dining, and picturesque waterfronts.",
    imgSrc: MelbourneImage,
    url: "/explore?locationType=activities&country=Australia&state=Victoria&city=Melbourne",
  },
  {
    countryName: "DENPASAR",
    desc: " Denpasar, the bustling capital of Bali, Indonesia, offers a rich blend of traditional Balinese culture, historic temples, vibrant markets, and stunning beaches.",
    imgSrc: DenpasarImage,
    url: "/explore?locationType=activities&country=Indonesia&state=Bali&city=Denpasar",
  },
  {
    countryName: "TOKYO",
    desc: "Tokyo offers a unique fusion of ancient traditions and cutting-edge modernity through their historic temples and bustling metropolis.",
    imgSrc: JapanImage,
    url: "/explore?locationType=activities&country=Japan&state=Tokyo&city=Tokyo",
  },
  {
    countryName: "GUANGZHOU",
    desc: " Guangzhou, a sprawling metropolis in southern China, captivates travelers with its rich history, modern architecture, and the beauty of the Pearl River.",
    imgSrc: GzImage,
    url: "/explore?locationType=activities&country=China&state=Guangdong&city=Guangzhou",
  },
];

type review = {
  imgSrc: any;
  name: string;
  title: string;
  body: string;
};
export const reviews: review[] = [
  {
    imgSrc: headshot1,
    name: "Anthony Davis",
    title: "Fantastic Travel Companion!",
    body: "I absolutely love using this travel app! It has everything I need to plan my trips seamlessly, from booking flights and hotels to finding local attractions and restaurants. The user interface is intuitive and easy to navigate, and the real-time updates and alerts have been invaluable. It even allows me to keep all my travel documents organized in one place. Highly recommend it to any traveler!",
  },
  {
    imgSrc: headshot2,
    name: "LeBron James",
    title: "Made My Vacation Stress-Free!",
    body: "This app is a game-changer for travel planning. It took all the hassle out of organizing my recent vacation. I could easily compare prices for flights and accommodations, read reviews, and even book activities in advance. The offline mode was super handy when I didn't have internet access, and the personalized recommendations helped me discover some hidden gems. Will definitely use it for all my future trips!",
  },
  {
    imgSrc: headshot3,
    name: "Austin Reaves",
    title: "A Must-Have for Every Traveler!",
    body: "This travel app has been my go-to tool for all my travels. The detailed itineraries and maps ensured I never missed a landmark, and the currency converter and language translator features were lifesavers abroad. I particularly appreciate the social aspect, where I could connect with other travelers and share tips. It's like having a personal travel assistant right in my pocket. Five stars all the way!",
  },
];
