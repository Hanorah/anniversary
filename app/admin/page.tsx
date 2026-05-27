import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminIndexPage() {
  if (!hasSupabaseEnv()) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin/dashboard");
  }
  redirect("/admin/login");
}
