"use client";

import FinancialSummary from "@/components/FinancialSummary";
import { FinancialGoal } from "@/db/schema";

interface FinancialSummarySectionProps {
  totalExpenses: number;
  userId: string | undefined;
  goals: FinancialGoal[];
  onUpdateGoals: (monthlyIncome: number, savingsGoal: number) => Promise<void>;
}

export default function FinancialSummarySection({
  totalExpenses,
  userId,
  goals,
  onUpdateGoals,
}: FinancialSummarySectionProps) {
  return (
    <FinancialSummary
      totalExpenses={totalExpenses}
      userId={userId}
      initialGoals={goals}
      onUpdateGoals={onUpdateGoals}
    />
  );
}
