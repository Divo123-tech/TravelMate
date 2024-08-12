import { useState, createContext, useEffect } from "react"; // Importing necessary hooks and functions from React
import NavigationBar from "./Components/NavigationBar"; // Importing NavigationBar component
import UserProfile from "./Components/UserProfile"; // Importing UserProfile component
import ExploreLocations from "./Components/ExploreLocations"; // Importing ExploreLocations component
import Contact from "./Components/Contact"; // Importing Contact component
import HomePage from "./Components/HomePage"; // Importing HomePage component
import Footer from "./Components/Footer"; // Importing Footer component
import EditTrip from "./Components/EditTrip"; // Importing EditTrip component
import Flights from "./Components/Flights"; // Importing Flights component
import { Route, Routes, useLocation } from "react-router-dom"; // Importing routing utilities from react-router-dom
import { SwitchTransition, CSSTransition } from "react-transition-group"; // Importing transition components for page animations
import { UserType } from "./types/types"; // Importing UserType definition from types
import { getCurrentUser } from "./services/users.service"; // Importing service to get current user data
import io, { Socket } from "socket.io-client"; // Importing socket.io-client for real-time communication
import {
  SocketContextType,
  UserContextType,
  PageContextType,
} from "./types/types"; // Importing context type definitions
import "./App.css"; // Importing global CSS for the app
import Preloader from "./Components/PreLoader"; // Importing Preloader component

// Creating contexts to manage state across the application
export const UserContext = createContext<UserContextType | null>(null);
export const PageContext = createContext<PageContextType>({
  currentPage: "Home",
  setCurrentPage: () => {},
});
export const SocketContext = createContext<SocketContextType | null>(null);

function App() {
  // State hooks to manage user, socket, current page, loading state, and animation state
  const [user, setUser] = useState<UserType | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  // useEffect to fetch and set the current user when the app loads
  useEffect(() => {
    const getUser = async () => {
      setUser(await getCurrentUser()); // Fetching the current user
      setLoading(false); // Disabling the loading state once user data is fetched
    };

    getUser(); // Calling the getUser function
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // useEffect to initialize socket connection when the app loads
  useEffect(() => {
    const newSocket: Socket = io("http://localhost:3000"); // Creating a new socket connection to the server
    setSocket(newSocket); // Storing the socket instance in the state
    return () => {
      newSocket.close(); // Cleaning up by closing the socket connection when the component unmounts
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to emit events via the socket
  const emitEvent = (eventName: string, data: any) => {
    if (socket) socket.emit(eventName, data); // Emitting an event with a name and data if the socket is available
  };

  // Hook to get the current location, which is used for page transitions
  const location = useLocation();

  // Function to handle when the preloader animation is complete
  const handlePreloaderComplete = () => {
    setAnimationComplete(true); // Marking the animation as complete
  };

  // If the app is still loading or the preloader animation hasn't completed, show the Preloader component
  if (loading || !animationComplete) {
    return <Preloader onLoaded={handlePreloaderComplete} />;
  }

  // Main return block: providing context values and rendering the application structure
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <SocketContext.Provider value={{ socket, emitEvent }}>
          <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            <div className="flex flex-col min-h-screen">
              <NavigationBar /> {/* Navigation bar at the top of the page */}
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname} // Keying the transition by the current pathname
                  classNames="fade" // Classname for applying CSS transitions
                  timeout={300} // Timeout for the transition duration
                  unmountOnExit // Unmounting the component when it's no longer active
                >
                  <Routes location={location}>
                    {/* Defining routes for the app */}
                    <Route path={"/"} element={<HomePage />}></Route>
                    <Route path={"/explore"} element={<ExploreLocations />} />
                    <Route path={"/flights"} element={<Flights />} />
                    <Route path={"/profile"} element={<UserProfile />} />
                    <Route path={"trip/:tripId"} element={<EditTrip />} />
                    <Route path={"/contact"} element={<Contact />} />
                  </Routes>
                </CSSTransition>
              </SwitchTransition>
              <Footer /> {/* Footer component at the bottom of the page */}
            </div>
          </PageContext.Provider>
        </SocketContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App; // Exporting the App component as the default export
