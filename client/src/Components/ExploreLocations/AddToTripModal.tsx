import { FC, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext, SocketContext } from "../../App";
import { TripType } from "../../types/types";
import { googleAuthenticate } from "../../services/users.service";
import Trip from "./Trip";
type Props = {
  show: boolean;
  onHide: () => void;
  itineraries: any[];
};

const AddToTripModal: FC<Props> = ({ show, onHide, itineraries }: Props) => {
  const userContext = useContext(UserContext);
  const socketContext = useContext(SocketContext);
  if (!userContext || !socketContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { user } = userContext;
  const { emitEvent } = socketContext;
  const addItinerariesToTrip = (tripId: string) => {
    try {
      itineraries.map((itinerary: any) => {
        emitEvent("AddLocationToTrip", {
          tripId,
          data: { details: itinerary, type: itinerary.type },
        });
      });
    } catch (err) {
      return;
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="w-1/2"
    >
      {user != null ? (
        <div>
          <Modal.Header closeButton>
            <Modal.Title className="font-FatFace">Select Trip!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-2">
              {user.trips.map((trip: TripType) => {
                return (
                  <Trip
                    trip={trip}
                    addItinerariesToTrip={addItinerariesToTrip}
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
