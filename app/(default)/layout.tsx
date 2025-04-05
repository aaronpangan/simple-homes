import dynamic from "next/dynamic";
import React from "react";
import NavBar from "../../components/Navbar";
import { createClient } from "../../utils/supabase/server";
import { getUserProfile } from "../profile/profile.actions";

// Import the AutoProfileDialog dynamically with no SSR
const AutoProfileDialog = dynamic(
  () => import("../../components/profile/ProfileDialog"),
  { ssr: !!false },
);

type LayoutProps = {
  children: React.ReactNode;
};

export default async function DefaultLayout({ children }: LayoutProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  let showProfileDialog = false;

  if (data?.user) {
    const profile = await getUserProfile(data.user.id);
    if (!profile) {
      showProfileDialog = true;
    }
  }

  return (
    <>
      <NavBar user={data?.user || null} />
      {showProfileDialog && data?.user && <AutoProfileDialog />}
      {children}
    </>
  );
}
