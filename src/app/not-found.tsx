import type { Metadata } from "next";
import Link from "next/link";

import { HeroBoard } from "@/components/hero-board";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-16 text-center">
      <div className="w-full max-w-[240px]">
        <HeroBoard />
      </div>
      <h1 className="mt-8 font-display text-4xl">Page not found</h1>
      <p className="mt-3 text-lg font-extrabold">This page does not exist.</p>
      <Link
        href="/"
        className="pressable mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl bg-orange px-6 py-3 font-extrabold text-white"
      >
        Back to SOS Flare
      </Link>
    </div>
  );
}
