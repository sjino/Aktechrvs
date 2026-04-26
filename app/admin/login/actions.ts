"use server";

import { createAuthClient } from "@/lib/supabase-auth";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const supabase = await createAuthClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect("/admin/login?error=1");
  }

  redirect("/admin");
}
