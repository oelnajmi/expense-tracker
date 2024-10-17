"use client";

import { useState, useMemo } from "react";
import { DrizzleExpense } from "@/db/schema";
import { useExpenses } from "@/hooks/useExpenses";
import { useCategories } from "@/hooks/useCategories";
import ExpenseListSection from "./ExpenseListSection";
import ExpenseDistributionSection from "./ExpenseDistributionSection";
import SubscriptionCalendarSection from "./SubscriptionCalendarSection";
import FinancialSummarySection from "./FinancialSummarySection";

interface ExpenseDashboardProps {
  initialExpenses: DrizzleExpense[];
  userId: string | undefined;
}

export default function ExpenseDashboard({
  initialExpenses,
  userId,
}: ExpenseDashboardProps) {
  const {
    expenses,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
  } = useExpenses(initialExpenses, userId);
  const { categories, addCategory } = useCategories();

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [expenses]
  );

  const pieChartData = useMemo(() => {
    return Object.entries(
      expenses.reduce((acc, expense) => {
        acc[expense.category] =
          (acc[expense.category] || 0) + Number(expense.amount);
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  return (
    <div className="grid gap-4">
      <ExpenseListSection
        expenses={expenses}
        totalExpenses={totalExpenses}
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        onDeleteExpense={handleDeleteExpense}
        categories={categories}
        onAddCategory={addCategory}
        userId={userId}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpenseDistributionSection pieChartData={pieChartData} />
        <SubscriptionCalendarSection expenses={expenses} />
      </div>
      <FinancialSummarySection totalExpenses={totalExpenses} />
    </div>
  );
}
