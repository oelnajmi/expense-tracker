"use server";

import { db } from "@/db/drizzle";
import { expenses, DrizzleExpense } from "@/db/schema";
import { NewExpense } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function addExpense(newExpense: NewExpense) {
  try {
    const [addedExpense] = await db
      .insert(expenses)
      .values(newExpense)
      .returning();

    // Revalidate the ExpenseDashboard path
    revalidatePath("/expense-dashboard");

    return { success: true, expense: addedExpense };
  } catch (error) {
    console.error("Failed to add expense:", error);
    return { success: false, error: "Failed to add expense" };
  }
}

export async function updateExpense(updatedExpense: DrizzleExpense) {
  try {
    const [updated] = await db
      .update(expenses)
      .set(updatedExpense)
      .where(eq(expenses.id, updatedExpense.id))
      .returning();

    revalidatePath("/expense-dashboard");
    return { success: true, expense: updated };
  } catch (error) {
    console.error("Failed to update expense:", error);
    return { success: false, error: "Failed to update expense" };
  }
}

export async function deleteExpense(id: string) {
  try {
    await db.delete(expenses).where(eq(expenses.id, id));

    revalidatePath("/expense-dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return { success: false, error: "Failed to delete expense" };
  }
}
