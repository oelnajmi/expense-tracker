"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon } from "lucide-react";
import { NewInvestment } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddInvestmentDialogProps {
  userId: string | undefined;
  onAddInvestment: (investment: NewInvestment) => void;
}

export default function AddInvestmentDialog({
  userId,
  onAddInvestment,
}: AddInvestmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    initialAmount: 0,
    yearlyReturn: 7,
    recurringAmount: 0,
    frequency: "monthly" as "weekly" | "biweekly" | "monthly",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      onAddInvestment({
        ...formData,
        userId: "x",
        initialAmount: formData.initialAmount.toString(),
        yearlyReturn: formData.yearlyReturn.toString(),
        recurringAmount: formData.recurringAmount.toString(),
        years: 10,
      });
    } else {
      onAddInvestment({
        ...formData,
        userId,
        initialAmount: formData.initialAmount.toString(),
        yearlyReturn: formData.yearlyReturn.toString(),
        recurringAmount: formData.recurringAmount.toString(),
        years: 10,
      });
    }

    setFormData({
      name: "",
      initialAmount: 0,
      yearlyReturn: 7,
      recurringAmount: 0,
      frequency: "monthly" as "weekly" | "biweekly" | "monthly",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="text-foreground">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Add New Investment
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details for your new investment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Investment Name</label>
            <Input
              type="text"
              placeholder="e.g., S&P 500 ETF"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Investment</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.initialAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  initialAmount: Number(e.target.value),
                })
              }
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Expected Yearly Return: {formData.yearlyReturn}%
            </label>
            <Slider
              min={0}
              max={100}
              step={0.1}
              value={[formData.yearlyReturn]}
              onValueChange={(value) =>
                setFormData({ ...formData, yearlyReturn: value[0] })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Recurring Investment Amount
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.recurringAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  recurringAmount: Number(e.target.value),
                })
              }
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Investment Frequency</label>
            <Select
              value={formData.frequency}
              onValueChange={(value: "weekly" | "biweekly" | "monthly") =>
                setFormData({ ...formData, frequency: value })
              }
            >
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              type="submit"
            >
              Add Investment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
