import Link from "next/link";
import { PieChart } from "lucide-react";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import { auth } from "@/auth";
import DashboardPreview from "@/components/DashboardPreview";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 pt-6 flex flex-col flex-grow">
        <header className="lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <PieChart className="h-6 w-6" />
            <span className="ml-2 text-2xl font-bold">ExpenseEase</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium underline underline-offset-4"
              href="/dashboard"
            >
              Try it out
            </Link>
            {session ? <SignOut /> : <SignIn />}
          </nav>
        </header>
        <main className="flex-grow">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Manage Your Finances with Ease
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Track expenses, monitor subscriptions, and gain financial
                    insights all in one place.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-[80%] mx-auto pb-24">
            <div className="container mx-auto px-4">
              <DashboardPreview />
            </div>
          </section>
        </main>
      </div>
      <footer className="w-full mt-auto border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © 2024 ExpenseEase. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
