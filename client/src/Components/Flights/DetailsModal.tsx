import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FC, ChangeEvent } from "react";
import { flightType } from "../../types/types";

// Define the props type for the DetailsModal component
type Props = {
  flightDetails: any; // Current flight details state
  setFlightDetails: (flightDetails: any) => void; // Function to update flight details state
  show: boolean; // Boolean to control the visibility of the modal
  onHide: () => void; // Function to close the modal
};

// Functional component for displaying the details modal
const DetailsModal: FC<Props> = ({
  flightDetails,
  setFlightDetails,
  show,
  onHide,
}: Props) => {
  // Handler for changes in input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "nonstop") {
      // Update state based on checkbox value
      setFlightDetails((prevFlightDetails: flightType) => {
        return {
          ...prevFlightDetails,
          [e.target.name]: e.target.value === "on" ? true : false,
        };
      });
    } else {
      // Update state based on other input values
      setFlightDetails((prevFlightDetails: flightType) => {
        return {
          ...prevFlightDetails,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  return (
    <Modal
      show={show} // Control the visibility of the modal
      onHide={onHide} // Close the modal when triggered
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="w-1/2" // Set the width of the modal
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-Raleway">SET FILTERS</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className="flex flex-col px-2 gap-3 font-Raleway">
            {/* Direct flight checkbox */}
            <div className="flex items-center gap-2 ">
              <label className="text-xl font-medium">Direct</label>
              <input
                className="border-2 rounded-md border-black w-5 h-5 text-2xl"
                name="nonstop"
                type="checkbox"
                defaultChecked={flightDetails.nonstop}
                onChange={handleChange}
              />
            </div>

            {/* Adults number input */}
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Adults</label>
              <input
                type="number"
                className="border-1 rounded-full px-3 py-2 border-black text-lg"
                placeholder="Number of Adults"
                name="adults"
                maxLength={3}
                defaultValue={flightDetails.adults}
                onChange={handleChange}
              />
            </div>

            {/* Children number input */}
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Children</label>
              <input
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
                placeholder="Number of Children"
                name="children"
                type="number"
                maxLength={3}
                defaultValue={flightDetails.children}
                onChange={handleChange}
              />
            </div>

            {/* Max price number input */}
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Max Price</label>
              <input
                type="number"
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
                placeholder="Leave blank for no limit"
                name="maxPrice" // Added name for the max price input
                onChange={handleChange}
              />
            </div>

            {/* Cabin class selection */}
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Cabin</label>
              <select
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
                name="cabin"
                defaultValue={flightDetails.cabin}
                onChange={handleChange}
              >
                <option value="ECONOMY">Economy</option>
                <option value="PREMIUM_ECONOMY">Premium Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First Class</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={onHide}>
            Done
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DetailsModal;
