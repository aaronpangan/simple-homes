"use client";

import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";
import AuthDialog from "./AuthDialog";

export default function AuthDialogTrigger() {
  return (
    <AuthDialog
      trigger={
        <DialogTrigger asChild>
          <Button className="text-sm font-bold">Join / Sign in</Button>
        </DialogTrigger>
      }
    ></AuthDialog>
  );
}
