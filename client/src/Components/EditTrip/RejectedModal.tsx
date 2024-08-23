import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
  show: boolean; // Determines if the modal is visible
  onHide: () => void; // Function to hide the modal
};
const AccessDeniedModal = ({ show, onHide }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to the desired location
    navigate("/profile"); // Change this to your desired route
    onHide(); // Close the modal after navigation
  };

  return (
    <Modal
      show={show}
      backdrop="static" // Prevents closing on outside click
      keyboard={false} // Prevents closing on pressing ESC key
      centered
      dialogClassName="w-1/2" // Set the width of the modal
    >
      <Modal.Header>
        <Modal.Title>Access Denied</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-xl">You do not have access to this trip.</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-champion-blue px-3 py-2 text-alice-blue hover:bg-oxford-blue"
          onClick={handleNavigate}
        >
          Go to Profile
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccessDeniedModal;
