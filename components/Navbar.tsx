"use client";

import AuthDialogTrigger from "./auth/AuthDIalogTrigger";

export default function NavBar() {
  return (
    <nav>
      <AuthDialogTrigger />
    </nav>
  );
}
