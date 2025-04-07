"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AuthDialogForm from "./AuthDialogForm";

interface AuthDialogProps {
  trigger?: ReactNode;
}

export default function AuthDialog({ trigger }: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  function closeDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent>
        <DialogHeader className="my-7">
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to SimpleHomes
          </DialogTitle>
        </DialogHeader>
        <AuthDialogForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
