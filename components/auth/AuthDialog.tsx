"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AuthDialogForm from "./AuthDialogForm";

interface AuthDialogProps {
  trigger?: ReactNode;
}

export default function AuthDialog({ trigger }: AuthDialogProps) {
  return (
    <Dialog>
      {trigger}
      <DialogContent>
        <DialogHeader className="my-7">
          <DialogTitle className="text-center text-2xl font-bold">Welcome to SimpleHomes</DialogTitle>
        </DialogHeader>
        <AuthDialogForm />
      </DialogContent>
    </Dialog>
  );
}
