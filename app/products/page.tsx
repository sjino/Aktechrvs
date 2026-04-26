import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const products = [
  {
    id: 1,
    category: "중고기계",
    type: "CNC 선반",
    manufacturer: "현대위아",
    model: "HIT-18S",
    description: "2019년식, 저시간 사용. 즉시 가동 가능 상태. 주축 점검 완료.",
    specs: ["최대 선삭경 φ360mm", "최대 선삭길이 500mm", "주축 회전수 4,500rpm"],
    icon: "🔩",
    date: "2025-04-25",
  },
  {
    id: 2,
    category: "중고기계",
    type: "수직 머시닝센터",
    manufacturer: "OKK",
    model: "VM500",
    description: "2020년식, 저시간 사용. 정기점검 완료, 상태 양호.",
    specs: ["X축 500mm", "Y축 400mm", "Z축 450mm"],
    icon: "⚙️",
    date: "2025-04-24",
  },
  {
    id: 3,
    category: "중고기계",
    type: "크랭크 프레스",
    manufacturer: "AIDA",
    model: "NC1-6030",
    description: "60톤, 정기점검 완료. 즉시 사용 가능.",
    specs: ["최대 압력 60ton", "SPM 100", "다이 높이 200mm"],
    icon: "🏗️",
    date: "2025-04-23",
  },
  {
    id: 4,
    category: "중고기계",
    type: "평면 연삭기",
    manufacturer: "오쿠마",
    model: "PSG-84DX",
    description: "2018년식, 상태 우수. 테이블 정밀도 양호.",
    specs: ["테이블 크기 800×400mm", "최대 연삭폭 400mm"],
    icon: "🔧",
    date: "2025-04-22",
  },
  {
    id: 5,
    category: "신품기계",
    type: "수직 머시닝센터",
    manufacturer: "FANUC",
    model: "ROBODRILL α-D21MiA5",
    description: "신품, FANUC 제어기 탑재. 설치 및 초기 교육 포함.",
    specs: ["X축 700mm", "Y축 400mm", "Z축 330mm"],
    icon: "⚙️",
    date: "2025-04-21",
  },
  {
    id: 6,
    category: "신품기계",
    type: "파이버 레이저 절단기",
    manufacturer: "IPG",
    model: "YLS-2000",
    description: "2kW 파이버 레이저, 연강 최대 12mm 절단 가능. 신품.",
    specs: ["레이저 출력 2,000W", "가공 영역 1,500×3,000mm", "최대 이송속도 60m/min"],
    icon: "🔆",
    date: "2025-04-20",
  },
  {
    id: 7,
    category: "기계부품",
    type: "볼스크류",
    manufacturer: "NSK",
    model: "W2502-500-C5",
    description: "정밀 볼스크류, 각종 공작기계 교체용. 다양한 사이즈 재고 보유.",
    specs: ["직경 φ25mm", "리드 10mm", "정밀도 C5"],
    icon: "🔧",
    date: "2025-04-19",
  },
  {
    id: 8,
    category: "기계부품",
    type: "리니어 가이드",
    manufacturer: "THK",
    model: "RSR15WVM+480L",
    description: "미니어처 리니어 가이드. 다양한 길이 대응 가능, 즉시 출고.",
    specs: ["형번 RSR15", "블록 높이 17.5mm", "동정격하중 5.54kN"],
    icon: "🔧",
    date: "2025-04-19",
  },
  {
    id: 9,
    category: "기계부품",
    type: "AC 서보모터",
    manufacturer: "미쓰비시",
    model: "HC-KFS23",
    description: "신품. 앰프 세트 구성 및 파라미터 설정 지원 가능.",
    specs: ["정격출력 0.2kW", "정격토크 0.64N·m", "정격회전수 3,000rpm"],
    icon: "⚡",
    date: "2025-04-18",
  },
];

const categories = ["전체", "중고기계", "신품기계", "기계부품"];

const ITEMS_PER_PAGE = 20;

const badgeStyle: Record<string, string> = {
  중고기계: "bg-orange-100 text-orange-700 border border-orange-200",
  신품기계: "bg-blue-100 text-blue-700 border border-blue-200",
  기계부품: "bg-green-100 text-green-700 border border-green-200",
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

  const filtered =
    category === "전체"
      ? products
      : products.filter((p) => p.category === category);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            const count = cat === "전체" ? products.length : products.filter((p) => p.category === cat).length;
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
                {cat} <span className="text-xs text-gray-400">({count})</span>
              </Link>
            );
          })}
        </div>

        {/* Result Count + Pagination (top) */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500">
            검색결과:{" "}
            <span className="font-semibold text-gray-700">{filtered.length}건</span>
            {" "}
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            ~
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}건 표시
          </p>
          <Pagination currentPage={currentPage} totalPages={totalPages} pageHref={pageHref} />
        </div>

        {/* Product List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {paged.length === 0 ? (
            <p className="text-center text-gray-400 py-20">해당 카테고리의 제품이 없습니다.</p>
          ) : (
            paged.map((product, idx) => (
              <div
                key={product.id}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                  idx !== 0 ? "border-t border-gray-100" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="w-[90px] h-[72px] shrink-0 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-3xl text-gray-300">
                  {product.icon}
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
                    <span className="text-[11px] text-gray-400">{product.specs[0]}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-400 shrink-0 pt-0.5 whitespace-nowrap">
                  [{formatDate(product.date)}]
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
            p === currentPage
              ? "bg-blue-600 text-white font-bold"
              : "hover:text-blue-600"
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
