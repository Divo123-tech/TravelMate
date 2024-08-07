import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, FC } from "react";
import { UserContext } from "../App";
import { googleAuthenticate, logOutAPI } from "../services/apiService";
import logo from "../assets/logo.png";
const NavigationBar: FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user, setUser } = context;

  const logOut = async () => {
    try {
      await logOutAPI();
      setUser(null);
    } catch (err) {}
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
                  className="text-black hover:font-bold font-Rethink"
                  href="#home"
                >
                  Home
                </Nav.Link>
              </Link>
              <Link to={"/explore"}>
                <Nav.Link
                  className="text-black hover:font-bold font-Rethink"
                  href="#features"
                >
                  Locations
                </Nav.Link>
              </Link>
              <Link to={"/explore?locationType=activities"}>
                <Nav.Link
                  className="text-black hover:font-bold font-Rethink"
                  href="#home"
                >
                  Explore
                </Nav.Link>
              </Link>
              <Link to={"/flights"}>
                <Nav.Link
                  className="text-black hover:font-bold font-Rethink"
                  href="#home"
                >
                  Flights
                </Nav.Link>
              </Link>
              <Link to={"/contact"}>
                <Nav.Link
                  className="text-black hover:font-bold font-Rethink"
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
                <Nav.Link className="text-black hover:font-bold font-Rethink">
                  <Link to={"/profile"}>Profile</Link>
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
