"use client";

import Link from "next/link";
import { useState, useRef } from "react";

const navItems = [
  {
    href: "/about",
    label: "회사소개",
    children: [
      { href: "/about", label: "회사소개" },
      { href: "/location", label: "오시는 길" },
    ],
  },
  {
    href: "/products",
    label: "제품",
    children: [
      { href: "/products?category=중고기계", label: "중고기계" },
      { href: "/products?category=신품기계", label: "신품기계" },
      { href: "/products?category=기계부품", label: "기계부품" },
    ],
  },
  {
    href: "/contact",
    label: "고객문의",
    children: [
      { href: "/contact", label: "견적 요청" },
      { href: "/contact", label: "상담 문의" },
    ],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
    setActiveSection(label);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false);
      setActiveSection("");
    }, 120);
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0d2444] text-gray-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-8 flex justify-between items-center">
          <span>중고·신품 기계 및 기계 부품 전문 유통기업</span>
          <div className="hidden sm:flex items-center gap-5">
            <span>📞 010-3766-6519</span>
            <span>✉ amada81@naver.com</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-8 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMegaOpen(false)}>
            <span className="text-2xl font-bold text-[#0d2444] tracking-tight">
              Aktech<span className="text-blue-600">Reverse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-stretch h-full gap-6">
            {navItems.map((item) =>
              item.children.length === 0 ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(false); }}
                  className="flex items-center h-full px-5 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.href}
                  className="relative flex items-stretch px-5"
                  onMouseEnter={() => handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 h-full text-base font-medium transition-colors ${
                      megaOpen && activeSection === item.label
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                    <svg
                      className={`w-3 h-3 mt-0.5 transition-transform duration-200 ${
                        megaOpen && activeSection === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown — positioned directly below this nav item */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-1 transition-all duration-150 z-50 ${
                      megaOpen && activeSection === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="bg-white border border-gray-200 rounded-b-lg shadow-lg px-5 py-5 min-w-[140px]">
                      {/* Column header */}
                      <div className="relative pb-3 mb-3 border-b border-gray-100 text-center">
                        <span className="text-[15px] font-bold text-gray-900">
                          {item.label}
                        </span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-red-500" />
                      </div>
                      {/* Sub items */}
                      <div className="flex flex-col items-center gap-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            onClick={() => setMegaOpen(false)}
                            className="text-sm text-gray-500 hover:text-gray-900 py-1.5 whitespace-nowrap transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
            <Link
              href="/contact"
              onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(false); }}
              className="self-center bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-blue-700 transition-colors"
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
              {navItems.map((item) =>
                item.children.length === 0 ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2.5 border-b border-gray-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.href} className="border-b border-gray-50">
                    <button
                      className="w-full flex items-center justify-between text-sm font-medium text-gray-700 py-2.5"
                      onClick={() =>
                        setOpenMobileItem((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${openMobileItem === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openMobileItem === item.label && (
                      <div className="pl-3 pb-2 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-gray-500 hover:text-blue-600 py-1.5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
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
