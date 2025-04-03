import { useState } from "react";
import { FinancialGoal } from "@/db/schema";
import { updateFinancialGoals } from "@/app/actions/financial-goals";
import { useToast } from "@/hooks/use-toast";

export function useFinancialGoals(
  initialGoals: FinancialGoal[],
  userId: string | undefined
) {
  const [goals, setGoals] = useState<FinancialGoal[]>(initialGoals);
  const isLoggedIn = Boolean(userId);
  const { toast } = useToast();

  const handleUpdateGoals = async (
    monthlyIncome: number,
    savingsGoal: number
  ) => {
    if (isLoggedIn) {
      try {
        await updateFinancialGoals(userId!, monthlyIncome, savingsGoal);
        const updatedGoal: FinancialGoal = {
          id: goals[0]?.id || crypto.randomUUID(),
          userId: userId!,
          monthlyIncome: monthlyIncome.toString(),
          savingsGoal: savingsGoal.toString(),
          createdAt: goals[0]?.createdAt || new Date(),
          updatedAt: new Date(),
        };
        setGoals([updatedGoal]);
        toast({
          title: "Financial goals updated",
          description: "Your financial goals have been successfully updated.",
        });
      } catch (error) {
        console.error("Failed to update financial goals:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update financial goals. Please try again.",
        });
      }
    } else {
      const tempGoal: FinancialGoal = {
        id: crypto.randomUUID(),
        userId: "default",
        monthlyIncome: monthlyIncome.toString(),
        savingsGoal: savingsGoal.toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setGoals([tempGoal]);
      toast({
        title: "Financial goals updated locally",
        description:
          "Your financial goals have been updated locally. Sign in to sync with the server.",
      });
    }
  };

  return {
    goals,
    handleUpdateGoals,
  };
}
