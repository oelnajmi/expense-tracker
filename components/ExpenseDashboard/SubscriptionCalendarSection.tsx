"use client";

import { DrizzleExpense } from "@/db/schema";
import SimplifiedCalendar from "@/components/SimplifiedCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionCalendarSectionProps {
  expenses: DrizzleExpense[];
}

export default function SubscriptionCalendarSection({ expenses }: SubscriptionCalendarSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <SimplifiedCalendar expenses={expenses} />
      </CardContent>
    </Card>
  );
}
