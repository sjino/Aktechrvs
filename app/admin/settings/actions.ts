"use server";

import { createAuthClient } from "@/lib/supabase-auth";

export async function changePassword(_: unknown, formData: FormData) {
  const current = formData.get("current_password") as string;
  const next = formData.get("new_password") as string;
  const confirm = formData.get("confirm_password") as string;

  if (next !== confirm) return { error: "새 비밀번호가 일치하지 않습니다." };
  if (next.length < 8) return { error: "비밀번호는 최소 8자 이상이어야 합니다." };

  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return { error: "인증 오류가 발생했습니다. 다시 로그인해 주세요." };

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: current,
  });
  if (signInError) return { error: "현재 비밀번호가 올바르지 않습니다." };

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) return { error: error.message };

  return { success: "비밀번호가 성공적으로 변경되었습니다." };
}
