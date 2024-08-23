import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, FC, useState, useEffect } from "react";
import { UserContext, PageContext } from "../App";
import { googleAuthenticate, logOutAPI } from "../services/users.service";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import AuthModal from "./AuthModal";
const NavigationBar: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference in local storage or default to false
    const savedMode = localStorage.getItem("darkMode");
    setIsDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
    localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);
  if (!userContext || !pageContext) {
    throw new Error("YourComponent must be used within a Provider");
  }

  const { user, setUser } = userContext;
  const { currentPage, setCurrentPage } = pageContext;
  const currentPageStyle = "bg-oxford-blue rounded-full px-4 text-white";
  const logOut = async () => {
    try {
      await logOutAPI();
      setUser(null);
    } catch (err) {
      return;
    }
  };
  return (
    <>
      <Navbar
        className="bg-alice-blue sticky top-0 z-50 text-white"
        expand="lg"
      >
        <Container className="flex">
          <img src={logo} className="w-[150px]" />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="text-black flex gap-3 text-md md:text-lg items-center ">
              <Link to={"/"}>
                <Nav.Link
                  className={`${
                    currentPage == "Home" ? currentPageStyle : "text-black"
                  } font-Rethink rounded-full hover:font-bold`}
                  href="#home"
                  onClick={() => setCurrentPage("Home")}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link to={"/explore"}>
                <Nav.Link
                  className={`${
                    currentPage == "Locations"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full`}
                  onClick={() => setCurrentPage("Locations")}
                  href="#features"
                >
                  Locations
                </Nav.Link>
              </Link>
              <Link to={"/explore?locationType=activities"}>
                <Nav.Link
                  className={`${
                    currentPage == "Explore"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full `}
                  onClick={() => setCurrentPage("Explore")}
                  href="#home"
                >
                  Explore
                </Nav.Link>
              </Link>
              <Link to={"/flights"}>
                <Nav.Link
                  className={`${
                    currentPage == "Flights"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full `}
                  onClick={() => setCurrentPage("Flights")}
                  href="#home"
                >
                  Flights
                </Nav.Link>
              </Link>
              <Link to={"/contact"}>
                <Nav.Link
                  className={`${
                    currentPage == "Contact"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full `}
                  onClick={() => setCurrentPage("Contact")}
                  href="#features"
                >
                  Contact
                </Nav.Link>
              </Link>
              {user == null ? (
                <Nav.Link
                  className="text-black hover:font-bold font-Rethink whitespace-nowrap"
                  href="#pricing"
                  onClick={() => setModalShow(true)}
                >
                  Login/Sign Up
                </Nav.Link>
              ) : (
                <Nav.Link
                  className={`${
                    currentPage == "Profile"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full `}
                >
                  <Link
                    to={"/profile"}
                    onClick={() => setCurrentPage("Profile")}
                  >
                    Profile
                  </Link>
                </Nav.Link>
              )}
              {user && (
                <Nav.Link
                  className="text-black hover:font-bold font-Rethink whitespace-nowrap"
                  onClick={logOut}
                >
                  <Link to={"/"}> Log Out</Link>
                </Nav.Link>
              )}
              <Nav.Link
                onClick={toggleDarkMode}
                className="material-icons cursor-pointer  "
              >
                <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default NavigationBar;
