import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase, type Product } from "@/lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  const p = product as Product;

  // 같은 카테고리의 다른 제품 (최대 4개)
  const { data: related = [] } = await supabase
    .from("products")
    .select("*")
    .eq("category", p.category)
    .neq("id", p.id)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:underline">HOME</Link>
          {" › "}
          <Link href="/products" className="hover:underline">제품 목록</Link>
          {" › "}
          <span className="text-gray-700">{p.type}</span>
        </p>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* 이미지 */}
            <div className="md:w-[360px] shrink-0 bg-gray-100 flex items-center justify-center min-h-[280px]">
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.type}
                  className="w-full h-full object-cover max-h-[360px]"
                />
              ) : (
                <span className="text-7xl text-gray-300">
                  {categoryIcon[p.category] ?? "⚙️"}
                </span>
              )}
            </div>

            {/* 정보 */}
            <div className="flex-1 p-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyle[p.category]}`}>
                  {p.category}
                </span>
                <span className="text-xs text-gray-400">등록일 {formatDate(p.created_at)}</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                {p.type}
              </h1>

              {/* 제조사 / 모델 */}
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex gap-2">
                  <span className="w-16 text-gray-400 shrink-0">제조사</span>
                  <span className="text-gray-800 font-medium">{p.manufacturer}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-16 text-gray-400 shrink-0">모델</span>
                  <span className="text-gray-800 font-medium">{p.model}</span>
                </div>
              </div>

              {/* 설명 */}
              {p.description && (
                <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {p.description}
                </p>
              )}

              {/* 스펙 */}
              {p.specs.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">사양</p>
                  <ul className="flex flex-col gap-1.5">
                    {p.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                <Link
                  href={`/contact?product=${encodeURIComponent(`${p.type} | ${p.manufacturer} | ${p.model}`)}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded text-center transition-colors text-sm"
                >
                  견적 요청
                </Link>
                <Link
                  href="/products"
                  className="flex-1 border border-gray-200 hover:border-gray-400 text-gray-600 font-semibold py-3 rounded text-center transition-colors text-sm"
                >
                  목록으로
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 연관 제품 */}
        {related && related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-base font-bold text-gray-800 mb-4">
              같은 카테고리의 다른 제품
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(related as Product[]).map((r) => (
                <Link
                  key={r.id}
                  href={`/products/${r.id}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-28 bg-gray-100 flex items-center justify-center">
                    {r.image_url ? (
                      <img
                        src={r.image_url}
                        alt={r.type}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl text-gray-300">
                        {categoryIcon[r.category] ?? "⚙️"}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 truncate">{r.type}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.manufacturer} | {r.model}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
