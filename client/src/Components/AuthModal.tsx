import { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { googleAuthenticate } from "../services/users.service";
// Define the type for component props
type Props = {
  show: boolean; // Controls whether the modal is visible or not
  onHide: () => void; // Function to hide the modal
};

// Functional component to manage adding itineraries to a trip
const AuthModal: FC<Props> = ({ show, onHide }: Props) => {
  return (
    <Modal
      show={show} // Control modal visibility
      onHide={onHide} // Hide modal function
      aria-labelledby="contained-modal-title-vcenter" // Accessibility label
      centered // Center the modal vertically
      dialogClassName="w-1/2" // Modal width
    >
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Login/Sign up For an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <button
              className="
                flex items-center justify-center
                px-4 py-3
                bg-white text-gray-700
                font-medium text-base
                rounded-md
                shadow-md hover:shadow-lg
                transform transition duration-300 ease-in-out
                hover:-translate-y-0.5 active:translate-y-0
                active:shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                text-xl"
              onClick={googleAuthenticate}
            >
              <FontAwesomeIcon icon={faGoogle} className="text-blue-500 mr-4" />{" "}
              Login/Sign up Using Google!
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AuthModal;
