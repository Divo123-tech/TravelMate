import { FC, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext, SocketContext } from "../App";
import { TripType } from "../types/types";
import { motion } from "framer-motion";
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
  const { socket, emitEvent } = socketContext;
  const addItinereariesToTrip = (tripId: string) => {
    console.log(tripId);
    itineraries.map((itinerary: any) => {
      emitEvent("AddLocationToTrip", {
        tripId,
        data: { details: itinerary, type: itinerary.type },
      });
      // console.log(itinerary, itinerary.type);
    });
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
            <Modal.Title>Select Trip!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-2">
              {user.trips.map((trip: TripType) => {
                return (
                  <div className="bg-teal px-4 py-2 rounded-full flex items-center justify-between">
                    <h1 className="text-xl font-medium text-baby-powder">
                      {trip.name}
                    </h1>
                    <motion.p
                      className="text-4xl font-bold text-oxford-blue hover:cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addItinereariesToTrip(trip._id)}
                    >
                      +
                    </motion.p>
                  </div>
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
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide} variant="secondary">
              Close
            </Button>
            <Button type="submit">Create!</Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

export default AddToTripModal;
