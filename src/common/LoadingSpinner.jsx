import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className="w-screen h-screen flex justify-center items-center spinner-area">
      <Spinner
        animation="border"
        variant="danger"
        style={{ width: "5rem", height: "5rem" }}
      />
    </div>
  );
}
