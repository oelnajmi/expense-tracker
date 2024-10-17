"use server";

import { db } from "@/db/drizzle";
import { Category, categories, expenses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Other",
];

export async function getCategories(userId: string): Promise<Category[]> {
  let categoryList = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, userId));

  if (categoryList.length === 0) {
    const defaultCategories = DEFAULT_CATEGORIES.map((name) => ({
      name,
      userId,
    }));

    categoryList = await db
      .insert(categories)
      .values(defaultCategories)
      .returning();
  }

  return categoryList;
}

export async function addCategory(
  userId: string,
  name: string
): Promise<Category> {
  const [newCategory] = await db
    .insert(categories)
    .values({ name, userId })
    .returning();

  revalidatePath("/dashboard");
  return newCategory;
}

export async function updateCategory(
  id: string,
  name: string
): Promise<Category> {
  const [updatedCategory] = await db
    .update(categories)
    .set({ name })
    .where(eq(categories.id, id))
    .returning();

  revalidatePath("/dashboard");
  return updatedCategory;
}

export async function deleteCategory(id: string): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(expenses).where(eq(expenses.categoryId, id));
    await tx.delete(categories).where(eq(categories.id, id));
  });

  revalidatePath("/dashboard");
}
