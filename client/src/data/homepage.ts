import MelbourneImage from "../assets/Melbourne.jpg";
import DenpasarImage from "../assets/Denpasar.jpg";
import GzImage from "../assets/Guangzhou.jpg";
import JapanImage from "../assets/Japan.jpg";
import headshot1 from "../assets/headshot1.jpg";
import headshot2 from "../assets/headshot2.jpg";
import headshot3 from "../assets/headshot4.jpg";

type itinerary = {
  countryName: string;
  desc: string;
  imgSrc: any;
  url: string;
};

export const itineraries: itinerary[] = [
  {
    countryName: "Melbourne",
    desc: "Melbourne, Australia's vibrant cultural capital, enchants visitors with its diverse arts scene, iconic laneways, world-class dining, and picturesque waterfronts.",
    imgSrc: MelbourneImage,
    url: "/explore?locationType=activities&country=Australia&state=Victoria&city=Melbourne",
  },
  {
    countryName: "Denpasar",
    desc: " Denpasar, the bustling capital of Bali, Indonesia, offers a rich blend of traditional Balinese culture, historic temples, vibrant markets, and stunning beaches.",
    imgSrc: DenpasarImage,
    url: "/explore?locationType=activities&country=Indonesia&state=Bali&city=Denpasar",
  },
  {
    countryName: "Tokyo",
    desc: "Tokyo offers a unique fusion of ancient traditions and cutting-edge modernity through their historic temples and bustling metropolis.",
    imgSrc: JapanImage,
    url: "/explore?locationType=activities&country=Japan&state=Tokyo&city=Tokyo",
  },
  {
    countryName: "Guangzhou",
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
    body: "Absolutely love this app! It is user-friendly, packed with features, and makes planning my trips a breeze. Highly recommend",
  },
  {
    imgSrc: headshot2,
    name: "Savannah James",
    title: "Made My Vacation Stress-Free!",
    body: "This travel app is a game changer! The interface is intuitive, and the real-time updates are incredibly helpful. 5 stars!",
  },
  {
    imgSrc: headshot3,
    name: "Austin Reaves",
    title: "A Must-Have for Every Traveler!",
    body: "Fantastic app for travelers! It has everything I need in one place and is super easy to navigate. Five stars for sure!",
  },
];
