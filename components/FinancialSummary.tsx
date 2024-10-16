"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FinancialSummaryProps {
  totalExpenses: number;
}

export default function FinancialSummary({
  totalExpenses,
}: FinancialSummaryProps) {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);

  const handleMonthlyIncomeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/^0+/, "");
    if (value === "" || /^\d+$/.test(value)) {
      setMonthlyIncome(value);
    }
  };

  const financialMetrics = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const savingsAmount = (income * savingsPercentage) / 100;
    const netIncome = income - totalExpenses;
    const remainingAmount = netIncome - savingsAmount;
    const biweeklySavings = (savingsAmount / 2).toFixed(2);
    const yearlySavings = (savingsAmount * 12).toFixed(2);

    return {
      netIncome: netIncome.toFixed(2),
      savingsAmount: savingsAmount.toFixed(2),
      remainingAmount: remainingAmount.toFixed(2),
      biweeklySavings,
      yearlySavings,
    };
  }, [monthlyIncome, savingsPercentage, totalExpenses]);

  return (
    <Card className="mt-4 border-none">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="monthlyIncome">Monthly Income</Label>
            <Input
              id="monthlyIncome"
              type="text"
              inputMode="numeric"
              value={monthlyIncome}
              onChange={handleMonthlyIncomeChange}
              placeholder="Enter your monthly income"
            />
          </div>
          <div>
            <Label htmlFor="savingsPercentage">Savings Goal (%)</Label>
            <Input
              id="savingsPercentage"
              type="number"
              value={savingsPercentage}
              onChange={(e) => setSavingsPercentage(Number(e.target.value))}
              placeholder="Enter savings percentage"
              min="0"
              max="100"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Total Expenses:</div>
          <div>${totalExpenses.toFixed(2)}</div>
          <div>Net Income:</div>
          <div>${financialMetrics.netIncome}</div>
          <div>Savings Amount:</div>
          <div>${financialMetrics.savingsAmount}</div>
          <div>Remaining Amount:</div>
          <div>${financialMetrics.remainingAmount}</div>
        </div>
        <p className="mt-4 text-sm">
          To meet your saving goals, you would need to save $
          {financialMetrics.biweeklySavings} every two weeks. This would result
          in ${financialMetrics.yearlySavings} saved per year.
        </p>
      </CardContent>
    </Card>
  );
}
