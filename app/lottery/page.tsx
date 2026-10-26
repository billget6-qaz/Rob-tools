"use client";

import { useEffect, useState } from "react";
import { DEFAULT_PRIZES } from "./prizes";

const SPIN_MS = 5000;
const R = 100;
const PURPLE = "#9b3590";
const BEIGE = "#e8cbb0";
const ACCENT = "#5bb4d3";

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  // 四捨五入：避免伺服器與瀏覽器的三角函數浮點尾數不同，造成 hydration 不一致
  const round = (v: number) => Math.round(v * 1000) / 1000;
  return { x: round(r * Math.sin(rad)), y: round(-r * Math.cos(rad)) };
}

function slicePath(start: number, end: number) {
  const a = polar(start, R);
  const b = polar(end, R);
  const large = end - start > 180 ? 1 : 0;
  return `M0 0 L${a.x} ${a.y} A${R} ${R} 0 ${large} 1 ${b.x} ${b.y} Z`;
}

function sliceColor(i: number, n: number) {
  if (n % 2 === 1 && i === n - 1 && n > 1) return ACCENT;
  return i % 2 === 0 ? PURPLE : BEIGE;
}

function starPoints(outer: number, inner: number) {
  return Array.from({ length: 10 }, (_, k) => {
    const { x, y } = polar(k * 36, k % 2 === 0 ? outer : inner);
    return `${x},${y}`;
  }).join(" ");
}

export default function LotteryPage() {
  const [text, setText] = useState(DEFAULT_PRIZES.join("\n"));
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!spinning) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % 16), 40);
    return () => window.clearInterval(id);
  }, [spinning]);

  const names = text
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);
  const n = names.length;
  const step = n > 0 ? 360 / n : 0;

  function spin() {
    if (spinning || n < 2) return;
    const idx = Math.floor(Math.random() * n);
    const jitter = (Math.random() - 0.5) * step * 0.7;
    const target = (((-((idx + 0.5) * step + jitter)) % 360) + 360) % 360;
    const current = ((rotation % 360) + 360) % 360;
    const delta = (((target - current) % 360) + 360) % 360;
    setWinner(null);
    setTick(0);
    setSpinning(true);
    setRotation(rotation + 360 * 6 + delta);
    window.setTimeout(() => {
      setWinner(names[idx]);
      setSpinning(false);
    }, SPIN_MS);
  }

  const fontSize = n <= 8 ? 9 : n <= 16 ? 7 : 5;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 p-6 md:flex-row md:items-start">
      <section className="flex w-full flex-col gap-3 md:w-80">
        <h1 className="text-2xl font-bold">抽獎小工具</h1>
        <label htmlFor="names" className="text-sm opacity-70">
          名單（每行一位，至少 2 位）
        </label>
        <textarea
          id="names"
          value={text}
          disabled={spinning}
          onChange={(e) => {
            setText(e.target.value);
            setWinner(null);
          }}
          rows={14}
          placeholder={"小明\n小華\n小美"}
          className="rounded-lg border border-current/30 bg-transparent p-3 outline-none focus:border-current disabled:opacity-50"
        />
        <p className="text-sm opacity-70">目前 {n} 位</p>
      </section>

      <section className="flex flex-1 flex-col items-center gap-6">
        <div className="w-full max-w-md">
          <svg viewBox="-135 -135 270 325" className="w-full">
            <rect x={-32} y={100} width={64} height={62} fill="#0b3d6b" />
            <rect x={-32} y={100} width={64} height={14} fill="#082d50" />
            <rect x={-68} y={160} width={136} height={24} fill={ACCENT} />
            <rect x={-68} y={160} width={136} height={5} fill="#a9dbe9" />
            <circle r={130} fill={ACCENT} />
            {Array.from({ length: 16 }, (_, i) => {
              const { x, y } = polar((i * 360) / 16, 115);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={5.5}
                  fill={spinning && ((tick - i + 16) % 16) < 5 ? "#ffd21f" : "#fff"}
                  stroke={spinning && ((tick - i + 16) % 16) < 5 ? "#ff8a00" : "#f2b705"}
                  strokeWidth={2.5}
                />
              );
            })}
            <circle r={R + 2} fill="#0b3d6b" />
            <g
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? `transform ${SPIN_MS}ms cubic-bezier(0.12, 0.6, 0.1, 1)`
                  : "none",
              }}
            >
              {n === 0 && <circle r={R} fill={BEIGE} />}
              {n === 1 && <circle r={R} fill={PURPLE} />}
              {n >= 2 &&
                names.map((_, i) => (
                  <path
                    key={i}
                    d={slicePath(i * step, (i + 1) * step)}
                    fill={sliceColor(i, n)}
                  />
                ))}
              {n >= 1 &&
                names.map((name, i) => (
                  <text
                    key={`t${i}`}
                    transform={`rotate(${(i + 0.5) * step - 90}) translate(${R - 6} 0)`}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={fontSize}
                    fill={sliceColor(i, n) === BEIGE ? "#6b2a66" : "#fff"}
                    fontWeight={700}
                  >
                    {name.length > 8 ? `${name.slice(0, 8)}…` : name}
                  </text>
                ))}
            </g>
            <polygon
              points="-15,-8 15,-8 0,-58"
              fill="#e8981a"
              stroke="#f5b942"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
            <circle r={20} fill={ACCENT} />
            <circle r={16} fill="#0a3fa0" />
            <polygon points={starPoints(11, 4.5)} fill="#0b2d63" />
            <circle r={4} fill={ACCENT} />
          </svg>
        </div>

        <button
          onClick={spin}
          disabled={spinning || n < 2}
          className="rounded-full bg-red-600 px-10 py-3 text-lg font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {spinning ? "抽獎中…" : "開始抽獎"}
        </button>

        <div className="min-h-12 text-center text-2xl font-bold">
          {winner && <>🎉 恭喜 {winner}！</>}
        </div>
      </section>
    </main>
  );
}
