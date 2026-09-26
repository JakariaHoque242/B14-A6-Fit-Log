"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlanContext } from "@/context/PlanContext";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isLoaded } = usePlanContext();

  const planCount = isLoaded ? plan.length : 0;
  const savedCount = isLoaded ? saved.length : 0;

  return (
    <nav className="sticky top-0 z-50 w-full bg-zinc-950 border-b border-zinc-800 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wider">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#ccff00]"
          >
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
            <line x1="6" x2="18" y1="17" y2="17" />
          </svg>
          FITLOG
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={clsx(
              "text-sm font-medium transition-colors hover:text-white",
              pathname === "/" ? "text-[#ccff00]" : "text-zinc-400"
            )}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={clsx(
              "text-sm font-medium transition-colors hover:text-white",
              pathname === "/my-plan" ? "text-[#ccff00]" : "text-zinc-400"
            )}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold hover:bg-[#b3e600] transition-colors"
          >
            <span>Plan</span>
            <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 border border-zinc-700 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
