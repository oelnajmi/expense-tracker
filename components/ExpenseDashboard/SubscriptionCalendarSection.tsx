"use client";

import { Expense } from "@/db/schema";
import SimplifiedCalendar from "@/components/SimplifiedCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionCalendarSectionProps {
  expenses: Expense[];
}

export default function SubscriptionCalendarSection({
  expenses,
}: SubscriptionCalendarSectionProps) {
  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Subscription Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <SimplifiedCalendar expenses={expenses} />
      </CardContent>
    </Card>
  );
}
