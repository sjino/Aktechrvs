import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-[#0d2444] text-white overflow-hidden" style={{ minHeight: "520px" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2444] via-[#163566] to-[#1a4a8a] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col gap-6">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest">
            Machine Trading Specialist
          </p>
          <h1 className="text-5xl font-bold leading-tight max-w-2xl">
            중고·신품 기계 및<br />기계 부품 전문 유통
          </h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            AktechReverse는 다양한 산업용 기계와 부품을<br />
            합리적인 가격에 신속하게 공급합니다.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded transition-colors"
            >
              제품 보기
            </Link>
            <Link
              href="/contact"
              className="border border-white/50 hover:border-white text-white font-semibold px-8 py-3 rounded transition-colors hover:bg-white/10"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">PRODUCT</p>
            <h2 className="text-3xl font-bold text-[#0d2444]">취급 품목</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                label: "중고 기계",
                sub: "Used Machinery",
                desc: "검증된 중고 기계를 합리적인 가격에 제공합니다. 상태 점검 및 보증 서비스를 포함합니다.",
                bg: "bg-[#0d2444]",
                icon: "🏗️",
                cat: "중고기계",
              },
              {
                label: "신품 기계",
                sub: "New Machinery",
                desc: "최신 신품 기계를 다양한 브랜드·모델로 공급합니다. 설치 및 초기 세팅을 지원합니다.",
                bg: "bg-blue-600",
                icon: "⚙️",
                cat: "신품기계",
              },
              {
                label: "기계 부품",
                sub: "Machine Parts",
                desc: "국내외 다양한 기계 부품을 신속하게 공급합니다. 긴급 부품 조달도 가능합니다.",
                bg: "bg-[#1a4a8a]",
                icon: "🔩",
                cat: "기계부품",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={`/products?category=${item.cat}`}
                className={`${item.bg} text-white rounded-lg p-8 flex flex-col gap-4 hover:opacity-90 transition-opacity group`}
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{item.sub}</p>
                  <h3 className="text-xl font-bold mt-1">{item.label}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                <span className="text-sm text-white/60 group-hover:text-white mt-auto transition-colors">
                  자세히 보기 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Icons */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: "💬", title: "전문 상담", desc: "경험 많은 전문 상담원이\n고객 맞춤 솔루션을 제안합니다." },
              { icon: "📋", title: "견적 서비스", desc: "빠르고 정확한 견적서를\n무료로 제공합니다." },
              { icon: "🚚", title: "배송·설치", desc: "전국 배송 및 현장 설치\n지원 서비스를 제공합니다." },
              { icon: "🛠️", title: "사후 관리", desc: "구매 후 AS 및 부품 조달\n서비스를 지원합니다." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3 p-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#0d2444]">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA Banner */}
      <section className="bg-[#0d2444] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">About Us</p>
            <h2 className="text-3xl font-bold text-white mb-4">신뢰할 수 있는 기계 유통 파트너</h2>
            <p className="text-gray-400 max-w-xl leading-relaxed">
              AktechReverse는 중고·신품 기계와 기계 부품을 전문으로 취급하는 유통기업입니다.
              국내외 다양한 공급망을 통해 폭넓은 기계 라인업을 갖추고,
              구매부터 설치·사후 관리까지 고객 맞춤 서비스를 제공합니다.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded transition-colors text-lg whitespace-nowrap"
          >
            무료 상담 신청
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
