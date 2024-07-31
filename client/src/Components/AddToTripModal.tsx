import { FC, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../App";
import { TripType } from "../types/types";
import { motion } from "framer-motion";
type Props = {
  show: boolean;
  onHide: () => void;
  itineraries: any[];
};

const AddToTripModal: FC<Props> = ({ show, onHide, itineraries }: Props) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { user } = context;
  const addItinerearies = () => {
    itineraries.map((itinerary: any) => {
      console.log(itinerary);
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
                      onClick={() => addItinerearies()}
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
