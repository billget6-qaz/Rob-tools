"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "focus" | "short" | "long";

const MODES: Record<Mode, { label: string; seconds: number; color: string }> = {
  focus: { label: "專注", seconds: 25 * 60, color: "#e5484d" },
  short: { label: "短休息", seconds: 5 * 60, color: "#30a46c" },
  long: { label: "長休息", seconds: 15 * 60, color: "#3e63dd" },
};

const RING_R = 90;
const RING_C = 2 * Math.PI * RING_R;

function format(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  } catch {
    // 瀏覽器不允許播放音效時略過
  }
}

export default function PomodoroPage() {
  const [mode, setMode] = useState<Mode>("focus");
  const [remaining, setRemaining] = useState(MODES.focus.seconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const endAt = useRef(0);

  const total = MODES[mode].seconds;
  const color = MODES[mode].color;

  function switchMode(next: Mode) {
    setMode(next);
    setRemaining(MODES[next].seconds);
    setRunning(false);
  }

  function toggle() {
    if (!running) endAt.current = Date.now() + remaining * 1000;
    setRunning(!running);
  }

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const left = Math.ceil((endAt.current - Date.now()) / 1000);
      if (left > 0) {
        setRemaining(left);
        return;
      }
      beep();
      setRunning(false);
      if (mode === "focus") {
        const count = done + 1;
        setDone(count);
        switchMode(count % 4 === 0 ? "long" : "short");
      } else {
        switchMode("focus");
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [running, mode, done]);

  useEffect(() => {
    document.title = `${format(remaining)} ${MODES[mode].label}｜蕃茄鐘`;
  }, [remaining, mode]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 p-6">
      <h1 className="text-2xl font-bold">蕃茄鐘</h1>

      <div className="flex gap-2">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className="rounded-full border px-4 py-1.5 text-sm font-medium transition"
            style={
              m === mode
                ? { background: MODES[m].color, borderColor: MODES[m].color, color: "#fff" }
                : { borderColor: "currentColor", opacity: 0.6 }
            }
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-xs">
        <svg viewBox="-100 -100 200 200" className="w-full -rotate-90">
          <circle r={RING_R} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={8} />
          <circle
            r={RING_R}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - remaining / total)}
            style={{ transition: "stroke-dashoffset 0.25s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span className="font-mono text-6xl font-bold tabular-nums">{format(remaining)}</span>
          <span className="text-sm opacity-60">{MODES[mode].label}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggle}
          className="rounded-full px-10 py-3 text-lg font-bold text-white transition hover:opacity-90"
          style={{ background: color }}
        >
          {running ? "暫停" : remaining < total ? "繼續" : "開始"}
        </button>
        <button
          onClick={() => switchMode(mode)}
          className="rounded-full border border-current/40 px-6 py-3 text-lg transition hover:opacity-70"
        >
          重設
        </button>
      </div>

      <p className="text-sm opacity-70">本次已完成 {done} 個蕃茄</p>
    </main>
  );
}
