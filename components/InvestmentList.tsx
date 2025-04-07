"use client";

import { Investment } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteInvestmentDialog } from "./DeleteInvestmentDialog";
import { UpdateInvestmentDialog } from "./UpdateInvestmentDialog";

interface InvestmentListProps {
  investments: Investment[];
  userId: string | undefined;
  onUpdateInvestment: (id: string, investment: Partial<Investment>) => void;
  onDeleteInvestment: (id: string) => void;
  years: number;
}

export function InvestmentList({
  investments,
  userId,
  onUpdateInvestment,
  onDeleteInvestment,
  years,
}: InvestmentListProps) {
  const calculateProjectedValue = (investment: Investment) => {
    const initialAmount = parseFloat(investment.initialAmount);
    const yearlyReturn = parseFloat(investment.yearlyReturn) / 100;
    const recurringAmount = parseFloat(investment.recurringAmount);

    // Convert all contributions to monthly for calculation
    let monthlyContribution = recurringAmount;
    if (investment.frequency === "weekly") {
      monthlyContribution = (recurringAmount * 52) / 12; // Convert weekly to monthly
    } else if (investment.frequency === "biweekly") {
      monthlyContribution = (recurringAmount * 26) / 12; // Convert biweekly to monthly
    }

    // Calculate total investment (initial + all contributions)
    const totalContributions = monthlyContribution * 12 * years;
    const totalInvestment = initialAmount + totalContributions;

    // Calculate future value of initial investment with compound interest
    const futureValueOfInitial =
      initialAmount * Math.pow(1 + yearlyReturn, years);

    // Calculate future value of monthly contributions
    // Using the formula: FV = PMT * ((1 + r/n)^(n*t) - 1) / (r/n)
    // where r is the annual rate, n is the number of compounding periods per year
    const monthlyRate = yearlyReturn / 12;
    const numberOfPeriods = years * 12;
    const futureValueOfContributions =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, numberOfPeriods) - 1) / monthlyRate);

    // Calculate total projected value
    const projectedValue = futureValueOfInitial + futureValueOfContributions;

    return {
      totalValue: projectedValue.toFixed(2),
      totalInvestment: totalInvestment.toFixed(2),
    };
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stock</TableHead>
            <TableHead>Initial Investment</TableHead>
            <TableHead>Recurring Amount</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Total Investment</TableHead>
            <TableHead>Projected Value ({years} years)</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => {
            const projected = calculateProjectedValue(investment);
            return (
              <TableRow key={investment.id}>
                <TableCell className="font-medium">{investment.name}</TableCell>
                <TableCell>
                  ${parseFloat(investment.initialAmount).toFixed(2)}
                </TableCell>
                <TableCell>
                  ${parseFloat(investment.recurringAmount).toFixed(2)} /{" "}
                  {investment.frequency}
                </TableCell>
                <TableCell>
                  {parseFloat(investment.yearlyReturn).toFixed(2)}%
                </TableCell>
                <TableCell>${projected.totalInvestment}</TableCell>
                <TableCell>${projected.totalValue}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UpdateInvestmentDialog
                      investment={investment}
                      onUpdateInvestment={onUpdateInvestment}
                    />
                    <DeleteInvestmentDialog
                      investmentId={investment.id}
                      onDeleteInvestment={onDeleteInvestment}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
