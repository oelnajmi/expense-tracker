import { auth } from "@/auth";
import DashboardHeader from "@/components/DashboardHeader";
import ExpenseDashboard from "@/components/ExpenseDashboard";
import { Separator } from "@/components/ui/separator";
import { getExpenses } from "../actions/expense";
import { getCategories } from "../actions/category";
import { Expense, Category } from "@/db/schema";

export default async function DashboardPage() {
  console.log("server");
  const session = await auth();
  let userExpenses: Expense[] = [];
  let userCategories: Category[] = [];

  if (session?.user?.id) {
    userExpenses = await getExpenses(session.user.id);
    userCategories = await getCategories(session.user.id);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto p-4">
        <DashboardHeader />
        <Separator className="mb-6 bg-border" />
        <ExpenseDashboard
          initialExpenses={userExpenses}
          initialCategories={userCategories}
          userId={session?.user?.id}
        />
      </div>
    </div>
  );
}
