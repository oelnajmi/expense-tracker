"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FinancialGoal } from "@/db/schema";

interface FinancialSummaryProps {
  totalExpenses: number;
  userId: string | undefined;
  initialGoals: FinancialGoal[];
  onUpdateGoals: (monthlyIncome: number, savingsGoal: number) => Promise<void>;
}

export default function FinancialSummary({
  totalExpenses,
  userId,
  initialGoals,
  onUpdateGoals,
}: FinancialSummaryProps) {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (initialGoals.length > 0) {
      const goal = initialGoals[0];
      setMonthlyIncome(goal.monthlyIncome);
      setSavingsPercentage(parseFloat(goal.savingsGoal));
    }
  }, [initialGoals]);

  const handleMonthlyIncomeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/^0+/, "");
    if (value === "" || /^\d+$/.test(value)) {
      setMonthlyIncome(value);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateGoals(parseFloat(monthlyIncome) || 0, savingsPercentage);
    } finally {
      setIsSaving(false);
    }
  };

  const financialMetrics = {
    netIncome: (parseFloat(monthlyIncome) || 0) - totalExpenses,
    savingsAmount: ((parseFloat(monthlyIncome) || 0) * savingsPercentage) / 100,
    remainingAmount:
      (parseFloat(monthlyIncome) || 0) -
      totalExpenses -
      ((parseFloat(monthlyIncome) || 0) * savingsPercentage) / 100,
    biweeklySavings: (
      ((parseFloat(monthlyIncome) || 0) * savingsPercentage) /
      100 /
      2
    ).toFixed(2),
    yearlySavings: (
      (((parseFloat(monthlyIncome) || 0) * savingsPercentage) / 100) *
      12
    ).toFixed(2),
  };

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Financial Summary</CardTitle>
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
              // disabled={!userId}
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
              // disabled={!userId}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Total Expenses:</div>
          <div>${totalExpenses.toFixed(2)}</div>
          <div>Net Income:</div>
          <div>${financialMetrics.netIncome.toFixed(2)}</div>
          <div>Savings Amount:</div>
          <div>${financialMetrics.savingsAmount.toFixed(2)}</div>
          <div>Remaining Amount:</div>
          <div>${financialMetrics.remainingAmount.toFixed(2)}</div>
        </div>
        <p className="mt-4 text-sm">
          To meet your saving goals, you would need to save $
          {financialMetrics.biweeklySavings} every two weeks. This would result
          in ${financialMetrics.yearlySavings} saved per year.
        </p>
        {userId && (
          <Button
            className="w-full mt-4 align-bottom"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Financial Goals"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
