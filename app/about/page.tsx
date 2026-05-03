import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0d2444] text-white overflow-hidden" style={{ minHeight: "320px" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2444] via-[#163566] to-[#1a4a8a] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col gap-4">
          <p className="text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-widest">About Us</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">회사소개</h1>
          <p className="text-gray-300 text-base max-w-xl leading-relaxed">
            AktechReverse는 중고·신품 기계 및 기계 부품 전문 유통기업입니다.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-gray-50">

        {/* 회사 개요 */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Company Overview</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2444] mb-6">
                  신뢰할 수 있는<br />기계 유통 파트너
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  AktechReverse는 중고·신품 기계와 기계 부품을 전문으로 취급하는 유통기업입니다.
                  국내외 다양한 공급망을 통해 폭넓은 기계 라인업을 갖추고 있으며,
                  구매부터 설치·사후 관리까지 고객 맞춤 서비스를 제공합니다.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  풍부한 현장 경험과 전문 지식을 바탕으로, 고객이 필요한 기계를 합리적인 가격에
                  신속하게 공급하는 것을 최우선 목표로 삼고 있습니다.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {[
                  { value: "10+", label: "년 업계 경험" },
                  { value: "500+", label: "거래 완료 건수" },
                  { value: "100+", label: "협력 공급업체" },
                  { value: "24h", label: "견적 응답 시간" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center"
                  >
                    <p className="text-3xl font-bold text-[#0d2444] mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 가치 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Core Values</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2444]">핵심 가치</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "🤝",
                  title: "신뢰",
                  desc: "정직한 거래와 투명한 정보 제공으로 고객과의 신뢰를 최우선으로 합니다.",
                },
                {
                  icon: "⚡",
                  title: "신속",
                  desc: "빠른 견적 응대와 신속한 물류로 고객의 소중한 시간을 지킵니다.",
                },
                {
                  icon: "🎯",
                  title: "전문성",
                  desc: "오랜 현장 경험과 깊은 전문 지식으로 최적의 솔루션을 제안합니다.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-100 rounded-lg p-8 flex flex-col gap-4 text-center shadow-sm"
                >
                  <span className="text-4xl mx-auto">{item.icon}</span>
                  <h3 className="text-lg font-bold text-[#0d2444]">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 취급 품목 */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Products</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2444]">취급 품목</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏗️",
                  title: "중고 기계",
                  desc: "국내외 검증된 중고 산업기계를 합리적인 가격에 제공합니다. 상태 점검 및 보증 서비스 포함.",
                  cat: "중고기계",
                },
                {
                  icon: "⚙️",
                  title: "신품 기계",
                  desc: "다양한 브랜드의 최신 신품 기계를 공급합니다. 설치 및 초기 세팅 지원.",
                  cat: "신품기계",
                },
                {
                  icon: "🔩",
                  title: "기계 부품",
                  desc: "국내외 다양한 기계 부품을 신속하게 조달합니다. 긴급 부품 공급도 가능.",
                  cat: "기계부품",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={`/products?category=${item.cat}`}
                  className="border border-gray-200 rounded-lg p-6 flex flex-col gap-3 hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-base font-bold text-[#0d2444]">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.desc}</p>
                  <span className="text-sm text-blue-600 group-hover:underline mt-1">제품 보기 →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0d2444] py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">문의가 있으신가요?</h2>
              <p className="text-gray-400 text-sm">전문 상담원이 빠르게 답변드립니다.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded transition-colors text-sm"
              >
                견적 요청
              </Link>
              <Link
                href="/location"
                className="border border-white/40 hover:border-white text-white font-semibold px-8 py-3 rounded transition-colors text-sm hover:bg-white/10"
              >
                오시는 길
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
