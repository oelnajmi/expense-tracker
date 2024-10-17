"use client";

import ExpenseDistribution from "@/components/ExpenseDistribution";

interface ExpenseDistributionSectionProps {
  pieChartData: { name: string; value: number }[];
}

export default function ExpenseDistributionSection({ pieChartData }: ExpenseDistributionSectionProps) {
  return <ExpenseDistribution pieChartData={pieChartData} />;
}
