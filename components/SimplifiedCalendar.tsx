"use client"

import React from 'react'
import { Expense } from '@/types/expense'

interface SimplifiedCalendarProps {
  expenses: Expense[]
}

export default function SimplifiedCalendar({ expenses }: SimplifiedCalendarProps) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const subscriptions = expenses.filter(e => e.type === "subscription" && e.subscriptionDay === day)

        return (
          <div
            key={day}
            className={`relative flex items-center justify-center h-10 rounded-full ${
              subscriptions.length > 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
            } group`}
          >
            {day}
            {subscriptions.length > 0 && (
              <div className="absolute z-10 hidden group-hover:block bg-popover border rounded-md p-2 shadow-lg -mt-2 left-full ml-2">
                {subscriptions.map(sub => (
                  <div key={sub.id} className="text-sm">
                    {sub.name}: ${sub.amount.toFixed(2)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}