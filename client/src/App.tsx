import { useState } from 'react'
import NavigationBar from "./Components/NavigationBar";
import UserProfile from "./Components/UserProfile";
import Countries from "./Components/Countries";
import Contact from "./Components/Contact";
import HomePage from "./Components/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("1234");
  const location = useLocation();
  return (
    <>
      <NavigationBar userId={userId} />
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
            <Route path={"/profile"} element={<UserProfile />} />
            <Route path={"/contact"} element={<Contact />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App
