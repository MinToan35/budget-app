import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";
export default function AddBudgetModal({ show, handleClose }) {
  const { addBudgets } = useBudgets();
  const nameRef = useRef();
  const maxRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudgets({
      name: nameRef.current.value,
      max: parseInt(maxRef.current.value),
    });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budgets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              min={0}
              step={1}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
