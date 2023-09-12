import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface ConfirmDialogProps {
  show: boolean,
  onConfirm: () => void,
  handleClose: () => void
}

export function ConfirmNextYearDialog(props: ConfirmDialogProps) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      style={{ color: "black !important" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir confirmer le passage à la nouvelle année ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={props.onConfirm}>Confirmer</Button>
      </Modal.Footer>
    </Modal>
  );
}