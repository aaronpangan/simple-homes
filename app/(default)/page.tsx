import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("user_profile").select("*");
 


  return <div className="container mx-auto py-10"></div>;
}
