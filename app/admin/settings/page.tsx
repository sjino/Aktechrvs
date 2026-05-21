import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase-auth";
import AdminHeader from "../components/AdminHeader";
import PasswordChangeForm from "./PasswordChangeForm";
import MfaSection from "./MfaSection";

export default async function SettingsPage() {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString("ko-KR")
    : "-";

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader backHref="/admin" backLabel="← 관리자 홈" />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-bold text-gray-800">계정 설정</h1>

        {/* 계정 정보 */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            계정 정보
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">이메일</dt>
              <dd className="text-gray-800 font-medium">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">마지막 로그인</dt>
              <dd className="text-gray-800">{lastSignIn}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">계정 생성일</dt>
              <dd className="text-gray-800">
                {new Date(user.created_at).toLocaleString("ko-KR")}
              </dd>
            </div>
          </dl>
        </section>

        {/* 비밀번호 변경 */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            비밀번호 변경
          </h2>
          <PasswordChangeForm />
        </section>

        {/* 2단계 인증 */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            2단계 인증 (OTP)
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Google Authenticator 등의 OTP 앱을 사용하여 계정 보안을 강화합니다.
          </p>
          <MfaSection />
        </section>
      </main>
    </div>
  );
}
