"use client"

import React from 'react'
import { Expense } from '@/types/expense'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Pencil, Trash2 } from "lucide-react"
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ExpenseListProps {
  expenses: Expense[]
  onUpdateExpense: (updatedExpense: Expense) => void
  onDeleteExpense: (id: string) => void
}

export default function ExpenseList({ expenses, onUpdateExpense, onDeleteExpense }: ExpenseListProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [editAmount, setEditAmount] = useState("")
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleUpdateExpense = () => {
    if (editingExpense && editAmount) {
      onUpdateExpense({ ...editingExpense, amount: parseFloat(editAmount) })
      setEditingExpense(null)
      setEditAmount("")
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteExpense = () => {
    if (deletingExpenseId) {
      onDeleteExpense(deletingExpenseId)
      setDeletingExpenseId(null)
    }
  }

  const sortedExpenses = [...expenses].sort((a, b) => a.category.localeCompare(b.category))

  return (
    <ul className="space-y-2">
      {sortedExpenses.map((expense) => (
        <li key={expense.id} className="flex justify-between items-center p-2 border-b border-border">
          <div>
            <span className="font-medium">{expense.name}</span>
            <Badge variant={expense.type === "monthly" ? "default" : "secondary"} className="ml-2">
              {expense.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="mr-2">${expense.amount.toFixed(2)}</span>
            {expense.type === "subscription" && expense.subscriptionDay && (
              <span className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Day {expense.subscriptionDay}
              </span>
            )}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => {
                  setEditingExpense(expense)
                  setEditAmount(expense.amount.toString())
                  setIsEditDialogOpen(true)
                }}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
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
                  <Button type="submit" onClick={handleUpdateExpense}>Update expense</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setDeletingExpenseId(expense.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the expense.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeletingExpenseId(null)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteExpense}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </li>
      ))}
    </ul>
  )
}