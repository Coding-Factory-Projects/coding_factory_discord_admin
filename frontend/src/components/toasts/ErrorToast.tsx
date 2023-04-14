import { Toast } from "react-bootstrap";

type ErrorToastProps = {
  show: boolean,
  title: string,
  message: string,
  onClose: () => void
};

export function ErrorToast({ show, onClose, title, message }: ErrorToastProps) {
  return <Toast bg="danger" show={show} delay={5000} autohide onClose={onClose} className="m-3">
    <Toast.Header closeButton={false}><strong>{title}</strong></Toast.Header>
    <Toast.Body>{message}</Toast.Body>
  </Toast>
}