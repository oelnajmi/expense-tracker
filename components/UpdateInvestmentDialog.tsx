"use client";

import React from "react";
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
import { Pencil } from "lucide-react";
import { Investment } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateInvestmentDialogProps {
  investment: Investment;
  onUpdateInvestment: (id: string, investment: Partial<Investment>) => void;
}

export function UpdateInvestmentDialog({
  investment,
  onUpdateInvestment,
}: UpdateInvestmentDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: investment.name,
    initialAmount: investment.initialAmount,
    recurringAmount: investment.recurringAmount,
    yearlyReturn: investment.yearlyReturn,
    frequency: investment.frequency,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInvestment(investment.id, formData);
    setOpen(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Update Investment
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the details of your investment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Investment name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialAmount">Initial Investment</Label>
            <Input
              id="initialAmount"
              name="initialAmount"
              type="number"
              value={formData.initialAmount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recurringAmount">Recurring Amount</Label>
            <Input
              id="recurringAmount"
              name="recurringAmount"
              type="number"
              value={formData.recurringAmount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearlyReturn">Yearly Return (%)</Label>
            <Input
              id="yearlyReturn"
              name="yearlyReturn"
              type="number"
              value={formData.yearlyReturn}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) =>
                handleChange({ target: { name: "frequency", value } })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Biweekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-foreground"
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
