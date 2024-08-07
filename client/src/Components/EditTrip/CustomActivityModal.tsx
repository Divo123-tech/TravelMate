import { FC, useContext, useState, ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import { UserContext, SocketContext } from "../../App";
import { attractionType } from "../../types/types";

type Props = {
  show: boolean;
  onHide: () => void;
  tripId: string;
};

const CustomActivityModal: FC<Props> = ({ show, onHide, tripId }: Props) => {
  const [activity, setActivity] = useState({
    name: "",
    id: Math.random().toString(36).substring(2, 8),
    address: "",
    city: "",
    country: "",
    url: "",
    type: "activities",
  });
  const userContext = useContext(UserContext);
  const socketContext = useContext(SocketContext);
  if (!userContext || !socketContext) {
    throw new Error("YourComponent must be used within a UserProvider");
  }
  const { emitEvent } = socketContext;

  const addActivityToTrip = () => {
    emitEvent("AddLocationToTrip", {
      tripId,
      data: { details: activity, type: activity.type },
    });
    onHide();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActivity((prevActivity: attractionType) => {
      return {
        ...prevActivity,
        [e.target.name]: e.target.value,
      };
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
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Activity!</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="flex flex-col px-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">Name</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Name your trip!"
                  name="name"
                  maxLength={25}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">Address</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Your Activity's Address"
                  name="address"
                  onChange={handleChange}
                ></input>
              </div>{" "}
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">Country</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Your Activity's Country"
                  name="country"
                  maxLength={25}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">City</label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Your Activity's City"
                  name="city"
                  maxLength={25}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xl font-medium">
                  Redirect Link {"(Optional)"}
                </label>
                <input
                  type="text"
                  className="border-1 rounded-full px-3 py-2 border-black text-lg"
                  placeholder="Link a website or video to your trip!"
                  name="url"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </Modal.Body>
        </form>
        <Modal.Footer>
          <button
            className="bg-oxford-blue px-4 py-2 text-xl rounded-full text-baby-powder disabled:opacity-85 "
            onClick={addActivityToTrip}
            disabled={
              activity.name == "" ||
              activity.country == "" ||
              activity.address == "" ||
              activity.city == ""
            }
          >
            Add to Trip
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CustomActivityModal;
