"use client";

import { useState, useRef } from "react";
import { uploadSingleImage } from "../../actions";

type ImageItem = {
  id: string;
  url: string;      // 스토리지 URL (업로드 완료 후 채워짐)
  preview: string;  // 로컬 object URL 또는 스토리지 URL
  uploading: boolean;
  failed: boolean;
};

function makeExisting(url: string): ImageItem {
  return { id: url, url, preview: url, uploading: false, failed: false };
}

export default function ImageManager({ existingUrls }: { existingUrls: string[] }) {
  const [items, setItems] = useState<ImageItem[]>(existingUrls.map(makeExisting));
  const [dragging, setDragging] = useState<number | null>(null);
  const dragSrc = useRef<number | null>(null);

  // 파일 선택 즉시 미리보기 추가 + 서버 업로드
  async function addFiles(files: File[]) {
    const newItems: ImageItem[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      url: "",
      preview: URL.createObjectURL(file),
      uploading: true,
      failed: false,
    }));
    setItems((prev) => [...prev, ...newItems]);

    await Promise.all(
      newItems.map(async (item, i) => {
        const fd = new FormData();
        fd.append("file", files[i]);
        const url = await uploadSingleImage(fd).catch(() => null);
        setItems((prev) =>
          prev.map((p) =>
            p.id === item.id
              ? url
                ? { ...p, url, uploading: false }
                : { ...p, uploading: false, failed: true }
              : p
          )
        );
      })
    );
  }

  function remove(id: string) {
    setItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item?.preview.startsWith("blob:")) URL.revokeObjectURL(item.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  // 드래그 앤 드롭 순서 변경
  function onDragStart(e: React.DragEvent, idx: number) {
    dragSrc.current = idx;
    setDragging(idx);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const src = dragSrc.current;
    if (src === null || src === idx) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(src, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    dragSrc.current = idx;
  }

  function onDragEnd() {
    dragSrc.current = null;
    setDragging(null);
  }

  // 폼 제출 시 순서대로 hidden input 렌더링 (업로드 완료된 것만)
  const readyItems = items.filter((item) => !item.uploading && !item.failed && item.url);
  const pendingCount = items.filter((item) => item.uploading).length;

  return (
    <div>
      {/* 이미지 그리드 */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {items.map((item, idx) => {
            const orderNum = readyItems.indexOf(item) + 1;
            return (
              <div
                key={item.id}
                draggable={!item.uploading && !item.failed}
                onDragStart={(e) => onDragStart(e, idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDragEnd={onDragEnd}
                className={`relative group select-none transition-opacity ${
                  item.uploading || item.failed
                    ? "cursor-default"
                    : "cursor-grab active:cursor-grabbing"
                } ${dragging === idx ? "opacity-40" : "opacity-100"}`}
              >
                {/* 순번 배지 */}
                {!item.uploading && !item.failed && (
                  <span className="absolute top-1 left-1 z-10 bg-black/60 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center pointer-events-none">
                    {orderNum}
                  </span>
                )}

                <img
                  src={item.preview}
                  alt={`이미지 ${idx + 1}`}
                  draggable={false}
                  className="w-24 h-20 object-cover rounded border border-gray-200"
                />

                {/* 업로드 중 오버레이 */}
                {item.uploading && (
                  <div className="absolute inset-0 bg-black/50 rounded flex flex-col items-center justify-center gap-1">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-white text-[9px]">업로드 중</span>
                  </div>
                )}

                {/* 실패 오버레이 */}
                {item.failed && (
                  <div className="absolute inset-0 bg-red-500/70 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">실패</span>
                  </div>
                )}

                {/* 삭제 버튼 */}
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs leading-none transition-colors opacity-0 group-hover:opacity-100 z-10"
                >
                  ×
                </button>

                {/* 폼 제출용 hidden input */}
                {!item.uploading && !item.failed && item.url && (
                  <input type="hidden" name="image_urls" value={item.url} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 파일 추가 영역 */}
      <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg px-4 py-4 cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm text-gray-500">사진 추가</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) addFiles(files);
            e.target.value = "";
          }}
        />
      </label>

      <p className="text-xs text-gray-400 mt-1.5">
        드래그로 순서 변경 · 숫자는 최종 순번 · JPG, PNG, WEBP · 최대 10MB
        {pendingCount > 0 && (
          <span className="ml-2 text-blue-500">{pendingCount}장 업로드 중...</span>
        )}
      </p>
    </div>
  );
}
