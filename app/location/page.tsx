import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KakaoMap from "./KakaoMap";

export default function LocationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0d2444] text-white overflow-hidden" style={{ minHeight: "320px" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2444] via-[#163566] to-[#1a4a8a] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col gap-4">
          <p className="text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-widest">Location</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">오시는 길</h1>
          <p className="text-gray-300 text-base max-w-xl leading-relaxed">
            AktechReverse를 방문해 주시면 친절히 안내해 드리겠습니다.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-gray-50">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* 지도 영역 */}
              <div className="flex-1 rounded-lg overflow-hidden border border-gray-200">
                <KakaoMap />
              </div>

              {/* 정보 패널 */}
              <div className="lg:w-[320px] flex flex-col gap-5">

                {/* 주소 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-bold text-[#0d2444] uppercase tracking-widest mb-4">주소</h3>
                  <div className="flex gap-3">
                    <span className="text-xl shrink-0">📍</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">경기 시흥시 공단1대로 204 시화공구상가 34동 XXX호</p>
                      <p className="text-xs text-gray-400 mt-1">우편번호 15090</p>
                    </div>
                  </div>
                </div>

                {/* 연락처 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-bold text-[#0d2444] uppercase tracking-widest mb-4">연락처</h3>
                  <ul className="flex flex-col gap-3">
                    <li className="flex gap-3 items-start">
                      <span className="text-xl shrink-0">📞</span>
                      <div>
                        <p className="text-xs text-gray-400">전화</p>
                        <p className="text-sm font-medium text-gray-800">010-3766-6519</p>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-xl shrink-0">✉️</span>
                      <div>
                        <p className="text-xs text-gray-400">이메일</p>
                        <p className="text-sm font-medium text-gray-800">amada81@naver.com</p>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-xl shrink-0">🕐</span>
                      <div>
                        <p className="text-xs text-gray-400">운영 시간</p>
                        <p className="text-sm font-medium text-gray-800">평일 09:00 ~ 18:00</p>
                        <p className="text-xs text-gray-400 mt-0.5">주말·공휴일 휴무</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* 견적 버튼 */}
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded text-center text-sm transition-colors"
                >
                  견적 요청하기
                </Link>
              </div>
            </div>

            {/* 교통 안내 */}
            <div className="mt-10 bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-sm font-bold text-[#0d2444] uppercase tracking-widest mb-6">교통 안내</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🚇",
                    title: "지하철",
                    lines: [
                      "OO선 OO역 하차",
                      "X번 출구에서 도보 약 OO분",
                    ],
                  },
                  {
                    icon: "🚌",
                    title: "버스",
                    lines: [
                      "OO번, OO번 버스 탑승",
                      "OO 정류장 하차 후 도보 약 OO분",
                    ],
                  },
                  {
                    icon: "🚗",
                    title: "자가용",
                    lines: [
                      "OO IC 진입 후 OO 방면",
                      "건물 내 주차 가능 (무료)",
                    ],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-800 mb-2">{item.title}</p>
                      {item.lines.map((line, i) => (
                        <p key={i} className="text-sm text-gray-500 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
