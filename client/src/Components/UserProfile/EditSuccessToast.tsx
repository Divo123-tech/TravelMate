import Toast from "react-bootstrap/Toast";

type Props = {
  editSuccess: boolean;
  setEditSuccess: (value: boolean) => void;
};

const EditSuccessToast = ({ editSuccess, setEditSuccess }: Props) => {
  return (
    <div className="flex justify-center">
      <Toast
        onClose={() => setEditSuccess(false)}
        show={editSuccess}
        delay={1500}
        autohide
      >
        <Toast.Header className="bg-green-400">
          <strong className="me-auto">User Succesfully Updated!</strong>
        </Toast.Header>
        <Toast.Body className="bg-green-200">
          Your current user information has been updated!
        </Toast.Body>
      </Toast>
    </div>
  );
};
export default EditSuccessToast;
