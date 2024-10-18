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
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExpense: Expense = {
      ...expense,
      name: editName,
      amount: editAmount,
      categoryId: editCategoryId,
      subscriptionDay:
        expense.type === "subscription" ? editSubscriptionDay : null,
    };
    onUpdateExpense(updatedExpense);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary/90"
          onClick={() => setIsOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Expense</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Make changes to your expense here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateExpense}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right text-foreground">
                Name
              </Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3 bg-background text-foreground border-input"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="edit-amount"
                className="text-right text-foreground"
              >
                Amount
              </Label>
              <Input
                id="edit-amount"
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="col-span-3 bg-background text-foreground border-input"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="edit-category"
                className="text-right text-foreground"
              >
                Category
              </Label>
              <Select
                value={editCategoryId}
                onValueChange={(value) => setEditCategoryId(value)}
              >
                <SelectTrigger className="col-span-3 bg-background text-foreground border-input">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {expense.type === "subscription" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-subscription-day"
                  className="text-right text-foreground"
                >
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
                  className="col-span-3 bg-background text-foreground border-input"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
