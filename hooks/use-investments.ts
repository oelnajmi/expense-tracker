"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  addInvestment,
  deleteInvestment,
  getInvestments,
  updateInvestment,
} from "@/app/actions/investments";
import { Investment, NewInvestment } from "@/db/schema";

export function useInvestments(
  initialInvestments: Investment[],
  userId: string | undefined
) {
  const [investments, setInvestments] =
    useState<Investment[]>(initialInvestments);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddInvestment = async (investment: NewInvestment) => {
    if (userId) {
      try {
        setIsLoading(true);
        const newInvestment = await addInvestment({
          ...investment,
          userId,
        });
        setInvestments((prev) => [...prev, newInvestment]);
        toast({
          title: "Success",
          description: "Investment added successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add investment",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      const tempInvestment: Investment = {
        ...investment,
        id: Math.random().toString(36).substr(2, 9),
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setInvestments((prev) => [...prev, tempInvestment]);
      toast({
        title: "Investment added locally",
        description:
          "Your investment has been added locally. Sign in to sync with the server.",
      });
    }
  };

  const handleUpdateInvestment = async (
    investmentId: string,
    investment: Partial<Investment>
  ) => {
    try {
      setIsLoading(true);
      const updatedInvestment = await updateInvestment(
        investmentId,
        investment
      );
      setInvestments((prev) =>
        prev.map((inv) => (inv.id === investmentId ? updatedInvestment : inv))
      );
      toast({
        title: "Success",
        description: "Investment updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update investment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInvestment = async (investmentId: string) => {
    try {
      setIsLoading(true);
      await deleteInvestment(investmentId);
      setInvestments((prev) => prev.filter((inv) => inv.id !== investmentId));
      toast({
        title: "Success",
        description: "Investment deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete investment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    investments,
    isLoading,
    handleAddInvestment,
    handleUpdateInvestment,
    handleDeleteInvestment,
  };
}
