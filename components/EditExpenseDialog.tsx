import React, { useState } from "react";
import { Expense } from "@/db/schema";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

interface EditExpenseDialogProps {
  expense: Expense;
  onUpdateExpense: (updatedExpense: Expense) => void;
}

export default function EditExpenseDialog({
  expense,
  onUpdateExpense,
}: EditExpenseDialogProps) {
  const [editAmount, setEditAmount] = useState(expense.amount.toString());

  const handleUpdateExpense = () => {
    if (editAmount) {
      onUpdateExpense({ ...expense, amount: editAmount });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setEditAmount(expense.amount.toString())}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update the amount for this expense.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-amount" className="text-right">
              Amount
            </Label>
            <Input
              id="edit-amount"
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-black text-white"
            type="submit"
            onClick={handleUpdateExpense}
          >
            Update expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
