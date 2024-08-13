import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CustomToggle from "./CustomToggle";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { FC } from "react";

type Props = {
  eventKey: string; // Unique key to identify the accordion item
  question: string; // The question to be displayed in the accordion header
  answer: string; // The answer to be displayed in the accordion body
};

// Functional component for displaying FAQ accordion items
const FAQAccordion: FC<Props> = ({ eventKey, question, answer }: Props) => {
  return (
    <>
      <Card className="mb-4">
        {/* Card header with question and toggle icon */}
        <Card.Header className="bg-teal flex justify-between items-center px-8">
          <p className="text-white text-2xl font-Oswald">{question}</p>
          {/* Custom toggle button to expand/collapse the accordion item */}
          <CustomToggle eventKey={eventKey}>
            <FontAwesomeIcon icon={faCaretDown} className="text-4xl" />
          </CustomToggle>
        </Card.Header>
        {/* Accordion collapse area containing the answer */}
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
