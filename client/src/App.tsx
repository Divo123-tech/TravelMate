import { useState } from 'react'
import NavigationBar from "./Components/NavigationBar";
import UserProfile from "./Components/UserProfile";
import Countries from "./Components/Countries";
import Contact from "./Components/Contact";
import HomePage from "./Components/HomePage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("1234");
  return (
    <>
      <NavigationBar userId={userId} />
      <main>
        <Routes>
          <Route path={"/"} element={<HomePage />}></Route>
          <Route path={"/explore/countries"} element={<Countries />} />
          <Route path={"/profile"} element={<UserProfile />} />
          <Route path={"/contact"} element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App
