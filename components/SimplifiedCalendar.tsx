"use client";

import React from "react";
import { Expense } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SimplifiedCalendarProps {
  expenses: Expense[];
}

export default function SimplifiedCalendar({
  expenses,
}: SimplifiedCalendarProps) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const subscriptions = expenses.filter(
          (e) => e.type === "subscription" && e.subscriptionDay === day
        );

        return (
          <div key={day} className="relative group cursor-pointer">
            <div
              className={`flex items-center justify-center h-10 rounded-full transition-colors ${
                subscriptions.length > 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {day}
            </div>
            {subscriptions.length > 0 && (
              <Card className="absolute z-10 hidden group-hover:block bg-card text-card-foreground border-border rounded-md shadow-lg -mt-2 left-full ml-2 w-64">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">Day {day} Expenses</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {subscriptions.length} subscription
                    {subscriptions.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      className="text-sm flex justify-between items-center mb-1"
                    >
                      <span>{sub.name}</span>
                      <span className="font-semibold">
                        ${parseFloat(sub.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="text-sm font-bold flex justify-between items-center mt-2 pt-2 border-t border-border">
                    <span>Total</span>
                    <span>
                      $
                      {subscriptions
                        .reduce((sum, sub) => sum + parseFloat(sub.amount), 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
}
