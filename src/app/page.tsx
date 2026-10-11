import type { Metadata } from "next";

import { HeroBoard } from "@/components/hero-board";
import { ScreenshotStrip } from "@/components/screenshot-strip";
import { StoreBadge } from "@/components/store-badge";
import { WaitlistForm } from "@/components/waitlist-form";
import { APP_STORE_URL } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const steps = [
  "Drag letter pieces onto a 6×6 board.",
  "Any S-O-S in a row, column, or diagonal clears.",
  "Each stage asks for one more SOS before your moves run out.",
];

const modes = [
  {
    title: "Classic",
    body: "Endless stages that get tighter each time.",
  },
  {
    title: "Daily Flare",
    body: "One board a day with a twist, the same for everyone, one try.",
  },
  {
    title: "Duel",
    body: "Two players, one phone, one shared board, and a single score that swings toward whoever scores.",
  },
];

const boardPieces = [
  { title: "Rocks", body: "Rocks break when you clear next to them." },
  { title: "Frozen letters", body: "Frozen letters need two clears." },
  { title: "Gold S", body: "A gold S is worth triple." },
  { title: "Flares", body: "Flares blast a 3×3 area." },
  { title: "Hold", body: "A Hold slot saves a piece." },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16 md:py-20">
        <div className="mx-auto w-full max-w-[300px]">
          <HeroBoard />
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-display text-5xl leading-none sm:text-7xl">SOS Flare</h1>
          <p className="mt-4 text-xl font-extrabold leading-snug sm:text-2xl">
            Line up S-O-S.
            <br />
            Clear the board.
            <br />
            Beat the stage.
          </p>
          <div className="mx-auto mt-8 max-w-md md:mx-0">
            {APP_STORE_URL ? <StoreBadge /> : <WaitlistForm />}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="font-display text-4xl sm:text-5xl">How it plays</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-[22%] bg-orange font-display text-2xl text-white shadow-[0_5px_0_#bf3f0c]"
              >
                {index + 1}
              </span>
              <p className="pt-2 text-lg font-extrabold leading-snug">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="font-display text-4xl sm:text-5xl">Three modes</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {modes.map((mode) => (
            <li
              key={mode.title}
              className="rounded-[1.75rem] bg-navy p-6 text-[#e6f0f4] shadow-[0_8px_0_#091e2d]"
            >
              <h3 className="font-display text-3xl text-white">{mode.title}</h3>
              <p className="mt-3 text-lg font-extrabold leading-snug">{mode.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="font-display text-4xl sm:text-5xl">What&apos;s on the board</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {boardPieces.map((piece) => (
            <li
              key={piece.title}
              className="rounded-[1.75rem] bg-tile p-6 text-ink shadow-[0_6px_0_#a5b9c4]"
            >
              <h3 className="font-display text-2xl">{piece.title}</h3>
              <p className="mt-2 text-lg font-extrabold leading-snug">{piece.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="font-display text-4xl sm:text-5xl">Screenshots</h2>
        <div className="mt-8">
          <ScreenshotStrip />
        </div>
      </section>
    </>
  );
}
