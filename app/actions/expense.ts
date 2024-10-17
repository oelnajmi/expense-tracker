"use server";

import { db } from "@/db/drizzle";
import { NewExpense, Expense, expenses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addExpense(newExpense: NewExpense): Promise<Expense> {
  const [expense] = await db.insert(expenses).values(newExpense).returning();
  revalidatePath("/dashboard");
  return expense;
}

export async function updateExpense(
  id: string,
  updatedExpense: Partial<NewExpense>
): Promise<Expense> {
  const [expense] = await db
    .update(expenses)
    .set(updatedExpense)
    .where(eq(expenses.id, id))
    .returning();
  revalidatePath("/dashboard");
  return expense;
}

export async function deleteExpense(id: string): Promise<void> {
  await db.delete(expenses).where(eq(expenses.id, id));
  revalidatePath("/dashboard");
}

export async function getExpenses(userId: string): Promise<Expense[]> {
  return db.select().from(expenses).where(eq(expenses.userId, userId));
}
