import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import NavigationBar from "./Components/NavigationBar";
import UserProfile from "./Components/UserProfile";
import ExploreLocations from "./Components/ExploreLocations";
import Contact from "./Components/Contact";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import EditTrip from "./Components/EditTrip";
import { Route, Routes, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { UserType } from "./types/types";
import { getUserDetails } from "./services/apiService";
import "./App.css";

export const UserContext = createContext<UserContextType | null>(null);
type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};
function App() {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        setUser(await getUserDetails()); // Set user state with the fetched data
      } catch (err) {
        console.log(err);
      }
    };

    getUser(); // Call getUser when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount
  const location = useLocation();
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
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
                <Route path={"/profile"} element={<UserProfile />} />
                <Route path={"trip/:tripId"} element={<EditTrip />} />
                <Route path={"/contact"} element={<Contact />} />
              </Routes>
            </CSSTransition>
          </SwitchTransition>
          <Footer />
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
