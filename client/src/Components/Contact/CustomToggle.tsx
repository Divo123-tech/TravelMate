type Props = {
  children: any;
  eventKey: string;
};
import { useAccordionButton } from "react-bootstrap/AccordionButton";

const CustomToggle = ({ children, eventKey }: Props) => {
  return <button onClick={useAccordionButton(eventKey)}>{children}</button>;
};

export default CustomToggle;
