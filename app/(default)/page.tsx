import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Get the current user
  const { data, error } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("user_profile").select("*");
 
  // const randomProfile = {
  //   name: "John Doe", // Replace with a random name generator if needed
  //   address: "123 Random Street, Random City",
  //   user_id: data.user?.id, // Assuming you have a foreign key to the user
  // };
  // const { error: insertError } = await supabase
  // .from("user_profile")
  // .insert([randomProfile]);
  // console.log(profile); 
  console.log(data?.user?.id);

  return <div className="container mx-auto py-10"></div>;
}
