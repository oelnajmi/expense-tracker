import DashboardHeader from "@/components/DashboardHeader";
import ExpenseDashboard from "@/components/ExpenseDashboard";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto">
          <DashboardHeader />
          <Separator className="mb-6 bg-gray-200" />
          <ExpenseDashboard />
        </div>
      </div>
    </>
  );
}
