import Link from "next/link";
import { supabaseAdmin, type Product } from "@/lib/supabase";
import { deleteProduct } from "./actions";

const badgeStyle: Record<string, string> = {
  중고기계: "bg-orange-100 text-orange-700",
  신품기계: "bg-blue-100 text-blue-700",
  기계부품: "bg-green-100 text-green-700",
};

export default async function AdminPage() {
  const { data: products = [], error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-[#0d2444] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">AktechReverse</span>
          <span className="text-blue-300 text-sm">관리자</span>
        </div>
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← 사이트로 이동
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Title + Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">제품 관리</h1>
          <Link
            href="/admin/products/new"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
          >
            + 새 제품 등록
          </Link>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {error && (
            <p className="text-red-500 text-sm p-4">오류: {error.message}</p>
          )}
          {!error && products.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              등록된 제품이 없습니다.{" "}
              <Link href="/admin/products/new" className="text-blue-600 hover:underline">
                첫 제품을 등록해보세요
              </Link>
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-10">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">카테고리</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">제품 정보</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">등록일</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-24">관리</th>
                </tr>
              </thead>
              <tbody>
                {(products as Product[]).map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeStyle[p.category]}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">
                        {p.type} | {p.manufacturer} | {p.model}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{p.description}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(p.created_at).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="text-xs text-blue-600 hover:underline font-medium"
                        >
                          수정
                        </Link>
                        <form action={deleteProduct.bind(null, p.id)}>
                          <button
                            type="submit"
                            className="text-xs text-red-500 hover:underline font-medium"
                          >
                            삭제
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
