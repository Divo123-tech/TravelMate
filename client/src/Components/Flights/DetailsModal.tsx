import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FC, ChangeEvent } from "react";
import { flightType } from "../../types/types";
type Props = {
  flightDetails: any;
  setFlightDetails: (flightDetails: any) => void;
  show: boolean;
  onHide: () => void;
};
const DetailsModal: FC<Props> = ({
  flightDetails,
  setFlightDetails,
  show,
  onHide,
}: Props) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "nonstop") {
      setFlightDetails((prevFlightDetails: flightType) => {
        return {
          ...prevFlightDetails,
          [e.target.name]: e.target.value == "on" ? true : false,
        };
      });
    } else {
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
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="w-1/2"
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-Oswald">SET FILTERS</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className="flex flex-col px-2 gap-3 font-Oswald">
            <div className="flex items-center gap-2 ">
              <label className="text-xl font-medium">Direct</label>
              <input
                className="border-2 rounded-md border-black w-5 h-5 text-2xl"
                name="nonstop"
                type="checkbox"
                defaultChecked={flightDetails.nonstop}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Adults</label>
              <input
                type="number"
                className="border-1 rounded-full px-3 py-2 border-black text-lg"
                placeholder="Name your trip!"
                name="adults"
                maxLength={3}
                defaultValue={flightDetails.adults}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Children</label>
              <input
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
                placeholder="No. of Children"
                name="children"
                type="number"
                maxLength={3}
                defaultValue={flightDetails.children}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Max Price</label>
              <input
                type="number"
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
                placeholder="Leave blank for no limit"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-medium">Cabin</label>
              <select
                className="border-1 rounded-full px-2 py-2 border-black text-lg"
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
