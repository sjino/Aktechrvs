"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { Factor } from "@supabase/supabase-js";

function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

type EnrollData = {
  factorId: string;
  qrCode: string;
  secret: string;
};

export default function MfaSection() {
  const [factors, setFactors] = useState<Factor[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollData, setEnrollData] = useState<EnrollData | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchFactors = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.mfa.listFactors();
    setFactors(data?.totp ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFactors();
  }, [fetchFactors]);

  async function startEnroll() {
    setError("");
    setEnrolling(true);
    const supabase = createClient();

    // 미인증 상태로 남아 있는 factor가 있으면 먼저 제거
    const { data: existing } = await supabase.auth.mfa.listFactors();
    const unverified = (existing?.totp ?? []).filter((f) => (f.status as string) === "unverified");
    for (const f of unverified) {
      await supabase.auth.mfa.unenroll({ factorId: f.id });
    }

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      issuer: "AktechReverse",
    });
    if (error || !data) {
      setError(error?.message ?? "등록 오류가 발생했습니다.");
      setEnrolling(false);
      return;
    }
    setEnrollData({
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
    });
  }

  async function verifyEnroll() {
    if (!enrollData) return;
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: enrollData.factorId,
      code,
    });
    if (error) {
      setError("인증 코드가 올바르지 않습니다. 다시 시도해 주세요.");
      return;
    }
    setEnrolling(false);
    setEnrollData(null);
    setCode("");
    setMessage("2단계 인증이 활성화되었습니다.");
    fetchFactors();
  }

  async function unenroll(factorId: string) {
    if (!confirm("2단계 인증을 해제하시겠습니까?")) return;
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    if (error) {
      setError(error.message);
      return;
    }
    setMessage("2단계 인증이 해제되었습니다.");
    fetchFactors();
  }

  function cancelEnroll() {
    setEnrolling(false);
    setEnrollData(null);
    setCode("");
    setError("");
  }

  if (loading) {
    return <p className="text-sm text-gray-400">불러오는 중...</p>;
  }

  const verifiedFactors = factors.filter((f) => f.status === "verified");
  const isEnabled = verifiedFactors.length > 0;

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded">
          {message}
        </div>
      )}

      {/* 현재 상태 */}
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isEnabled
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isEnabled ? "bg-green-500" : "bg-gray-400"}`}
          />
          {isEnabled ? "활성화됨" : "비활성화"}
        </span>
        {isEnabled && (
          <span className="text-xs text-gray-400">
            OTP 앱으로 로그인 시 추가 인증이 필요합니다.
          </span>
        )}
      </div>

      {/* 등록 플로우 */}
      {enrolling && enrollData && (
        <div className="border border-gray-200 rounded-lg p-5 space-y-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-700">
            Google Authenticator 또는 다른 OTP 앱으로 QR 코드를 스캔하세요.
          </p>
          <img
            src={enrollData.qrCode}
            alt="OTP QR 코드"
            width={180}
            height={180}
            className="bg-white p-3 rounded border border-gray-200"
          />
          <div>
            <p className="text-xs text-gray-500 mb-1">또는 코드를 직접 입력하세요:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono tracking-widest">
              {enrollData.secret}
            </code>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              앱에 표시된 6자리 코드 입력
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="border border-gray-300 rounded px-3 py-2 text-sm font-mono tracking-widest w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={verifyEnroll}
                disabled={code.length !== 6}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
              >
                확인
              </button>
              <button
                onClick={cancelEnroll}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded border border-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 버튼 */}
      {!enrolling && (
        <div className="flex gap-3">
          {!isEnabled ? (
            <button
              onClick={startEnroll}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
            >
              2단계 인증 설정
            </button>
          ) : (
            verifiedFactors.map((f) => (
              <button
                key={f.id}
                onClick={() => unenroll(f.id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-5 py-2.5 rounded border border-red-200 transition-colors"
              >
                2단계 인증 해제
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
