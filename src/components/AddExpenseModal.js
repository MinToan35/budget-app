import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";
import { useBudgets } from "../contexts/BudgetsContext";
export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const { budgets, addExpenses } = useBudgets();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpenses({
      description: descriptionRef.current.value,
      amount: parseInt(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={1}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
              <option id={UNCATEGORIZED_BUDGET_ID}>
                {UNCATEGORIZED_BUDGET_ID}
              </option>
              {budgets.map((budget) => {
                return (
                  <option key={budget.id} id={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
