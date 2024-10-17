"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ExpenseCategory,
  expenseCategories as defaultCategories,
} from "@/types/expense";
import ExpenseList from "@/components/ExpenseList";
import ExpenseDistribution from "@/components/ExpenseDistribution";
import SimplifiedCalendar from "@/components/SimplifiedCalendar";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import FinancialSummary from "@/components/FinancialSummary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DrizzleExpense, NewExpense } from "@/db/schema";
import {
  addExpense,
  updateExpense,
  deleteExpense,
} from "@/app/actions/expense";
import { useToast } from "@/hooks/use-toast";

interface ExpenseDashboardProps {
  initialExpenses: DrizzleExpense[];
  userId: string | undefined;
}

export default function ExpenseDashboard({
  initialExpenses,
  userId,
}: ExpenseDashboardProps) {
  const [expenses, setExpenses] = useState<DrizzleExpense[]>(initialExpenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] =
    useState<ExpenseCategory[]>(defaultCategories);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(userId));
  const { toast } = useToast();

  useEffect(() => {
    setExpenses(initialExpenses);
    setIsLoggedIn(Boolean(userId));
  }, [initialExpenses, userId]);

  const handleAddExpense = async (newExpense: NewExpense) => {
    if (isLoggedIn) {
      const result = await addExpense(newExpense);
      if (result.success && result.expense) {
        setExpenses([...expenses, result.expense]);
        toast({
          title: "Expense added",
          description: "Your expense has been successfully added.",
        });
      } else {
        console.error("Failed to add expense:", result.error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            result.error || "Failed to add expense. Please try again.",
        });
      }
    } else {
      // For logged-out users, just update the local state
      const tempExpense: DrizzleExpense = {
        ...newExpense,
        id: Math.random().toString(36).substr(2, 9),
        userId: "temp",
        createdAt: new Date(),
        updatedAt: new Date(),
        subscriptionDay: newExpense.subscriptionDay ?? null,
      };
      setExpenses([...expenses, tempExpense]);
      toast({
        title: "Expense added locally",
        description:
          "Your expense has been added locally. Sign in to sync with the server.",
      });
    }
    setIsDialogOpen(false);
  };

  const handleUpdateExpense = async (updatedExpense: DrizzleExpense) => {
    if (isLoggedIn) {
      const result = await updateExpense(updatedExpense);
      if (result.success && result.expense) {
        setExpenses(
          expenses.map((e) => (e.id === result.expense.id ? result.expense : e))
        );
        toast({
          title: "Expense updated",
          description: "Your expense has been successfully updated.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            result.error || "Failed to update expense. Please try again.",
        });
      }
    } else {
      // For logged-out users, just update the local state
      setExpenses(
        expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
      );
      toast({
        title: "Expense updated locally",
        description:
          "Your expense has been updated locally. Sign in to sync with the server.",
      });
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (isLoggedIn) {
      const result = await deleteExpense(id);
      if (result.success) {
        setExpenses(expenses.filter((e) => e.id !== id));
        toast({
          title: "Expense deleted",
          description: "Your expense has been successfully deleted.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            result.error || "Failed to delete expense. Please try again.",
        });
      }
    } else {
      // For logged-out users, just update the local state
      setExpenses(expenses.filter((e) => e.id !== id));
      toast({
        title: "Expense deleted locally",
        description:
          "Your expense has been deleted locally. Sign in to sync with the server.",
      });
    }
  };

  const addCategory = (newCategory: string) => {
    if (!categories.includes(newCategory as ExpenseCategory)) {
      setCategories([...categories, newCategory as ExpenseCategory]);
    }
  };

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [expenses]
  );

  const pieChartData = useMemo(() => {
    return Object.entries(
      expenses.reduce((acc, expense) => {
        acc[expense.category] =
          (acc[expense.category] || 0) + Number(expense.amount);
        return acc;
      }, {} as Record<ExpenseCategory, number>)
    ).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Expense List</CardTitle>
          <CardDescription>
            Total Expenses: ${totalExpenses.toFixed(2)}
          </CardDescription>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <ExpenseList
            expenses={expenses}
            onUpdateExpense={handleUpdateExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpenseDistribution pieChartData={pieChartData} />
        <Card>
          <CardHeader>
            <CardTitle>Subscription Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <SimplifiedCalendar expenses={expenses} />
          </CardContent>
        </Card>
      </div>
      <FinancialSummary totalExpenses={totalExpenses} />

      <AddExpenseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddExpense={handleAddExpense}
        categories={categories}
        onAddCategory={addCategory}
        userId={userId || ""}
      />
    </div>
  );
}
