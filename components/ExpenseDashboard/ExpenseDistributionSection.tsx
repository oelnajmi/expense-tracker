"use client";

import ExpenseDistribution from "@/components/ExpenseDistribution";

interface ExpenseDistributionSectionProps {
  expenseData: { name: string; amount: number }[];
}

export default function ExpenseDistributionSection({ expenseData }: ExpenseDistributionSectionProps) {
  return <ExpenseDistribution expenseData={expenseData} />;
}
