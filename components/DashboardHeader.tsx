import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function DashboardHeader() {
  const session = await auth();

  return (
    <div className="flex justify-between items-center">
      <div>
        <header className="py-6">
          {session ? (
            <h1 className="text-3xl font-bold">Hello, {session.user?.name}</h1>
          ) : (
            <h1 className="text-3xl font-bold">Log In To Save Your Data</h1>
          )}

          <p className="text-muted-foreground">
            {" "}
            {/* Changed from text-gray-500 */}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
}
