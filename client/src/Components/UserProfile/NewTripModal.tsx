import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createNewTrip } from "../../services/users.service";
import { UserContext } from "../../App";
import { UserType } from "../../types/types";
type Props = {
  show: boolean;
  onHide: () => void;
};

const NewTripModal = ({ show, onHide }: Props) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { user, setUser } = context;
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
          user?.googleId || ""
        );
        navigate(`/trip/${newTrip._id}`);
        setUser((prevUser: any) => {
          return {
            ...prevUser,
            trips: [...prevUser.trips, newTrip],
          };
        });
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
        <Modal.Title className="font-Oswald">
          Start With a Name And Date!
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="flex flex-col px-2 gap-3">
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
                maxLength={25}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium font-Oswald">
                Start Date
              </label>
              <input
                type="date"
                className="border-1 rounded-full px-2 py-2 border-black text-lg font-Rethink"
                min={new Date().toISOString().split("T")[0]}
                name="startDate"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium font-Oswald">
                End Date
              </label>
              <input
                type="date"
                className="border-1 rounded-full px-2 py-2 border-black text-lg font-Rethink"
                min={tripDetails.startDate}
                onChange={handleChange}
                name="endDate"
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
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
