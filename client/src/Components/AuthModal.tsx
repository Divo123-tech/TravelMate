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
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="mx-auto my-4 w-full xs:w-10/12 sm:w-7/12 md:w-1/3 lg:w-2/3 max-w-2xl"
    >
      <div className="p-3 sm:p-5">
        <Modal.Header closeButton className="border-b-0">
          <Modal.Title className="text-lg xs:text-xl sm:text-xl md:text-2xl font-semibold">
            Login/Sign up For an Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-6 sm:py-8">
          <div className="flex justify-center">
            <button
              className="
            flex items-center justify-center
            w-full
            px-6 py-4 sm:px-8 sm:py-5
            bg-white text-gray-700
            font-medium text-lg sm:text-xl md:text-2xl
            rounded-lg
            shadow-lg hover:shadow-xl
            transform transition duration-300 ease-in-out
            hover:-translate-y-1 active:translate-y-0
            active:shadow-md
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={googleAuthenticate}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-blue-500 mr-4 sm:mr-6 text-md xs:text-xl sm:text-lg md:text-xl"
              />{" "}
              <span className="whitespace-nowrap text-md xs:text-xl sm:text-lg md:text-xl">
                Login/Sign up Using Google!
              </span>
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-t-0 flex justify-end">
          <Button
            onClick={onHide}
            variant="secondary"
            className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg"
          >
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AuthModal;
