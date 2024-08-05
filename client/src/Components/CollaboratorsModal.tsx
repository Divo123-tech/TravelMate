import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { TripType, UserType } from "../types/types";
import {
  searchUserDetails,
  addCollaborator,
  deleteCollaborator,
} from "../services/apiService";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
type Props = {
  show: boolean;
  onHide: () => void;
  collaborators: any[];
  tripId: string;
  userId: string;
  setTrip: (trip: TripType | null) => void;
  isOwner: boolean;
};

const CollaboratorsModal = ({
  show,
  onHide,
  collaborators,
  tripId,
  userId,
  setTrip,
  isOwner,
}: Props) => {
  const [mode, setMode] = useState("list");
  const [inputSearch, setInputSearch] = useState("");
  const [userFound, setUserFound] = useState<UserType | null>(null);
  const [userShow, setUserShow] = useState(false);
  const currentModeStyle = "text-oxford-blue underline underline-offset-4";
  const handleChange = (e: any) => {
    setInputSearch(e.target.value);
    setUserShow(false);
  };

  const addCollaboratorToTrip = async () => {
    try {
      setTrip(await addCollaborator(userId, tripId, inputSearch, "email"));
    } catch (err) {
      return;
    }
  };

  const deleteCollaboratorFromTrip = async (email: string) => {
    try {
      setTrip(await deleteCollaborator(userId, tripId, email, "email"));
    } catch (err) {
      return;
    }
  };

  const handleClick = async () => {
    setUserFound(await searchUserDetails(inputSearch, "email"));
    setUserShow(true);
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
        <Modal.Title>
          {mode == "list" ? "All Collaborators" : "Add Collaborators"}
        </Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className="flex gap-2 mb-4">
            <p
              onClick={() => setMode("list")}
              className={`${
                mode == "list" ? currentModeStyle : "text-gray-400"
              } hover:cursor-pointer`}
            >
              All Collaborators
            </p>
            <p
              onClick={() => setMode("add")}
              className={`${
                mode == "add" ? currentModeStyle : "text-gray-400"
              } hover:cursor-pointer`}
            >
              Add Collaborators
            </p>
          </div>
          <div>
            {mode == "list" ? (
              <div>
                {collaborators.map((collaborator) => {
                  return (
                    <div className="bg-oxford-blue py-3 px-4 rounded-full flex flex-col md:flex-row items-center justify-between gap-3">
                      <div className="flex gap-2 items-center flex-col md:flex-row">
                        <img
                          src={collaborator.picture}
                          className="w-10 rounded-full"
                        ></img>
                        <p className="text-baby-powder text-xl">
                          {collaborator.name || collaborator.email}
                        </p>
                      </div>
                      <div>
                        {isOwner && (
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="text-red-700 text-2xl"
                            onClick={() =>
                              deleteCollaboratorFromTrip(collaborator.email)
                            }
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-oxford-blue text-xl font-bold">
                    Search User
                  </h1>
                </div>
                <div className="mb-2">
                  <input
                    className="border-3 rounded-lg text-lg px-2 py-1 w-4/5"
                    placeholder="search by Email! eg. ....@gmail.com"
                    onChange={handleChange}
                  ></input>
                  <motion.button
                    className="bg-oxford-blue rounded-lg py-2 px-3 text-baby-powder"
                    onClick={handleClick}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-2xl"
                    />
                  </motion.button>
                </div>
                <div>
                  {userShow &&
                    (userFound ? (
                      <div className="bg-oxford-blue p-3 rounded-full">
                        <div className="flex justify-between flex-col md:flex-row items-center">
                          <div className="flex items-center flex-col md:flex-row gap-2">
                            <img
                              src={userFound.picture}
                              className="w-10 rounded-full"
                            ></img>
                            <p className="text-baby-powder text-xl ">
                              {userFound.name || userFound.email}
                            </p>
                          </div>
                          <div>
                            <motion.p
                              className="text-4xl font-bold text-teal hover:cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => addCollaboratorToTrip()}
                            >
                              +
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-lg">
                          Could not find user {inputSearch} {" :("}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CollaboratorsModal;
