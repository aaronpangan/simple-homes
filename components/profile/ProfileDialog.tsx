"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ProfileDialogForm from "./ProfileDialogForm";

export default function ProfileDialog() {
  const [open, setOpen] = useState(true);

  function closeDialog() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="my-7">
          <DialogTitle className="text-center text-2xl font-bold">
            Complete Your Profile
          </DialogTitle>
        </DialogHeader>
        <ProfileDialogForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
