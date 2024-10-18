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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="text-foreground">
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
          categories={categories}
          onUpdateExpense={onUpdateExpense}
          onDeleteExpense={onDeleteExpense}
        />
      </CardContent>
    </Card>
  );
}
