import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, FC } from "react";
import { UserContext, PageContext } from "../App";
import { googleAuthenticate, logOutAPI } from "../services/users.service";
import logo from "../assets/logo.png";
const NavigationBar: FC = () => {
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);
  if (!userContext || !pageContext) {
    throw new Error("YourComponent must be used within a Provider");
  }

  const { user, setUser } = userContext;
  const { currentPage, setCurrentPage } = pageContext;
  const currentPageStyle = "bg-teal rounded-full px-4 text-white";
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
        className="bg-baby-powder sticky top-0 z-50 text-white"
        expand="md"
      >
        <Container className="flex">
          <Navbar.Brand href="#home">
            <img src={logo} className="w-20"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="text-black flex gap-3 text-lg">
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
                  className="text-black hover:font-bold font-Rethink"
                  href="#pricing"
                  onClick={googleAuthenticate}
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
                  className="text-black hover:font-bold font-Rethink"
                  onClick={logOut}
                >
                  <Link to={"/"}> Log Out</Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
