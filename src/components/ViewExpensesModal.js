import React from "react";
import { Modal, Stack, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";
import { currencyFormater } from "../utils";
export default function ViewExpensesModal({ budgedId, handleClose }) {
  const { budgets, expenses, deleteExpense, deleteBudget } = useBudgets();
  const expenseBudgetId = expenses.filter(
    (expense) => expense.budgetId === budgedId
  );

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgedId
      ? { name: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgedId);
  return (
    <Modal show={budgedId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack gap="2" direction="horizontal">
            Expense - {budget?.name}
            {budgedId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget.id);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap="3" direction="vertical">
          {expenseBudgetId.map((expense) => {
            return (
              <Stack key={expense.id} direction="horizontal" gap="2">
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5">
                  {currencyFormater.format(expense.amount)}
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteExpense(expense.id)}
                >
                  &times;
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
