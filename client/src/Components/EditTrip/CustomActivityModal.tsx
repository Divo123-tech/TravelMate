import { FC, useContext, useState, ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import { UserContext, SocketContext } from "../../App";
import { attractionType } from "../../types/types";

type Props = {
  show: boolean; // Determines if the modal is visible
  onHide: () => void; // Function to hide the modal
  tripId: string; // ID of the trip to which activities will be added
};

// Define the CustomActivityModal component
const CustomActivityModal: FC<Props> = ({ show, onHide, tripId }: Props) => {
  // State to manage activity details with initial values
  const [activity, setActivity] = useState({
    name: "",
    id: Math.random().toString(36).substring(2, 8), // Generate a random ID for the activity
    address: "",
    city: "",
    country: "",
    url: "",
    type: "activities",
  });

  // Context to access user and socket information
  const userContext = useContext(UserContext);
  const socketContext = useContext(SocketContext);

  // Ensure that UserContext and SocketContext are available
  if (!userContext || !socketContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const { emitEvent } = socketContext;

  // Function to handle adding activity to the trip
  const addActivityToTrip = () => {
    emitEvent("AddLocationToTrip", {
      tripId,
      data: { details: activity, type: activity.type },
    });
    onHide(); // Close the modal after adding the activity
  };

  // Function to handle changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActivity((prevActivity: attractionType) => {
      return {
        ...prevActivity,
        [e.target.name]: e.target.value, // Update the specific field in activity state
      };
    });
  };

  return (
    <Modal
      show={show} // Control modal visibility
      onHide={onHide} // Function to hide the modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="w-1/2" // Set the width of the modal
    >
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Activity!</Modal.Title> {/* Modal title */}
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="flex flex-col px-2 gap-3">
              {/* Input field for activity name */}
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">Name</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Name your Activity!"
                  name="name"
                  maxLength={25}
                  onChange={handleChange} // Update state on change
                ></input>
              </div>

              {/* Input field for activity address */}
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">Address</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Your Activity's Address"
                  name="address"
                  onChange={handleChange} // Update state on change
                ></input>
              </div>

              {/* Input field for activity country */}
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">Country</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Your Activity's Country"
                  name="country"
                  maxLength={25}
                  onChange={handleChange} // Update state on change
                ></input>
              </div>

              {/* Input field for activity city */}
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">City</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Your Activity's City"
                  name="city"
                  maxLength={25}
                  onChange={handleChange} // Update state on change
                ></input>
              </div>

              {/* Input field for optional URL */}
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">
                  Redirect Link {"(Optional)"}
                </label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Link a website or video to your trip!"
                  name="url"
                  onChange={handleChange} // Update state on change
                ></input>
              </div>
            </div>
          </Modal.Body>
        </form>
        <Modal.Footer>
          <button
            className="bg-oxford-blue px-4 py-2 text-xl rounded-full text-white disabled:opacity-85 "
            onClick={addActivityToTrip} // Handle button click to add activity
            disabled={
              // Disable button if required fields are empty
              activity.name == "" ||
              activity.country == "" ||
              activity.address == "" ||
              activity.city == ""
            }
          >
            Add to Trip {/* Button text */}
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CustomActivityModal;
