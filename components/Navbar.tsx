"use client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { signOut } from "../app/auth/auth.actions";
import AuthDialogTrigger from "./auth/AuthDIalogTrigger";

interface NavBarProps {
  user: User | null;
}

export default function NavBar({ user }: NavBarProps) {
  return (
    <nav>
      {user ? (
        <Button variant="ghost" onClick={() => signOut()}>
          Log out
        </Button>
      ) : (
        <AuthDialogTrigger />
      )}
    </nav>
  );
}
