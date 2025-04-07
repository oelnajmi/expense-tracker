"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddInvestmentDialog from "../AddInvestmentDialog";
import { Investment, NewInvestment } from "@/db/schema";
import { InvestmentList } from "../InvestmentList";
import { useState } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface InvestmentSectionProps {
  investments: Investment[];
  isLoading: boolean;
  userId: string | undefined;
  onAddInvestment: (investment: NewInvestment) => void;
  onUpdateInvestment: (
    investmentId: string,
    investment: Partial<Investment>
  ) => void;
  onDeleteInvestment: (investmentId: string) => void;
}

export default function InvestmentSection({
  investments,
  isLoading,
  userId,
  onAddInvestment,
  onUpdateInvestment,
  onDeleteInvestment,
}: InvestmentSectionProps) {
  const [years, setYears] = useState(10);

  return (
    <Card className="bg-background border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-foreground">
          Investment Projections
        </CardTitle>
        <AddInvestmentDialog
          onAddInvestment={onAddInvestment}
          userId={userId}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Investment Period (years)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              min={1}
              max={30}
              step={1}
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
              className="w-[200px]"
            />
            <span className="text-sm text-muted-foreground">{years} years</span>
          </div>

          <InvestmentList
            userId={userId}
            investments={investments}
            onDeleteInvestment={onDeleteInvestment}
            onUpdateInvestment={onUpdateInvestment}
            years={years}
          />
        </div>
      </CardContent>
    </Card>
  );
}
