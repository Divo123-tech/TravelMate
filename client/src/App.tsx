import { useState, createContext, useEffect } from "react";
import NavigationBar from "./Components/NavigationBar";
import UserProfile from "./Components/UserProfile";
import ExploreLocations from "./Components/ExploreLocations";
import Contact from "./Components/Contact";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import EditTrip from "./Components/EditTrip";
import Flights from "./Components/Flights";
import { Route, Routes, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { UserType } from "./types/types";
import { getCurrentUser } from "./services/apiService";
import io, { Socket } from "socket.io-client";
import {
  SocketContextType,
  UserContextType,
  PageContextType,
} from "./types/types";
import "./App.css";

export const UserContext = createContext<UserContextType | null>(null);
export const PageContext = createContext<PageContextType>({
  currentPage: "Home",
  setCurrentPage: () => {},
});
export const SocketContext = createContext<SocketContextType | null>(null);
function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("Home");

  useEffect(() => {
    const getUser = async () => {
      setUser(await getCurrentUser()); // Set user state with the fetched data
    };

    getUser(); // Call getUser when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    const newSocket: Socket = io("http://localhost:3000");
    setSocket(newSocket);
    socket?.on("connect", () => {
      console.log("Connected to server");
    });
    return () => {
      newSocket.close();
    };
  }, []);

  const emitEvent = (eventName: string, data: any) => {
    if (socket) socket.emit(eventName, data);
  };

  const location = useLocation();
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <SocketContext.Provider value={{ socket, emitEvent }}>
          <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            <div className="flex flex-col min-h-screen">
              <NavigationBar />
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  classNames="fade"
                  timeout={300}
                  unmountOnExit
                >
                  <Routes location={location}>
                    <Route path={"/"} element={<HomePage />}></Route>
                    <Route path={"/explore"} element={<ExploreLocations />} />
                    <Route path={"/flights"} element={<Flights />} />
                    <Route path={"/profile"} element={<UserProfile />} />
                    <Route path={"trip/:tripId"} element={<EditTrip />} />
                    <Route path={"/contact"} element={<Contact />} />
                  </Routes>
                </CSSTransition>
              </SwitchTransition>
              <Footer />
            </div>
          </PageContext.Provider>
        </SocketContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
