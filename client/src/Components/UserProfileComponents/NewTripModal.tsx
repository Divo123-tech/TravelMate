import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createNewTrip } from "../../services/apiService";
import { UserContext } from "../../App";
type Props = {
  show: boolean;
  onHide: () => void;
};

const NewTripModal = ({ show, onHide }: Props) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }

  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });
  const handleChange = (e: any) => {
    setTripDetails({
      ...tripDetails,
      [e.target.name]: e.target.value,
    });
    console.log(tripDetails);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const createTrip = async () => {
      try {
        const newTrip = await createNewTrip(
          tripDetails.name,
          tripDetails.startDate,
          tripDetails.endDate,
          "117921967958221394769"
        );
        navigate(`/trip/${newTrip._id}`);
      } catch (err: any) {
        console.log(err);
      }
    };
    createTrip();
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="w-fit"
    >
      <Modal.Header closeButton>
        <Modal.Title>Lets Start With a Name And Date!</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="flex flex-col px-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Trip Name</label>
              <input
                type="text"
                className="border-1 rounded-full px-3 py-2 border-black text-lg"
                placeholder="Name your trip!"
                name="name"
                onChange={handleChange}
                maxLength={25}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Start Date</label>
              <input
                type="date"
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
                min={new Date().toISOString().split("T")[0]}
                name="startDate"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">End Date</label>
              <input
                type="date"
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
                min={tripDetails.startDate}
                onChange={handleChange}
                name="endDate"
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary" className="">
            Close
          </Button>
          <Button
            type="submit"
            disabled={
              tripDetails.name == "" ||
              tripDetails.startDate == "" ||
              tripDetails.endDate == ""
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
