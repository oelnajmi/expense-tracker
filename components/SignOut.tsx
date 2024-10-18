"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
    window.location.href = "/";
  };

  return (
    <Button onClick={handleSignOut} className="bg-black text-white">
      Sign Out
    </Button>
  );
}
