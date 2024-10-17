"use client";

import { useState } from "react";
import { Expense, NewExpense } from "@/db/schema";
import { ExpenseCategory } from "@/types/expense";
import ExpenseList from "@/components/ExpenseList";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ExpenseListSectionProps {
  expenses: Expense[];
  totalExpenses: number;
  onAddExpense: (newExpense: NewExpense) => void;
  onUpdateExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (id: string) => void;
  categories: ExpenseCategory[];
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Expense List</CardTitle>
        <CardDescription>
          Total Expenses: ${totalExpenses.toFixed(2)}
        </CardDescription>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <AddExpenseDialog
            onAddExpense={onAddExpense}
            categories={categories}
            onAddCategory={onAddCategory}
            userId={userId || ""}
          />
        </Dialog>
      </CardHeader>
      <CardContent>
        <ExpenseList
          expenses={expenses}
          onUpdateExpense={onUpdateExpense}
          onDeleteExpense={onDeleteExpense}
        />
      </CardContent>
    </Card>
  );
}
