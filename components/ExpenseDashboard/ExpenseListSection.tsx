"use client";

import { useState } from "react";
import { Expense, NewExpense, Category } from "@/db/schema";
import ExpenseList from "@/components/ExpenseList";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExpenseListSectionProps {
  expenses: Expense[];
  totalExpenses: number;
  onAddExpense: (newExpense: NewExpense) => void;
  onUpdateExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (id: string) => void;
  categories: Category[];
  onAddCategory: (newCategory: string) => void;
  userId: string | undefined;
}

export default function ExpenseListSection({
  expenses,
  totalExpenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  categories,
  onAddCategory,
  userId,
}: ExpenseListSectionProps) {
  return (
    <Card className="bg-background border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-foreground">Expense List</CardTitle>
        <CardDescription className="text-muted-foreground">
          Total Expenses: ${totalExpenses.toFixed(2)}
        </CardDescription>
        <AddExpenseDialog
          onAddExpense={onAddExpense}
          categories={categories}
          onAddCategory={onAddCategory}
          userId={userId || ""}
        />
      </CardHeader>
      <CardContent>
        <ExpenseList
          expenses={expenses}
          categories={categories}
          onUpdateExpense={onUpdateExpense}
          onDeleteExpense={onDeleteExpense}
        />
      </CardContent>
    </Card>
  );
}
