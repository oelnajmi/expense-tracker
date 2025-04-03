"use client";

import { useMemo } from "react";
import { Expense, Category, FinancialGoal } from "@/db/schema";
import { useExpenses } from "@/hooks/useExpenses";
import { useCategories } from "@/hooks/useCategories";
import ExpenseListSection from "./ExpenseListSection";
import ExpenseDistributionSection from "./ExpenseDistributionSection";
import SubscriptionCalendarSection from "./SubscriptionCalendarSection";
import FinancialSummarySection from "./FinancialSummarySection";
import { useFinancialGoals } from "@/hooks/useFinancialGoals";

interface ExpenseDashboardProps {
  initialExpenses: Expense[];
  initialCategories: Category[];
  initialFinancialGoals: FinancialGoal[];
  userId: string | undefined;
}

export default function ExpenseDashboard({
  initialExpenses,
  initialCategories,
  initialFinancialGoals,
  userId,
}: ExpenseDashboardProps) {
  const {
    expenses,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
  } = useExpenses(initialExpenses, userId);
  const { categories, addCategory, setCategories } = useCategories(
    initialCategories,
    userId
  );
  const { goals, handleUpdateGoals } = useFinancialGoals(
    initialFinancialGoals,
    userId
  );

  const handleAddCategory = (newCategory: string) => {
    if (userId) {
      addCategory(newCategory, userId);
    } else {
      // For logged-out users, add the category locally
      const newLocalCategory: Category = {
        id: `local-${Math.random().toString(36).substr(2, 9)}`,
        name: newCategory,
        userId: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCategories([...categories, newLocalCategory]);
    }
  };

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [expenses]
  );

  const expenseData = useMemo(() => {
    return Object.entries(
      expenses.reduce((acc, expense) => {
        const category = categories.find((c) => c.id === expense.categoryId);
        const categoryName = category ? category.name : "Subscription";
        acc[categoryName] = (acc[categoryName] || 0) + Number(expense.amount);
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, amount]) => ({ name, amount }));
  }, [expenses, categories]);

  return (
    <div className="grid gap-4">
      <ExpenseListSection
        expenses={expenses}
        totalExpenses={totalExpenses}
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        onDeleteExpense={handleDeleteExpense}
        categories={categories}
        onAddCategory={handleAddCategory}
        userId={userId}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExpenseDistributionSection expenseData={expenseData} />
        <SubscriptionCalendarSection expenses={expenses} />
        <FinancialSummarySection
          totalExpenses={totalExpenses}
          userId={userId}
          goals={goals}
          onUpdateGoals={handleUpdateGoals}
        />
      </div>
    </div>
  );
}
