import { useState } from "react";
import { DrizzleExpense, NewExpense } from "@/db/schema";
import { addExpense, updateExpense, deleteExpense } from "@/app/actions/expense";
import { useToast } from "@/hooks/use-toast";

export function useExpenses(initialExpenses: DrizzleExpense[], userId: string | undefined) {
  const [expenses, setExpenses] = useState<DrizzleExpense[]>(initialExpenses);
  const isLoggedIn = Boolean(userId);
  const { toast } = useToast();

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
          description: result.error || "Failed to add expense. Please try again.",
        });
      }
    } else {
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
        description: "Your expense has been added locally. Sign in to sync with the server.",
      });
    }
  };

  const handleUpdateExpense = async (updatedExpense: DrizzleExpense) => {
    if (isLoggedIn) {
      const result = await updateExpense(updatedExpense);
      if (result.success && result.expense) {
        setExpenses(expenses.map((e) => (e.id === result.expense.id ? result.expense : e)));
        toast({
          title: "Expense updated",
          description: "Your expense has been successfully updated.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to update expense. Please try again.",
        });
      }
    } else {
      setExpenses(expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e)));
      toast({
        title: "Expense updated locally",
        description: "Your expense has been updated locally. Sign in to sync with the server.",
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
          description: result.error || "Failed to delete expense. Please try again.",
        });
      }
    } else {
      setExpenses(expenses.filter((e) => e.id !== id));
      toast({
        title: "Expense deleted locally",
        description: "Your expense has been deleted locally. Sign in to sync with the server.",
      });
    }
  };

  return { expenses, handleAddExpense, handleUpdateExpense, handleDeleteExpense };
}
