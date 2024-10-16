import { auth, signIn } from "@/auth";
import { Button } from "./ui/button";

export default async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="bg-black text-white">Log In</Button>
    </form>
  );
}
