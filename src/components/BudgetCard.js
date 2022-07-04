import React from "react";
import { Card, Stack, Button, ProgressBar } from "react-bootstrap";
import { currencyFormater } from "../utils";
export default function BudgetCard({
  name,
  max,
  amount,
  openExpenseModal,
  openViewExpense,
  gray,
  hideButtons,
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between fw-normal align-items-center mb-3">
          <div>{name}</div>
          <div>
            {currencyFormater.format(amount)}
            {max && (
              <span className="text-muted fs-6 ">
                / {currencyFormater.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            min={0}
            max={max}
            now={amount}
            className="rounded-pill"
            variant={getProgreesbarVariant(amount, max)}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4 ">
            <Button onClick={openExpenseModal} className="ms-auto">
              Add Expense
            </Button>
            <Button variant="outline-primary" onClick={openViewExpense}>
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

const getProgreesbarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  else if (ratio < 0.75) return "warning";
  return "danger";
};
