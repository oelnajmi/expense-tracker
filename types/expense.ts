export type ExpenseCategory = "Food" | "Transportation" | "Housing" | "Utilities" | "Entertainment" | "Subscription" | "Other" | string

export type Expense = {
  id: string
  name: string
  amount: number
  type: "monthly" | "subscription"
  category: ExpenseCategory
  subscriptionDay?: number
}

export const expenseCategories: ExpenseCategory[] = ["Food", "Transportation", "Housing", "Utilities", "Entertainment", "Other"]