"use server";

import { db } from "@/db/drizzle";
import { Investment, investments, NewInvestment } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getInvestments(userId: string) {
  try {
    const userInvestments = await db
      .select()
      .from(investments)
      .where(eq(investments.userId, userId))
      .orderBy(investments.createdAt);

    return userInvestments;
  } catch (error) {
    console.error("Error fetching investments:", error);
    throw new Error("Failed to fetch investments");
  }
}

export async function addInvestment(
  investment: NewInvestment
): Promise<Investment> {
  try {
    const [newInvestment] = await db
      .insert(investments)
      .values(investment)
      .returning();

    revalidatePath("/dashboard");
    return newInvestment;
  } catch (error) {
    console.error("Error adding investment:", error);
    throw new Error("Failed to add investment");
  }
}

export async function updateInvestment(
  investmentId: string,
  investment: Partial<NewInvestment>
): Promise<Investment> {
  try {
    const [updatedInvestment] = await db
      .update(investments)
      .set({
        ...investment,
        updatedAt: new Date(),
      })
      .where(eq(investments.id, investmentId))
      .returning();

    revalidatePath("/dashboard");
    return updatedInvestment;
  } catch (error) {
    console.error("Error updating investment:", error);
    throw new Error("Failed to update investment");
  }
}

export async function deleteInvestment(investmentId: string) {
  try {
    await db.delete(investments).where(eq(investments.id, investmentId));
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting investment:", error);
    throw new Error("Failed to delete investment");
  }
}
