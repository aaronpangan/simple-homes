import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { auth, googleAuth, signOut } from "../auth/auth.actions";

export default async function Home() {

  // const supabase = await createClient();

  // // Get the current user
  // const { data, error } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto py-10">
    
    </div>
  );
}
