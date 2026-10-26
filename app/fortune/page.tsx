"use client";

import { useEffect, useState } from "react";
import { FORTUNES, type Fortune } from "./fortunes";

const SHAKE_MS = 1200;

export default function FortunePage() {
  const [result, setResult] = useState<Fortune | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!drawing) return;
    let flip = 1;
    const shake = window.setInterval(() => {
      flip = -flip;
      setAngle(flip * 10);
    }, 80);
    const done = window.setTimeout(() => {
      window.clearInterval(shake);
      setAngle(0);
      setResult(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]);
      setDrawing(false);
    }, SHAKE_MS);
    return () => {
      window.clearInterval(shake);
      window.clearTimeout(done);
    };
  }, [drawing]);

  function draw() {
    if (drawing) return;
    setResult(null);
    setDrawing(true);
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">今日運勢抽籤</h1>
      <p className="text-sm opacity-70">心裡想著今天，按下按鈕抽一支籤</p>

      <svg
        viewBox="-60 -80 120 160"
        className="w-40"
        style={{ transform: `rotate(${angle}deg)`, transformOrigin: "50% 90%" }}
        aria-hidden
      >
        {[-18, -6, 6, 18].map((x, i) => (
          <rect key={x} x={x - 3} y={-70 + i * 4} width={6} height={60} rx={2} fill="#e8cbb0" stroke="#9b6b3a" />
        ))}
        <path d="M-32 -10 L32 -10 L28 70 Q0 78 -28 70 Z" fill="#b5532f" stroke="#7a2f14" strokeWidth={2} />
        <rect x={-32} y={-14} width={64} height={8} rx={3} fill="#7a2f14" />
        <text x={0} y={40} textAnchor="middle" fontSize={22} fontWeight={700} fill="#fff">
          籤
        </text>
      </svg>

      <button
        onClick={draw}
        disabled={drawing}
        className="rounded-full bg-red-600 px-10 py-3 text-lg font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {drawing ? "抽籤中…" : result ? "再抽一次" : "開始抽籤"}
      </button>

      <div className="min-h-64 w-full">
        {result && (
          <section
            data-testid="fortune-result"
            className="flex flex-col items-center gap-3 rounded-2xl border-4 bg-white p-6 text-center text-neutral-900 shadow-lg"
            style={{ borderColor: result.color }}
          >
            <span className="text-5xl font-bold" style={{ color: result.color }}>
              {result.level}
            </span>
            <p className="text-lg">{result.message}</p>
            <dl className="mt-2 grid w-full grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-left text-sm">
              <dt className="font-bold text-green-700">宜</dt>
              <dd>{result.good}</dd>
              <dt className="font-bold text-red-700">忌</dt>
              <dd>{result.bad}</dd>
            </dl>
            <p className="mt-2 text-xs opacity-50">結果隨機產生，僅供娛樂參考</p>
          </section>
        )}
      </div>
    </main>
  );
}
