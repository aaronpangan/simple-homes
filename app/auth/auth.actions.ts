"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export async function auth(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  await supabase.auth.signInWithOtp({
    email,
  });
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
}

export async function googleAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    console.error("Error during Google authentication:", error);
  }

  if (data?.url) {
    redirect(data.url);
  }
}
