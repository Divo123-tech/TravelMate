import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = { userId: string | null };

const NavigationBar = ({ userId }: Props) => {
  return (
    <>
      <Navbar className="bg-baby-powder py-3" expand="md">
        <Container>
          <Navbar.Brand href="#home">TM Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="mr-0 text-black flex gap-4 text-lg">
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
              <Link to={"/profile"}>
                <Nav.Link
                  className="text-black  hover:font-bold"
                  href="#pricing"
                >
                  {userId == "" ? "Login/Signup" : "Profile"}
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
