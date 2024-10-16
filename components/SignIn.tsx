import { auth, signIn } from "@/auth";
import { Button } from "./ui/button";

export default async function SignIn() {
  const session = await auth();
  console.log(session);

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
