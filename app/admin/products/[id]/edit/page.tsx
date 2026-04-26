import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin, type Product } from "@/lib/supabase";
import { updateProduct } from "../../../actions";

const categories = ["중고기계", "신품기계", "기계부품"];

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  const p = product as Product;
  const updateWithId = updateProduct.bind(null, p.id);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#0d2444] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">AktechReverse</span>
          <span className="text-blue-300 text-sm">관리자</span>
        </div>
        <Link href="/admin" className="text-sm text-gray-300 hover:text-white">
          ← 목록으로
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6">제품 수정</h1>

        <form action={updateWithId} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5">
          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">카테고리 *</label>
            <select
              name="category"
              required
              defaultValue={p.category}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 제품 종류 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">제품 종류 *</label>
            <input
              type="text"
              name="type"
              required
              defaultValue={p.type}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 제조사 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">제조사 *</label>
            <input
              type="text"
              name="manufacturer"
              required
              defaultValue={p.manufacturer}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 모델명 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">모델명 *</label>
            <input
              type="text"
              name="model"
              required
              defaultValue={p.model}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">설명</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={p.description}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* 스펙 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">스펙 (한 줄에 하나씩)</label>
            <textarea
              name="specs"
              rows={4}
              defaultValue={p.specs.join("\n")}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
            />
          </div>

          {/* 이미지 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">제품 사진</label>
            {p.image_url && (
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">현재 이미지</p>
                <img
                  src={p.image_url}
                  alt="현재 제품 이미지"
                  className="w-40 h-32 object-cover rounded border border-gray-200"
                />
              </div>
            )}
            <input type="hidden" name="existing_image_url" value={p.image_url ?? ""} />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-1">새 파일 선택 시 기존 이미지가 교체됩니다 · 최대 10MB</p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded transition-colors"
            >
              저장하기
            </button>
            <Link
              href="/admin"
              className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-2.5 rounded transition-colors text-center"
            >
              취소
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
