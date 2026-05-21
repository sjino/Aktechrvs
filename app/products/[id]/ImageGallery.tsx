"use client";

import { useState, useEffect } from "react";

type Props = {
  images: string[];
  alt: string;
};

export default function ImageGallery({ images, alt }: Props) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      {/* 메인 이미지 */}
      <div
        className="relative bg-gray-100 cursor-zoom-in overflow-hidden min-h-[280px] flex items-center justify-center"
        onClick={() => setLightbox(true)}
      >
        <img
          src={images[idx]}
          alt={alt}
          className="w-full object-cover max-h-[360px]"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-colors"
            >
              ›
            </button>
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
              {idx + 1} / {images.length}
            </span>
          </>
        )}
        <span className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded pointer-events-none">
          🔍 클릭하여 확대
        </span>
      </div>

      {/* 썸네일 */}
      {images.length > 1 && (
        <div className="flex gap-2 p-2 bg-gray-50 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`shrink-0 w-16 h-14 rounded border-2 overflow-hidden transition-colors ${
                i === idx ? "border-blue-600" : "border-transparent hover:border-gray-300"
              }`}
            >
              <img src={img} alt={`썸네일 ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* 라이트박스 */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-5 text-white/70 hover:text-white text-4xl leading-none z-10"
            onClick={() => setLightbox(false)}
          >
            ×
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-6xl leading-none z-10"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-6xl leading-none z-10"
              >
                ›
              </button>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {idx + 1} / {images.length}
              </span>
            </>
          )}
          <img
            src={images[idx]}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
