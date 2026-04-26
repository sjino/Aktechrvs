import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#07172b] text-gray-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-white text-xl font-bold mb-1">
              Aktech<span className="text-blue-400">Reverse</span>
            </p>
            <p className="text-sm mb-4">중고·신품 기계 전문 유통기업</p>
            <div className="text-sm space-y-1">
              <p>📞 010-3766-6519</p>
              <p>✉ amada81@naver.com</p>
              <p>평일 09:00 ~ 18:00 (주말·공휴일 휴무)</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-white font-semibold mb-3">제품</p>
              <ul className="space-y-2">
                <li><Link href="/products?category=중고기계" className="hover:text-white transition-colors">중고 기계</Link></li>
                <li><Link href="/products?category=신품기계" className="hover:text-white transition-colors">신품 기계</Link></li>
                <li><Link href="/products?category=기계부품" className="hover:text-white transition-colors">기계 부품</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">서비스</p>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:text-white transition-colors">견적 요청</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">상담 문의</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">회사</p>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition-colors">회사소개</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">오시는 길</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-xs text-center">
          © 2025 AktechReverse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
