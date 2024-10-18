"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyExpenses = [
  { id: "1", name: "Groceries", amount: 150, category: "Food" },
  { id: "2", name: "Netflix", amount: 15, category: "Entertainment" },
  { id: "3", name: "Electricity", amount: 80, category: "Utilities" },
];

const dummyChartData = [
  { name: "Food", amount: 300 },
  { name: "Entertainment", amount: 150 },
  { name: "Utilities", amount: 200 },
];

export default function DashboardPreview() {
  return (
    <div className="grid gap-4 pointer-events-none">
      <Card className="bg-background border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-foreground">Expense List</CardTitle>
          <CardDescription className="text-muted-foreground">
            Total Expenses: $245.00
          </CardDescription>
          <Button
            variant="outline"
            size="icon"
            className="text-foreground opacity-50"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {dummyExpenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center p-2 border-b border-border"
              >
                <div>
                  <span className="font-medium text-foreground">
                    {expense.name}
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    {expense.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-foreground">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <Button variant="outline" size="sm" className="opacity-50">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="opacity-50"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square flex items-center justify-center border rounded-md text-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <Input
                id="monthlyIncome"
                type="text"
                value="$3000"
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="savingsPercentage">Savings Goal (%)</Label>
              <Input
                id="savingsPercentage"
                type="number"
                value="20"
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Total Expenses:</div>
            <div>$245.00</div>
            <div>Net Income:</div>
            <div>$2755.00</div>
            <div>Savings Amount:</div>
            <div>$600.00</div>
            <div>Remaining Amount:</div>
            <div>$2155.00</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
