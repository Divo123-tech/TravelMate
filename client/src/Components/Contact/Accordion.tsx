import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CustomToggle from "./CustomToggle";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { FC } from "react";
//Props for the FAQ Acordion
type Props = {
  eventKey: string;
  question: string;
  answer: string;
};

const FAQAccordion: FC<Props> = ({ eventKey, question, answer }: Props) => {
  return (
    <>
      <Card className="mb-4 ml-10 mr-10">
        <Card.Header className="bg-alice-blue flex justify-between items-center px-8 ">
          <p className="text-black text-2xl font-Raleway">{question}</p>
          <CustomToggle eventKey={eventKey}>
            {" "}
            <FontAwesomeIcon icon={faCaretDown} className="text-4xl" />
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body className="px-8 text-justify font-Rethink">
            {answer}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

export default FAQAccordion;
