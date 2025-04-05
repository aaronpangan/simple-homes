"use server";

import { createClient } from "../../utils/supabase/server";

export async function getUserProfile(user_id: string | undefined) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", user_id)
    .single();

  return data;
}

export async function addUserProfile(name: string, address: string) {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user_profile")
    .insert({
      user_id: user.user?.id,
      name: name,
      address: address,
    })
    .select("*")
    .single();

  return data;
}
