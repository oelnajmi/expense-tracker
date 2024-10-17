"use client";

import FinancialSummary from "@/components/FinancialSummary";

interface FinancialSummarySectionProps {
  totalExpenses: number;
}

export default function FinancialSummarySection({ totalExpenses }: FinancialSummarySectionProps) {
  return <FinancialSummary totalExpenses={totalExpenses} />;
}
