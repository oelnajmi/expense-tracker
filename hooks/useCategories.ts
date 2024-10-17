"use client";

import { useState, useEffect } from "react";
import { Category } from "@/db/schema";
import { addCategory as addCategoryAction } from "@/app/actions/category";
import { DEFAULT_CATEGORIES } from "@/constants/defaultCategories";

export function useCategories(
  initialCategories: Category[],
  userId: string | undefined
) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    if (!userId && categories.length === 0) {
      const defaultCats = DEFAULT_CATEGORIES.map((name, index) => ({
        id: `default-${index + 1}`,
        name,
        userId: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      setCategories(defaultCats);
    }
  }, [userId, categories]);

  const addCategory = async (newCategory: string, userId: string) => {
    try {
      const addedCategory = await addCategoryAction(userId, newCategory);
      setCategories([...categories, addedCategory]);
    } catch (error) {
      console.error("Failed to add category:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  return { categories, addCategory, setCategories };
}
