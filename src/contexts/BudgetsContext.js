import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";
export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budget", []);
  const [expenses, setExpenses] = useLocalStorage("expense", []);
  //Add budgets
  const addBudgets = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (budgets.find((budget) => budget.name === name)) return prevBudgets;
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };
  //Add expenses
  const addExpenses = ({ description, amount, budgetId }) => {
    setExpenses((prevExpense) => {
      return [...prevExpense, { id: uuidV4(), description, amount, budgetId }];
    });
  };
  //Delete expense
  const deleteExpense = (id) => {
    setExpenses((prevExpense) => {
      return prevExpense.filter((expenses) => expenses.id !== id);
    });
  };
  //Delete budget
  const deleteBudget = (id) => {
    setExpenses((prevExpense) => {
      return prevExpense.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudget) => {
      return prevBudget.filter((budget) => budget.id !== id);
    });
  };
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        addBudgets,
        expenses,
        addExpenses,
        deleteExpense,
        deleteBudget,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
