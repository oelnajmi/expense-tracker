"use client";

import React from "react";
import { Expense } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import EditExpenseDialog from "./EditExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";

interface ExpenseListProps {
  expenses: Expense[];
  onUpdateExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  onUpdateExpense,
  onDeleteExpense,
}: ExpenseListProps) {
  const sortedExpenses = [...expenses].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return (
    <ul className="space-y-2">
      {sortedExpenses.map((expense) => (
        <li
          key={expense.id}
          className="flex justify-between items-center p-2 border-b"
        >
          <div>
            <span className="font-medium">{expense.name}</span>
            <Badge
              variant={expense.type === "monthly" ? "default" : "secondary"}
              className="ml-2"
            >
              {expense.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="mr-2">
              ${parseFloat(expense.amount).toFixed(2)}
            </span>
            {expense.type === "subscription" && expense.subscriptionDay && (
              <span className="text-sm text-gray-500 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Day {expense.subscriptionDay}
              </span>
            )}
            <EditExpenseDialog
              expense={expense}
              onUpdateExpense={onUpdateExpense}
            />
            <DeleteExpenseDialog
              expenseId={expense.id}
              onDeleteExpense={onDeleteExpense}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
