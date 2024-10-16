import { signOut } from "@/auth";
import { Button } from "./ui/button";

export default async function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button className="bg-black text-white">Sign Out</Button>
    </form>
  );
}
