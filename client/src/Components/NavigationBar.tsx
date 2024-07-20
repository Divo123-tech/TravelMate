import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, FC } from "react";
import { UserContext } from "../App";

const NavigationBar: FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user } = context;
  const googleAuth = () => {
    window.open(`http://localhost:3000/auth/google/`, "_self");
  };
  return (
    <>
      <Navbar className="bg-baby-powder py-3 sticky top-0 z-50" expand="md">
        <Container className="flex justify-between">
          <Navbar.Brand href="#home">TM Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="text-black flex gap-4 text-lg">
              <Link to={"/"}>
                <Nav.Link className="text-black hover:font-bold" href="#home">
                  Home
                </Nav.Link>
              </Link>
              <Link to={"/explore/countries"}>
                <Nav.Link
                  className="text-black  hover:font-bold"
                  href="#features"
                >
                  Explore
                </Nav.Link>
              </Link>
              <Link to={"/contact"}>
                <Nav.Link
                  className="text-black  hover:font-bold"
                  href="#features"
                >
                  Contact
                </Nav.Link>
              </Link>
              {user == null ? (
                <Nav.Link
                  className="text-black  hover:font-bold"
                  href="#pricing"
                  onClick={
                    user
                      ? () => {
                          return;
                        }
                      : googleAuth
                  }
                >
                  Login/Sign Up
                </Nav.Link>
              ) : (
                <Link to={"/profile"}>
                  <Nav.Link
                    className="text-black  hover:font-bold"
                    href="#pricing"
                    onClick={
                      user
                        ? () => {
                            return;
                          }
                        : googleAuth
                    }
                  >
                    Profile
                  </Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
