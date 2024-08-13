import { FC } from "react";
import Toast from "react-bootstrap/Toast";

// Define the type for the component props
type Props = {
  editSuccess: boolean; // Indicates whether the toast should be visible
  setEditSuccess: (value: boolean) => void; // Function to set the editSuccess state
};

// Define the EditSuccessToast component
const EditSuccessToast: FC<Props> = ({
  editSuccess,
  setEditSuccess,
}: Props) => {
  return (
    <div className="flex justify-center">
      {/* Toast component from react-bootstrap */}
      <Toast
        onClose={() => setEditSuccess(false)} // Closes the toast and updates the state
        show={editSuccess} // Controls the visibility of the toast
        delay={1500} // Duration before the toast auto-hides (in milliseconds)
        autohide // Automatically hides the toast after the delay
      >
        {/* Header of the toast */}
        <Toast.Header className="bg-green-400">
          <strong className="me-auto">User Successfully Updated!</strong>
          {/* The strong element is styled and provides the title of the toast */}
        </Toast.Header>
        {/* Body of the toast */}
        <Toast.Body className="bg-green-200">
          Your current user information has been updated!
          {/* Provides additional details about the update */}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default EditSuccessToast;
