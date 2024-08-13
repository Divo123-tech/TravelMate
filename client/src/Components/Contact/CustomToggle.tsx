type Props = {
  // The children prop allows passing React nodes to be displayed inside the button
  children: any;
  // The eventKey prop is used to control the Accordion component's active state
  eventKey: string;
};

import { useAccordionButton } from "react-bootstrap/AccordionButton";

// CustomToggle component used as a toggle button for Accordion
const CustomToggle = ({ children, eventKey }: Props) => {
  // useAccordionButton provides a function to handle the click event and control the Accordion
  const accordionOnClick = useAccordionButton(eventKey);

  return (
    // The button will toggle the Accordion section when clicked
    <button onClick={accordionOnClick}>{children}</button>
  );
};

export default CustomToggle;
