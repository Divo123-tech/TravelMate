import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components for modal
import { FC, useContext, useEffect, useState } from "react"; // Import React's FC type and useState hook
import { TripType, UserType } from "../../types/types"; // Import types for trips and users
import {
  searchUserDetails, // Function to search for a user
} from "../../services/users.service"; // Import service functions for user operations
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import {
  faTrashCan, // Trash can icon for deleting
  faMagnifyingGlass,
  faCheck,
  faPlus, // Magnifying glass icon for searching
} from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../../App";

// Define the Props type for the CollaboratorsModal component
type Props = {
  show: boolean; // Whether the modal is visible
  onHide: () => void; // Function to hide the modal
  collaborators: any[]; // Array of collaborators
  tripId: string; // ID of the trip
  userId: string; // ID of the current user
  setTrip: (trip: TripType | null) => void; // Function to set the trip
  isOwner: boolean; // Whether the current user is the owner
};

// Define the CollaboratorsModal component as a functional component (FC)
const CollaboratorsModal: FC<Props> = ({
  show,
  onHide,
  collaborators,
  tripId,
  setTrip,
  isOwner,
}: Props) => {
  // State for managing the mode (list or add)
  const [mode, setMode] = useState("list");
  // State for managing the search input
  const [inputSearch, setInputSearch] = useState("");
  // State for storing the found user
  const [userFound, setUserFound] = useState<UserType | null>(null);
  // State for controlling the visibility of the found user
  const [userShow, setUserShow] = useState(false);
  // Style for the current mode
  const currentModeStyle = "text-oxford-blue underline underline-offset-4";
  const [successfullyAdded, setSuccessfullyAdded] = useState<boolean>(false); // State to track if itineraries have been successfully added
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { socket, emitEvent } = socketContext;
  useEffect(() => {
    if (successfullyAdded) {
      // Set a timer to reset the successfullyAdded state after 750ms
      const timer = setTimeout(() => {
        setSuccessfullyAdded(false);
      }, 750);

      // Cleanup function to clear the timer if the component unmounts or successfullyAdded changes
      return () => clearTimeout(timer);
    }
  }, [successfullyAdded]); // Dependency array includes successfullyAdded
  // Handle input changes in the search field
  const handleChange = (e: any) => {
    setInputSearch(e.target.value);
    setUserShow(false); // Hide user details when input changes
  };

  useEffect(() => {
    if (socket) {
      // Set up the listener for 'tripUpdated' event
      const handleTripUpdate = (updatedTrip: TripType) => {
        setTrip(updatedTrip);
      };

      socket.on("tripUpdated", handleTripUpdate);
      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("tripUpdated", handleTripUpdate);
      };
    }
  }, [socket]);

  // Add a collaborator to the trip
  const addCollaboratorToTrip = async () => {
    try {
      // setTrip(await addCollaborator(userId, tripId, inputSearch, "email"));
      emitEvent("AddCollaborator", {
        tripId,
        collaboratorDetail: inputSearch,
        searchBy: "email",
      });
    } catch (err) {
      return; // Handle error if necessary
    }
  };

  // Delete a collaborator from the trip
  const deleteCollaboratorFromTrip = async (googleId: string) => {
    try {
      emitEvent("RemoveCollaborator", {
        tripId,
        collaboratorDetail: googleId,
        searchBy: "googleId",
      });
    } catch (err) {
      return; // Handle error if necessary
    }
  };

  // Handle search button click
  const handleClick = async () => {
    setUserFound(await searchUserDetails(inputSearch, "email"));
    setUserShow(true); // Show user details after searching
  };

  return (
    <Modal
      show={show} // Show or hide the modal based on the `show` prop
      onHide={onHide} // Function to hide the modal
      aria-labelledby="contained-modal-title-vcenter" // Accessibility label
      centered
      dialogClassName="w-1/2" // Set the width of the modal
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {/* Display the appropriate title based on the current mode */}
          {mode == "list" ? "All Collaborators" : "Add Collaborators"}
        </Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className="flex gap-2 mb-4">
            {/* Toggle between list and add modes */}
            <p
              onClick={() => setMode("list")}
              className={`${
                mode == "list" ? currentModeStyle : "text-gray-400"
              } hover:cursor-pointer`}
            >
              All Collaborators
            </p>
            <p
              onClick={() => setMode("add")}
              className={`${
                mode == "add" ? currentModeStyle : "text-gray-400"
              } hover:cursor-pointer`}
            >
              Add Collaborators
            </p>
          </div>
          <div>
            {mode == "list" ? (
              // Display list of collaborators
              <div className="">
                {collaborators.map((collaborator) => (
                  <div
                    className="bg-oxford-blue py-3 px-4 rounded-full flex flex-col md:flex-row items-center justify-between mt-2 gap-3"
                    key={collaborator.googleId}
                  >
                    <div className="flex gap-2 items-center flex-col md:flex-row ">
                      <img
                        src={collaborator.picture}
                        className="w-10 rounded-full"
                        alt="Collaborator"
                      />
                      <p className="text-white text-xl">
                        {collaborator.name || collaborator.email}
                      </p>
                    </div>
                    <motion.div
                      className="hover:cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isOwner && (
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-red-700 text-2xl"
                          onClick={() =>
                            deleteCollaboratorFromTrip(collaborator.googleId)
                          }
                        />
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>
            ) : (
              // Display add collaborator UI
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-oxford-blue text-xl font-bold">
                    Search User
                  </h1>
                </div>
                <div className="mb-2">
                  <input
                    className="border-3 rounded-lg text-lg px-2 py-1 w-4/5"
                    placeholder="search by Email! eg. ....@gmail.com"
                    onChange={handleChange}
                  />
                  <motion.button
                    className="bg-oxford-blue rounded-lg py-2 px-3 text-white"
                    onClick={handleClick}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-2xl"
                    />
                  </motion.button>
                </div>
                <div>
                  {userShow &&
                    (userFound ? (
                      <div className="bg-oxford-blue p-3 rounded-full">
                        <div className="flex justify-between flex-col md:flex-row items-center">
                          <div className="flex items-center flex-col md:flex-row gap-2">
                            <img
                              src={userFound.picture}
                              className="w-10 rounded-full"
                              alt="User Found"
                            />
                            <p className="text-white text-xl">
                              {userFound.name || userFound.email}
                            </p>
                          </div>
                          <div>
                            {/* Icon button with animations */}
                            <motion.p
                              className="text-3xl font-bold text-alice-blue hover:cursor-pointer"
                              whileHover={{ scale: 1.1 }} // Scale up on hover
                              whileTap={{ scale: 0.9 }} // Scale down on click
                              onClick={() => {
                                addCollaboratorToTrip(); // Call function to add itineraries
                                setSuccessfullyAdded(true); // Set state to show success icon
                              }}
                            >
                              {/* Display success icon if itineraries have been added, otherwise show plus icon */}
                              {successfullyAdded ? (
                                <FontAwesomeIcon icon={faCheck} /> // Success checkmark icon
                              ) : (
                                <FontAwesomeIcon icon={faPlus} /> // Plus icon for adding
                              )}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <h1 className="text-lg">
                        Could not find user {inputSearch} {" :("}
                      </h1>
                    ))}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CollaboratorsModal; // Export the CollaboratorsModal component for use in other parts of the application
