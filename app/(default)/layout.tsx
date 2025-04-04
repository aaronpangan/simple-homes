import React from "react";
import NavBar from "../../components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
