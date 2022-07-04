import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";
export default function UncategorizedBudgetCard(props) {
  const { expenses } = useBudgets();
  const amount = expenses
    .filter((expense) => expense.budgetId === UNCATEGORIZED_BUDGET_ID)
    .reduce((total, expense) => total + expense.amount, 0);
  if (amount === 0) return null;
  return <BudgetCard {...props} name="Uncategorized" amount={amount} gray />;
}
