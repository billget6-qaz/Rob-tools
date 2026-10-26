"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ToolNav() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-20 border-b border-foreground/10 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition hover:bg-foreground/10"
        >
          <span aria-hidden>←</span>
          回首頁
        </Link>
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-sky-500 text-white">
            🧰
          </span>
          Rob6 小工具箱
        </Link>
      </div>
    </header>
  );
}
