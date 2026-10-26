import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rob6的小工具箱",
  description: "抽獎轉盤、蕃茄鐘、今日運勢抽籤，三個簡單好用的小工具。",
};

const TOOLS = [
  {
    href: "/lottery",
    icon: "🎡",
    name: "抽獎轉盤",
    desc: "輸入名單，一鍵轉動轉盤，由指針決定今天的幸運兒。跑馬燈與轉盤動畫讓抽獎更有氣氛。",
    tags: ["自訂名單", "轉盤動畫", "公平隨機"],
    accent: "from-fuchsia-500 to-purple-600",
    anim: "motion-safe:animate-[spin_8s_linear_infinite]",
  },
  {
    href: "/pomodoro",
    icon: "🍅",
    name: "蕃茄鐘",
    desc: "25 分鐘專注、5 分鐘短休息、15 分鐘長休息，圓環倒數與提示音陪你保持節奏。",
    tags: ["專注計時", "自動切換", "提示音"],
    accent: "from-rose-500 to-orange-500",
    anim: "motion-safe:animate-[bounce_1.6s_ease-in-out_infinite]",
  },
  {
    href: "/fortune",
    icon: "🏮",
    name: "今日運勢抽籤",
    desc: "搖一搖籤筒，從大吉到大凶隨機抽出今天的運勢，並附上宜與忌的小提醒。",
    tags: ["七種籤", "宜與忌", "僅供娛樂"],
    accent: "from-amber-400 to-red-500",
    anim: "origin-top motion-safe:animate-[swing_2.4s_ease-in-out_infinite]",
  },
];

const BENEFITS = [
  {
    icon: "🚪",
    title: "免註冊、免安裝",
    desc: "不用建立帳號，也不用下載任何東西，打開網頁就能開始使用。",
  },
  {
    icon: "⚡",
    title: "一鍵上手",
    desc: "每個工具只做一件事，沒有複雜設定，第一次用也知道怎麼操作。",
  },
  {
    icon: "🔒",
    title: "資料留在你的瀏覽器",
    desc: "名單與計時都只在你的頁面上運作，不會上傳到伺服器，也不會被儲存。",
  },
  {
    icon: "🎯",
    title: "專注、不打擾",
    desc: "介面簡潔、沒有廣告與彈窗，讓你把注意力放在要做的事情上。",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-sky-500 text-white shadow-lg">
              🧰
            </span>
            Rob6 小工具箱
          </Link>
          <nav className="flex items-center gap-1 text-sm font-medium">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="hidden rounded-full px-3 py-1.5 opacity-70 transition hover:bg-foreground/10 hover:opacity-100 sm:block"
              >
                {t.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 pb-16 pt-20 text-center sm:pt-28">
          <span className="rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1 text-sm">
            ✨ 三個小工具，隨開隨用
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Rob6 的
            <span className="bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">
              小工具箱
            </span>
          </h1>
          <p className="max-w-xl text-lg opacity-70">
            抽獎、專注、問運勢——不用註冊、不用安裝，打開網頁就能用。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#tools"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-7 py-3 font-bold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-105"
            >
              瀏覽工具
            </a>
            <Link
              href="/pomodoro"
              className="rounded-full border border-foreground/20 px-7 py-3 font-bold transition hover:bg-foreground/10"
            >
              直接開始專注
            </Link>
          </div>
        </section>

        <section id="tools" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 pb-24">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">選一個工具開始</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-7 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-foreground/30 hover:shadow-2xl"
              >
                <div
                  aria-hidden
                  className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${t.accent} opacity-20 blur-2xl transition group-hover:opacity-50`}
                />
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${t.accent} text-3xl shadow-lg`}
                >
                  <span aria-hidden className={`inline-block ${t.anim}`}>
                    {t.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="flex-1 text-sm leading-relaxed opacity-70">{t.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-foreground/10 px-3 py-1 text-xs">
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="mt-1 inline-flex items-center gap-1 font-bold">
                  前往{t.name}
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="why" className="border-y border-foreground/10 bg-foreground/[0.03]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">為什麼好用</h2>
            <p className="mx-auto mt-3 max-w-xl text-center opacity-70">
              沒有多餘的功能，只把最常用的事情做到順手。
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex flex-col items-center gap-3 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/20 to-sky-500/20 text-2xl ring-1 ring-foreground/10">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-bold">{b.title}</h3>
                  <p className="text-sm leading-relaxed opacity-70">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/10 bg-background/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row">
          <p className="opacity-60">© Rob6 小工具箱 · 簡單好用的網頁小工具</p>
          <nav className="flex gap-5 opacity-80">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="transition hover:underline">
                {t.name}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
