import { useState } from "react";
import { Expense, NewExpense } from "@/db/schema";
import {
  addExpense,
  updateExpense,
  deleteExpense,
} from "@/app/actions/expense";
import { useToast } from "@/hooks/use-toast";

export function useExpenses(
  initialExpenses: Expense[],
  userId: string | undefined
) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const isLoggedIn = Boolean(userId);
  const { toast } = useToast();

  const handleAddExpense = async (newExpense: NewExpense) => {
    if (isLoggedIn) {
      try {
        const addedExpense = await addExpense(newExpense);
        setExpenses([...expenses, addedExpense]);
        toast({
          title: "Expense added",
          description: "Your expense has been successfully added.",
        });
      } catch (error) {
        console.error("Failed to add expense:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add expense. Please try again.",
        });
      }
    } else {
      const tempExpense: Expense = {
        ...newExpense,
        id: Math.random().toString(36).substr(2, 9),
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
  };

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    if (isLoggedIn) {
      try {
        const updated = await updateExpense(updatedExpense.id, updatedExpense);
        setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
        toast({
          title: "Expense updated",
          description: "Your expense has been successfully updated.",
        });
      } catch (error) {
        console.error("Failed to update expense:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update expense. Please try again.",
        });
      }
    } else {
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
      try {
        await deleteExpense(id);
        setExpenses(expenses.filter((e) => e.id !== id));
        toast({
          title: "Expense deleted",
          description: "Your expense has been successfully deleted.",
        });
      } catch (error) {
        console.error("Failed to delete expense:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete expense. Please try again.",
        });
      }
    } else {
      setExpenses(expenses.filter((e) => e.id !== id));
      toast({
        title: "Expense deleted locally",
        description:
          "Your expense has been deleted locally. Sign in to sync with the server.",
      });
    }
  };

  return {
    expenses,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
  };
}
