"use client";

import React from "react";
import { Expense, Category } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import EditExpenseDialog from "./EditExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
  onUpdateExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  categories,
  onUpdateExpense,
  onDeleteExpense,
}: ExpenseListProps) {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Subscription";
  };

  const sortedExpenses = [...expenses].sort((a, b) =>
    getCategoryName(a.categoryId).localeCompare(getCategoryName(b.categoryId))
  );

  return (
    <ul className="space-y-2">
      {sortedExpenses.map((expense) => (
        <li
          key={expense.id}
          className="flex justify-between items-center p-2 border-b border-border"
        >
          <div>
            <span className="font-medium text-foreground">{expense.name}</span>
            <Badge
              variant={expense.type === "monthly" ? "default" : "secondary"}
              className="ml-2"
            >
              {getCategoryName(expense.categoryId)}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="mr-2 text-foreground">
              ${parseFloat(expense.amount).toFixed(2)}
            </span>
            {expense.type === "subscription" && expense.subscriptionDay && (
              <span className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Day {expense.subscriptionDay}
              </span>
            )}
            <EditExpenseDialog
              expense={expense}
              categories={categories}
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
