"use server";

import { db } from "@/db/drizzle";
import { financialGoals, FinancialGoal } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFinancialGoals(
  userID: string
): Promise<FinancialGoal[]> {
  try {
    const goals = await db
      .select()
      .from(financialGoals)
      .where(eq(financialGoals.userId, userID));

    return goals;
  } catch (error) {
    console.error("Error fetching financial goals:", error);
    throw new Error("Failed to fetch financial goals");
  }
}

export async function updateFinancialGoals(
  userId: string,
  monthlyIncome: number,
  savingsGoal: number
): Promise<void> {
  try {
    const existing = await getFinancialGoals(userId);

    if (existing.length > 0) {
      await db
        .update(financialGoals)
        .set({
          monthlyIncome: monthlyIncome.toString(),
          savingsGoal: savingsGoal.toString(),
          updatedAt: new Date(),
        })
        .where(eq(financialGoals.userId, userId));
    } else {
      await db.insert(financialGoals).values({
        userId,
        monthlyIncome: monthlyIncome.toString(),
        savingsGoal: savingsGoal.toString(),
      });
    }
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error updating financial goals:", error);
    throw new Error("Failed to update financial goals");
  }
}
