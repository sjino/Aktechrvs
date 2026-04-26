import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0d2444] text-gray-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>중고·신품 기계 및 기계 부품 전문 유통기업</span>
          <div className="flex items-center gap-5">
            <span>📞 010-3766-6519</span>
            <span>✉ amada81@naver.com</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#0d2444] tracking-tight">
              Aktech<span className="text-blue-600">Reverse</span>
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              홈
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              제품
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              회사소개
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              고객문의
            </Link>
            <Link
              href="/contact"
              className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-blue-700 transition-colors"
            >
              견적 요청
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
