import { auth } from "@/auth";
import DashboardHeader from "@/components/DashboardHeader";
import ExpenseDashboard from "@/components/ExpenseDashboard";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db/drizzle";
import { Expense, expenses } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getExpenses(userId: string) {
  const expenseList = await db
    .select()
    .from(expenses)
    .where(eq(expenses.userId, userId));

  return expenseList;
}

export default async function DashboardPage() {
  const session = await auth();
  let userExpenses: Expense[] = [];

  if (session?.user?.id) {
    userExpenses = await getExpenses(session.user.id);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto">
        <DashboardHeader />
        <Separator className="mb-6 bg-gray-200" />
        <ExpenseDashboard
          initialExpenses={userExpenses}
          userId={session?.user?.id}
        />
      </div>
    </div>
  );
}
