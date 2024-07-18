import { useState } from "react";
import NavigationBar from "./Components/NavigationBar";
import UserProfile from "./Components/UserProfile";
import Countries from "./Components/Countries";
import Contact from "./Components/Contact";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import EditTrip from "./Components/EditTrip";
import { Route, Routes, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  return (
    <>
      <NavigationBar user={user} />
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <Routes location={location}>
            <Route path={"/"} element={<HomePage />}></Route>
            <Route path={"/explore/countries"} element={<Countries />} />
            <Route
              path={"/profile"}
              element={<UserProfile setUser={setUser} user={user} />}
            />
            <Route path={"/contact"} element={<Contact />} />
            <Route path={"/trip"} element={<EditTrip />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
      <Footer />
    </>
  );
}

export default App;
