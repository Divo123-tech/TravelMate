import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, FC } from "react";
import { UserContext } from "../App";
import { googleAuthenticate, logOutAPI } from "../services/apiService";
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
        className="bg-baby-powder py-3 sticky top-0 z-50 text-white"
        expand="md"
      >
        <Container className="flex justify-between">
          <Navbar.Brand href="#home">TM Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="text-black flex gap-3 text-lg">
              <Link to={"/"}>
                <Nav.Link className="text-black hover:font-bold" href="#home">
                  Home
                </Nav.Link>
              </Link>
              <Link to={"/explore"}>
                <Nav.Link
                  className="text-black hover:font-bold"
                  href="#features"
                >
                  Locations
                </Nav.Link>
              </Link>
              <Link to={"/explore?locationType=activities"}>
                <Nav.Link className="text-black hover:font-bold" href="#home">
                  Explore
                </Nav.Link>
              </Link>
              <Link to={"/flights"}>
                <Nav.Link className="text-black hover:font-bold" href="#home">
                  Flights
                </Nav.Link>
              </Link>
              <Link to={"/contact"}>
                <Nav.Link
                  className="text-black hover:font-bold"
                  href="#features"
                >
                  Contact
                </Nav.Link>
              </Link>
              {user == null ? (
                <Nav.Link
                  className="text-black hover:font-bold"
                  href="#pricing"
                  onClick={googleAuthenticate}
                >
                  Login/Sign Up
                </Nav.Link>
              ) : (
                <Nav.Link className="text-black hover:font-bold">
                  <Link to={"/profile"}>Profile</Link>
                </Nav.Link>
              )}
              {user && (
                <Nav.Link
                  className="text-black hover:font-bold"
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
