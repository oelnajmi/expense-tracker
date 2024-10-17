"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseCategory } from "@/types/expense";
import { NewExpense } from "@/db/schema";

interface AddExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: NewExpense) => void;
  categories: ExpenseCategory[];
  onAddCategory: (category: string) => void;
  userId: string;
}

export default function AddExpenseDialog({
  isOpen,
  onClose,
  onAddExpense,
  categories,
  onAddCategory,
  userId,
}: AddExpenseDialogProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"monthly" | "subscription">("monthly");
  const [category, setCategory] = useState<ExpenseCategory>("Other");
  const [subscriptionDay, setSubscriptionDay] = useState<number>(1);
  const [newCategory, setNewCategory] = useState("");

  const handleAddExpense = () => {
    if (name && amount) {
      const newExpense: NewExpense = {
        name,
        amount,
        type,
        category: type === "subscription" ? "Subscription" : category,
        subscriptionDay: type === "subscription" ? subscriptionDay : null,
        userId,
      };
      onAddExpense(newExpense);
      resetForm();
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory as ExpenseCategory)) {
      onAddCategory(newCategory);
      setCategory(newCategory as ExpenseCategory);
      setNewCategory("");
    }
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setType("monthly");
    setCategory("Other");
    setSubscriptionDay(1);
    setNewCategory("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Enter the details of your new expense here. Click save when youre
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              value={type}
              onValueChange={(value) =>
                setType(value as "monthly" | "subscription")
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select expense type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="monthly" className="hover:bg-gray-100">
                  Monthly
                </SelectItem>
                <SelectItem value="subscription" className="hover:bg-gray-100">
                  Subscription
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {type === "monthly" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={category}
                  onValueChange={(value) =>
                    setCategory(value as ExpenseCategory)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="hover:bg-gray-100"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newCategory" className="text-right">
                  New Category
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="newCategory"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-grow"
                    placeholder="Enter new category"
                  />
                  <Button
                    className="bg-black text-white"
                    type="button"
                    onClick={handleAddCategory}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </>
          )}
          {type === "subscription" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subscriptionDay" className="text-right">
                Day of Month
              </Label>
              <Select
                value={subscriptionDay.toString()}
                onValueChange={(value) => setSubscriptionDay(parseInt(value))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem
                      key={day}
                      value={day.toString()}
                      className="hover:bg-gray-100"
                    >
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            className="bg-black text-white"
            type="submit"
            onClick={handleAddExpense}
          >
            Save expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
