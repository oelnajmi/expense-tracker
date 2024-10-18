"use client";

import React, { useState } from "react";
import {
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
import { NewExpense, Category } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface AddExpenseDialogProps {
  onAddExpense: (expense: NewExpense) => void;
  categories: Category[];
  onAddCategory: (category: string, userId: string | undefined) => void;
  userId: string;
}

export default function AddExpenseDialog({
  onAddExpense,
  categories,
  onAddCategory,
  userId,
}: AddExpenseDialogProps) {
  const { status } = useSession();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"monthly" | "subscription">("monthly");
  const [categoryId, setCategoryId] = useState<string>("");
  const [subscriptionDay, setSubscriptionDay] = useState<number>(1);
  const [newCategory, setNewCategory] = useState("");

  const handleAddExpense = () => {
    if (name && amount && (type === "subscription" || categoryId)) {
      const subscriptionCategory = categories.find(
        (cat) => cat.name === "Subscription"
      );
      const newExpense: NewExpense = {
        name,
        amount,
        type,
        categoryId:
          type === "subscription" ? subscriptionCategory?.id || "" : categoryId,
        subscriptionDay: type === "subscription" ? subscriptionDay : null,
        userId,
      };
      onAddExpense(newExpense);
      resetForm();
    }
  };

  const handleAddCategory = () => {
    if (newCategory && userId) {
      onAddCategory(newCategory, userId);
      setNewCategory("");
      toast({
        title: "Category added",
        description: `Your category "${newCategory}" has been successfully added.`,
      });
    }
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setType("monthly");
    setCategoryId("");
    setSubscriptionDay(1);
    setNewCategory("");
  };

  return (
    <DialogContent className="bg-background text-foreground">
      <DialogHeader>
        <DialogTitle className="text-foreground">Add New Expense</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Fill in the details for your new expense.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right text-foreground">
            Name
          </Label>
          <Input
            id="name"
            className="col-span-3 bg-background text-foreground border-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-right text-foreground">
            Amount
          </Label>
          <Input
            id="amount"
            type="text"
            className="col-span-3 bg-background text-foreground border-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right text-foreground">
            Type
          </Label>
          <Select
            value={type}
            onValueChange={(value) =>
              setType(value as "monthly" | "subscription")
            }
          >
            <SelectTrigger className="col-span-3 bg-background text-foreground border-input">
              <SelectValue placeholder="Select expense type" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {type === "monthly" && (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right text-foreground">
                Category
              </Label>
              <Select
                value={categoryId}
                onValueChange={(value) => setCategoryId(value)}
              >
                <SelectTrigger className="col-span-3 bg-background text-foreground border-input">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  {categories
                    .filter((cat) => cat.name !== "Subscription")
                    .map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              {status === "authenticated" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="newCategory"
                    className="text-right text-foreground"
                  >
                    New Category
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input
                      id="newCategory"
                      className="flex-grow bg-background text-foreground border-input"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter new category"
                    />
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      type="button"
                      onClick={handleAddCategory}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
              {status !== "authenticated" && (
                <div className="col-span-4 text-center text-sm text-muted-foreground mt-2">
                  Log in to add a new category
                </div>
              )}
            </div>
          </>
        )}
        {type === "subscription" && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="subscriptionDay"
              className="text-right text-foreground"
            >
              Day of Month
            </Label>
            <Select
              value={subscriptionDay.toString()}
              onValueChange={(value) => setSubscriptionDay(parseInt(value))}
            >
              <SelectTrigger className="col-span-3 bg-background text-foreground border-input">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <SelectItem key={day} value={day.toString()}>
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
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          type="submit"
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
