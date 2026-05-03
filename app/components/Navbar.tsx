"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "홈" },
    { href: "/products", label: "제품" },
    { href: "/about", label: "회사소개" },
    { href: "/contact", label: "고객문의" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0d2444] text-gray-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>중고·신품 기계 및 기계 부품 전문 유통기업</span>
          <div className="hidden sm:flex items-center gap-5">
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-blue-700 transition-colors"
            >
              견적 요청
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2.5 border-b border-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded hover:bg-blue-700 transition-colors text-center"
              >
                견적 요청
              </Link>
              <div className="mt-3 pb-1 text-xs text-gray-400 space-y-1">
                <p>📞 010-3766-6519</p>
                <p>✉ amada81@naver.com</p>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
