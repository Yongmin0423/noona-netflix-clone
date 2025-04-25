import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <Spinner
      animation="border"
      variant="danger"
      style={{ width: "5rem", height: "5rem" }}
    />
  );
}
