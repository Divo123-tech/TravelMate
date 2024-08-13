import { FC, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext, SocketContext } from "../../App";
import { TripType } from "../../types/types";
import { googleAuthenticate } from "../../services/users.service";
import Trip from "./Trip";

// Define the type for component props
type Props = {
  show: boolean; // Controls whether the modal is visible or not
  onHide: () => void; // Function to hide the modal
  itineraries: any[]; // Array of itinerary objects to be added to a trip
};

// Functional component to manage adding itineraries to a trip
const AddToTripModal: FC<Props> = ({ show, onHide, itineraries }: Props) => {
  // Contexts for user and socket
  const userContext = useContext(UserContext);
  const socketContext = useContext(SocketContext);

  // Check if contexts are available
  if (!userContext || !socketContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { user } = userContext; // User context to access user information
  const { emitEvent } = socketContext; // Socket context to handle real-time events

  // Function to add itineraries to a specific trip
  const addItinerariesToTrip = (tripId: string) => {
    try {
      itineraries.map((itinerary: any) => {
        // Emit an event to add the itinerary to the trip
        emitEvent("AddLocationToTrip", {
          tripId,
          data: { details: itinerary, type: itinerary.type },
        });
      });
    } catch (err) {
      console.error("Error adding itineraries to trip:", err);
    }
  };

  return (
    <Modal
      show={show} // Control modal visibility
      onHide={onHide} // Hide modal function
      aria-labelledby="contained-modal-title-vcenter" // Accessibility label
      centered // Center the modal vertically
      dialogClassName="w-1/2" // Modal width
    >
      {user != null ? ( // Check if user is logged in
        <div>
          <Modal.Header closeButton>
            <Modal.Title className="font-FatFace">Select Trip!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-2">
              {/* Render a list of user trips */}
              {user.trips.map((trip: TripType) => {
                return (
                  <Trip
                    key={trip._id} // Unique key for each Trip component
                    trip={trip}
                    addItinerariesToTrip={addItinerariesToTrip} // Pass function to handle adding itineraries
                  />
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </div>
      ) : (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Log In To Make a Trip!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={onHide} variant="secondary">
              Close
            </Button>
            <Button type="button" onClick={googleAuthenticate}>
              Log In/Sign Up!
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

export default AddToTripModal;
