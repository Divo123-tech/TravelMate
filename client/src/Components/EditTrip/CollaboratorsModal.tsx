import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components for modal
import { FC, useState } from "react"; // Import React's FC type and useState hook
import { TripType, UserType } from "../../types/types"; // Import types for trips and users
import {
  searchUserDetails, // Function to search for a user
  addCollaborator, // Function to add a collaborator
  deleteCollaborator, // Function to delete a collaborator
} from "../../services/users.service"; // Import service functions for user operations
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import {
  faTrashCan, // Trash can icon for deleting
  faMagnifyingGlass, // Magnifying glass icon for searching
} from "@fortawesome/free-solid-svg-icons";

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
  userId,
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

  // Handle input changes in the search field
  const handleChange = (e: any) => {
    setInputSearch(e.target.value);
    setUserShow(false); // Hide user details when input changes
  };

  // Add a collaborator to the trip
  const addCollaboratorToTrip = async () => {
    try {
      setTrip(await addCollaborator(userId, tripId, inputSearch, "email"));
    } catch (err) {
      return; // Handle error if necessary
    }
  };

  // Delete a collaborator from the trip
  const deleteCollaboratorFromTrip = async (email: string) => {
    try {
      setTrip(await deleteCollaborator(userId, tripId, email, "email"));
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
              <div>
                {collaborators.map((collaborator) => (
                  <div
                    className="bg-oxford-blue py-3 px-4 rounded-full flex flex-col md:flex-row items-center justify-between gap-3"
                    key={collaborator.googleId}
                  >
                    <div className="flex gap-2 items-center flex-col md:flex-row">
                      <img
                        src={collaborator.picture}
                        className="w-10 rounded-full"
                        alt="Collaborator"
                      />
                      <p className="text-baby-powder text-xl">
                        {collaborator.name || collaborator.email}
                      </p>
                    </div>
                    <div>
                      {isOwner && (
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-red-700 text-2xl"
                          onClick={() =>
                            deleteCollaboratorFromTrip(collaborator.email)
                          }
                        />
                      )}
                    </div>
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
                    className="bg-oxford-blue rounded-lg py-2 px-3 text-baby-powder"
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
                            <p className="text-baby-powder text-xl">
                              {userFound.name || userFound.email}
                            </p>
                          </div>
                          <div>
                            <motion.p
                              className="text-4xl font-bold text-teal hover:cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={addCollaboratorToTrip}
                            >
                              +
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
