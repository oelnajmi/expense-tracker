import { useState } from "react";
import { ExpenseCategory, expenseCategories as defaultCategories } from "@/types/expense";

export function useCategories() {
  const [categories, setCategories] = useState<ExpenseCategory[]>(defaultCategories);

  const addCategory = (newCategory: string) => {
    if (!categories.includes(newCategory as ExpenseCategory)) {
      setCategories([...categories, newCategory as ExpenseCategory]);
    }
  };

  return { categories, addCategory };
}
