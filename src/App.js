import { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import { Button, Container, Stack } from "react-bootstrap";
import AddExpenseModal from "./components/AddExpenseModal";
import { useBudgets } from "./contexts/BudgetsContext";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetsContext";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
export default function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpense, setViewExpense] = useState();
  const { budgets, expenses } = useBudgets();
  const openExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-3">
          <h1 className="me-auto">Budgets</h1>
          <Button onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
          }}
        >
          {budgets.map((budget) => {
            const amount = expenses
              .filter((expense) => expense.budgetId === budget.id)
              .reduce((total, expense) => total + expense.amount, 0);
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                max={budget.max}
                amount={amount}
                openExpenseModal={() => openExpenseModal(budget.id)}
                openViewExpense={() => setViewExpense(budget.id)}
              />
            );
          })}
        </div>
        <Stack className="mt-3" gap="3">
          <UncategorizedBudgetCard
            openExpenseModal={() => openExpenseModal(UNCATEGORIZED_BUDGET_ID)}
            openViewExpense={() => setViewExpense(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </Stack>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        budgedId={viewExpense}
        handleClose={() => setViewExpense()}
      />
    </>
  );
}
