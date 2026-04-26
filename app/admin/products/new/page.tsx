import Link from "next/link";
import { createProduct } from "../../actions";
import AdminHeader from "../../components/AdminHeader";

const categories = ["중고기계", "신품기계", "기계부품"];

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader backHref="/admin" backLabel="← 목록으로" />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6">새 제품 등록</h1>

        <form action={createProduct} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5">
          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">카테고리 *</label>
            <select
              name="category"
              required
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택하세요</option>
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
              placeholder="예: CNC 선반, 밀링머신, 볼스크류"
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
              placeholder="예: 현대위아, FANUC, NSK"
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
              placeholder="예: HIT-18S, VM500"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">설명</label>
            <textarea
              name="description"
              rows={3}
              placeholder="제품 상태, 연식, 특이사항 등을 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* 스펙 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">스펙 (한 줄에 하나씩)</label>
            <textarea
              name="specs"
              rows={4}
              placeholder={"최대 선삭경 φ360mm\n최대 선삭길이 500mm\n주축 회전수 4,500rpm"}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
            />
          </div>

          {/* 이미지 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">제품 사진</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP · 최대 10MB</p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded transition-colors"
            >
              등록하기
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
