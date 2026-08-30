import { supabase } from "@/integrations/supabase/client";

export const ADMIN_EMAIL = "abhinavnitingupta@gmail.com";

export async function login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const trimmed = email.trim().toLowerCase();

  let { error } = await supabase.auth.signInWithPassword({ email: trimmed, password });

  // First-time setup: create the owner account if it does not exist yet.
  if (error && trimmed === ADMIN_EMAIL) {
    const signUp = await supabase.auth.signUp({
      email: trimmed,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (!signUp.error) {
      const retry = await supabase.auth.signInWithPassword({ email: trimmed, password });
      error = retry.error;
    }
  }

  if (error) return { ok: false, error: error.message };

  // Grant admin rights to the owner email (no-op for anyone else).
  await supabase.rpc("claim_admin");

  const admin = await isAdmin();
  if (!admin) {
    await supabase.auth.signOut();
    return { ok: false, error: "This account does not have admin access." };
  }
  return { ok: true };
}

export async function isAdmin(): Promise<boolean> {
  const { data: session } = await supabase.auth.getSession();
  const uid = session.session?.user.id;
  if (!uid) return false;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", uid)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}

export async function logout() {
  await supabase.auth.signOut();
}
