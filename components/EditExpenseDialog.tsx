import React, { useState } from "react";
import { Expense, Category } from "@/db/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";

interface EditExpenseDialogProps {
  expense: Expense;
  categories: Category[];
  onUpdateExpense: (updatedExpense: Expense) => void;
}

export default function EditExpenseDialog({
  expense,
  categories,
  onUpdateExpense,
}: EditExpenseDialogProps) {
  const [editName, setEditName] = useState(expense.name);
  const [editAmount, setEditAmount] = useState(expense.amount);
  const [editCategoryId, setEditCategoryId] = useState(expense.categoryId);
  const [editSubscriptionDay, setEditSubscriptionDay] = useState(
    expense.subscriptionDay || 1
  );

  const handleUpdateExpense = () => {
    const updatedExpense: Expense = {
      ...expense,
      name: editName,
      amount: editAmount,
      categoryId: editCategoryId,
      subscriptionDay:
        expense.type === "subscription" ? editSubscriptionDay : null,
    };
    onUpdateExpense(updatedExpense);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Make changes to your expense here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Name
            </Label>
            <Input
              id="edit-name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="col-span-3"
            />
          </div>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-category" className="text-right">
              Category
            </Label>
            <Select
              value={editCategoryId}
              onValueChange={(value) => setEditCategoryId(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="hover:bg-gray-100"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {expense.type === "subscription" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-subscription-day" className="text-right">
                Day of Month
              </Label>
              <Input
                id="edit-subscription-day"
                type="number"
                min="1"
                max="31"
                value={editSubscriptionDay}
                onChange={(e) =>
                  setEditSubscriptionDay(parseInt(e.target.value))
                }
                className="col-span-3"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            className="
            bg-black text-white
            "
            type="submit"
            onClick={handleUpdateExpense}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
