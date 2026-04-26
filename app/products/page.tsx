import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase, type Product } from "@/lib/supabase";

const categories = ["전체", "중고기계", "신품기계", "기계부품"];
const ITEMS_PER_PAGE = 20;

const badgeStyle: Record<string, string> = {
  중고기계: "bg-orange-100 text-orange-700 border border-orange-200",
  신품기계: "bg-blue-100 text-blue-700 border border-blue-200",
  기계부품: "bg-green-100 text-green-700 border border-green-200",
};

const categoryIcon: Record<string, string> = {
  중고기계: "🏗️",
  신품기계: "⚙️",
  기계부품: "🔩",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category = "전체", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page));

  // Supabase에서 데이터 fetch
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (category !== "전체") {
    query = query.eq("category", category);
  }
  const { data: products = [], error } = await query;

  if (error) console.error("제품 로드 오류:", error.message);

  const filtered = products ?? [];
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 전체 카테고리별 카운트
  const { data: allProducts = [] } = await supabase.from("products").select("category");
  const countMap: Record<string, number> = { 전체: allProducts?.length ?? 0 };
  for (const p of allProducts ?? []) {
    countMap[p.category] = (countMap[p.category] ?? 0) + 1;
  }

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (category !== "전체") params.set("category", category);
    if (p > 1) params.set("page", String(p));
    const q = params.toString();
    return q ? `/products?${q}` : "/products";
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:underline">HOME</Link>
          {" › "}
          <span className="text-gray-700">제품 목록</span>
        </p>

        {/* Page Title */}
        <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>⚙️</span> 제품 목록
        </h1>

        {/* Category Tabs */}
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <Link
                key={cat}
                href={cat === "전체" ? "/products" : `/products?category=${cat}`}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {cat}{" "}
                <span className="text-xs text-gray-400">({countMap[cat] ?? 0})</span>
              </Link>
            );
          })}
        </div>

        {/* Result Count + Pagination (top) */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500">
            검색결과:{" "}
            <span className="font-semibold text-gray-700">{filtered.length}건</span>
            {filtered.length > 0 && (
              <>
                {" "}
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}~
                {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}건 표시
              </>
            )}
          </p>
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} pageHref={pageHref} />
          )}
        </div>

        {/* Product List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {paged.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              {error ? "데이터를 불러오는 중 오류가 발생했습니다." : "등록된 제품이 없습니다."}
            </p>
          ) : (
            paged.map((product: Product, idx: number) => (
              <div
                key={product.id}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                  idx !== 0 ? "border-t border-gray-100" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="w-[90px] h-[72px] shrink-0 bg-gray-100 border border-gray-200 rounded overflow-hidden flex items-center justify-center">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.type} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl text-gray-300">
                      {categoryIcon[product.category] ?? "⚙️"}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-blue-700 hover:underline font-medium text-sm leading-snug"
                  >
                    {product.type}
                    <span className="text-gray-400 mx-1.5">|</span>
                    {product.manufacturer}
                    <span className="text-gray-400 mx-1.5">|</span>
                    {product.model}
                    <span className="text-gray-400 mx-1.5">|</span>
                    AktechReverse
                  </Link>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{product.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle[product.category]}`}>
                      {product.category}
                    </span>
                    {product.specs[0] && (
                      <span className="text-[11px] text-gray-400">{product.specs[0]}</span>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-400 shrink-0 pt-0.5 whitespace-nowrap">
                  [{formatDate(product.created_at)}]
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination (bottom) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} pageHref={pageHref} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  pageHref,
}: {
  currentPage: number;
  totalPages: number;
  pageHref: (p: number) => string;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1 text-xs text-gray-500">
      {currentPage > 1 && (
        <>
          <Link href={pageHref(1)} className="px-2 py-1 hover:text-blue-600">K 처음</Link>
          <Link href={pageHref(currentPage - 1)} className="px-2 py-1 hover:text-blue-600">＜ 이전</Link>
        </>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={pageHref(p)}
          className={`px-2.5 py-1 rounded transition-colors ${
            p === currentPage ? "bg-blue-600 text-white font-bold" : "hover:text-blue-600"
          }`}
        >
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <>
          <Link href={pageHref(currentPage + 1)} className="px-2 py-1 hover:text-blue-600">다음 ＞</Link>
          <Link href={pageHref(totalPages)} className="px-2 py-1 hover:text-blue-600">마지막 ＞K</Link>
        </>
      )}
    </div>
  );
}
