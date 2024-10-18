"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <Button
      onClick={handleSignOut}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      Sign Out
    </Button>
  );
}
