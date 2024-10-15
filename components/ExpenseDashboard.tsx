"use client"

import { useState, useMemo } from "react"
import { Expense, ExpenseCategory, expenseCategories as defaultCategories } from "@/types/expense"
import ExpenseList from "@/components/ExpenseList"
import ExpenseDistribution from "@/components/ExpenseDistribution"
import SimplifiedCalendar from "@/components/SimplifiedCalendar"
import AddExpenseDialog from "@/components/AddExpenseDialog"
import FinancialSummary from "@/components/FinancialSummary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [categories, setCategories] = useState<ExpenseCategory[]>(defaultCategories)

  const addExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense])
    setIsDialogOpen(false)
  }

  const updateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    )
    setExpenses(updatedExpenses)
  }

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  const addCategory = (newCategory: string) => {
    if (!categories.includes(newCategory as ExpenseCategory)) {
      setCategories([...categories, newCategory as ExpenseCategory])
    }
  }

  const totalExpenses = useMemo(() => expenses.reduce((sum, expense) => sum + expense.amount, 0), [expenses])

  const pieChartData = useMemo(() => {
    return Object.entries(
      expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
      }, {} as Record<ExpenseCategory, number>)
    ).map(([name, value]) => ({ name, value }))
  }, [expenses])

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Expense Dashboard</h1>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Expense List</CardTitle>
              <CardDescription>Total Expenses: ${totalExpenses.toFixed(2)}</CardDescription>
              <Button variant="outline" size="icon" onClick={() => setIsDialogOpen(true)}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ExpenseList
                expenses={expenses}
                onUpdateExpense={updateExpense}
                onDeleteExpense={deleteExpense}
              />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpenseDistribution pieChartData={pieChartData} />
            <Card>
              <CardHeader>
                <CardTitle>Subscription Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <SimplifiedCalendar expenses={expenses} />
              </CardContent>
            </Card>
          </div>
          <FinancialSummary totalExpenses={totalExpenses} />
        </div>
      </div>
      <AddExpenseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddExpense={addExpense}
        categories={categories}
        onAddCategory={addCategory}
      />
    </div>
  )
}