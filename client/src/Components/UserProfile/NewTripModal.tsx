import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext, ChangeEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import { createNewTrip } from "../../services/users.service";
import { UserContext } from "../../App";

// Define the type for the component props
type Props = {
  show: boolean; // Determines whether the modal is visible
  onHide: () => void; // Function to close the modal
};

// Define the NewTripModal component
const NewTripModal: FC<Props> = ({ show, onHide }: Props) => {
  // Access the user context
  const context = useContext(UserContext);

  // Throw an error if the component is used outside of a UserProvider
  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { setUser } = context; // Extract setUser from context
  const navigate = useNavigate(); // Hook for navigation
  const [tripDetails, setTripDetails] = useState({
    name: "", // Name of the trip
    startDate: "", // Start date of the trip
    endDate: "", // End date of the trip
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTripDetails({
      ...tripDetails,
      [e.target.name]: e.target.value, // Update the state with the new value
    });
  };

  // Handle form submission
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Async function to create a new trip
    const createTrip = async () => {
      try {
        // Call service to create a new trip
        const newTrip = await createNewTrip(
          tripDetails.name,
          tripDetails.startDate,
          tripDetails.endDate
        );
        // Navigate to the newly created trip's page
        navigate(`/trip/${newTrip._id}`);
        // Update user context with the new trip
        setUser((prevUser: any) => ({
          ...prevUser,
          trips: [...prevUser.trips, newTrip], // Add new trip to user's trips
        }));
      } catch (err: any) {
        // If there's an error, set user to null
        setUser(null);
      }
    };

    createTrip(); // Call the createTrip function
  };

  return (
    <Modal
      show={show} // Controls the visibility of the modal
      onHide={onHide} // Function to hide the modal
      aria-labelledby="contained-modal-title-vcenter" // Accessibility label
      centered // Center the modal vertically
      dialogClassName="w-fit" // Adjust the width of the modal
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-Oswald">
          Start With a Name And Date!
          {/* Title of the modal */}
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        {/* Modal body containing form fields */}
        <Modal.Body>
          <div className="flex flex-col px-2 gap-3">
            {/* Trip Name Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium font-Oswald">
                Trip Name
              </label>
              <input
                type="text"
                className="border-1 rounded-full px-3 py-2 border-black text-lg font-Rethink"
                placeholder="Name your trip!"
                name="name"
                onChange={handleChange}
                maxLength={25} // Limit input length to 25 characters
              />
            </div>
            {/* Start Date Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium font-Oswald">
                Start Date
              </label>
              <input
                type="date"
                className="border-1 rounded-full px-2 py-2 border-black text-lg font-Rethink"
                min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                name="startDate"
                onChange={handleChange}
              />
            </div>
            {/* End Date Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium font-Oswald">
                End Date
              </label>
              <input
                type="date"
                className="border-1 rounded-full px-2 py-2 border-black text-lg font-Rethink"
                min={tripDetails.startDate} // Set minimum date to the start date
                onChange={handleChange}
                name="endDate"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Footer with Close and Create buttons */}
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button
            type="submit"
            disabled={
              tripDetails.name === "" ||
              tripDetails.startDate === "" ||
              tripDetails.endDate === "" // Disable button if any field is empty
            }
          >
            Create!
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default NewTripModal;
