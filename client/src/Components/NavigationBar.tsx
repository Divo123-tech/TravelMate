import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, FC } from "react";
import { UserContext, PageContext } from "../App";
import { googleAuthenticate, logOutAPI } from "../services/users.service";
import logo from "../assets/logo.png";

// Define the NavigationBar component
const NavigationBar: FC = () => {
  // Get the current user context and page context
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);

  // Ensure that the component is used within the appropriate provider
  if (!userContext || !pageContext) {
    throw new Error("YourComponent must be used within a Provider");
  }

  // Destructure user and page context values
  const { user, setUser } = userContext;
  const { currentPage, setCurrentPage } = pageContext;

  // Define the style for the current page link
  const currentPageStyle = "bg-teal rounded-full px-4 text-white";

  // Function to handle user logout
  const logOut = async () => {
    try {
      // Call the logout API
      await logOutAPI();
      // Clear the user from context
      setUser(null);
    } catch (err) {
      // Handle errors (optional: you might want to add some error logging)
      return;
    }
  };

  return (
    <>
      {/* Navbar component from react-bootstrap */}
      <Navbar
        className="bg-baby-powder sticky top-0 z-50 text-white"
        expand="md"
      >
        <Container className="flex">
          {/* Brand logo with a link to the home page */}
          <Navbar.Brand href="#home">
            <img src={logo} className="w-20" alt="Logo" />
          </Navbar.Brand>
          {/* Toggle button for responsive navigation (collapses the navbar on small screens) */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Navbar collapse for displaying links in a collapsed menu on smaller screens */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {/* Navigation links */}
            <Nav className="text-black flex gap-3 text-lg">
              {/* Link to the Home page */}
              <Link to={"/"}>
                <Nav.Link
                  className={`${
                    currentPage === "Home" ? currentPageStyle : "text-black"
                  } font-Rethink rounded-full hover:font-bold`}
                  href="#home"
                  onClick={() => setCurrentPage("Home")}
                >
                  Home
                </Nav.Link>
              </Link>
              {/* Link to the Locations page */}
              <Link to={"/explore"}>
                <Nav.Link
                  className={`${
                    currentPage === "Locations"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full`}
                  onClick={() => setCurrentPage("Locations")}
                  href="#features"
                >
                  Locations
                </Nav.Link>
              </Link>
              {/* Link to the Explore page with a query for activities */}
              <Link to={"/explore?locationType=activities"}>
                <Nav.Link
                  className={`${
                    currentPage === "Explore"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full `}
                  onClick={() => setCurrentPage("Explore")}
                  href="#home"
                >
                  Explore
                </Nav.Link>
              </Link>
              {/* Link to the Flights page */}
              <Link to={"/flights"}>
                <Nav.Link
                  className={`${
                    currentPage === "Flights"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full `}
                  onClick={() => setCurrentPage("Flights")}
                  href="#home"
                >
                  Flights
                </Nav.Link>
              </Link>
              {/* Link to the Contact page */}
              <Link to={"/contact"}>
                <Nav.Link
                  className={`${
                    currentPage === "Contact"
                      ? currentPageStyle
                      : "text-black hover:font-bold"
                  } font-Rethink rounded-full `}
                  onClick={() => setCurrentPage("Contact")}
                  href="#features"
                >
                  Contact
                </Nav.Link>
              </Link>
              {/* Conditional link for login/signup if user is not logged in */}
              {user === null ? (
                <Nav.Link
                  className="text-black hover:font-bold font-Rethink"
                  href="#pricing"
                  onClick={googleAuthenticate}
                >
                  Login/Sign Up
                </Nav.Link>
              ) : (
                // Conditional link for profile if user is logged in
                <Nav.Link
                  className={`${
                    currentPage === "Profile"
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
              {/* Conditional link for logout if user is logged in */}
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
