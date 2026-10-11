import type { Metadata } from "next";

import { SupportForm } from "@/components/support-form";
import { CONTACT_EMAIL } from "@/config/site";

export const metadata: Metadata = {
  title: "Support",
  description: "How to play SOS Flare, and how to send a message.",
  alternates: { canonical: "/support" },
};

const faqs = [
  {
    question: "How do you play?",
    answer:
      "Drag letter pieces onto a 6×6 board. Any S-O-S in a row, column, or diagonal clears. Each stage asks for one more SOS before your moves run out.",
  },
  {
    question: "What is Daily Flare?",
    answer:
      "One board a day with a twist, the same for everyone, one try. It resets at midnight, the player's local time.",
  },
  {
    question: "How does Duel work?",
    answer:
      "Two players, one phone, one shared board, and a single score that swings toward whoever scores.",
  },
  {
    question: "Where are scores saved?",
    answer: "Scores are saved on the device. Deleting the app deletes them.",
  },
  {
    question: "How do you turn sound and music off?",
    answer: "Use the gear icon.",
  },
];

export default function SupportPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl">Support</h1>
      <div className="mt-8 space-y-4">
        {faqs.map((item) => (
          <section
            key={item.question}
            className="rounded-[1.75rem] bg-tile p-6 text-ink shadow-[0_6px_0_#a5b9c4]"
          >
            <h2 className="font-display text-2xl">{item.question}</h2>
            <p className="mt-2 text-lg font-extrabold leading-snug">{item.answer}</p>
          </section>
        ))}
      </div>
      <h2 className="mt-12 font-display text-3xl">Contact</h2>
      <p className="mt-3 text-lg leading-relaxed">
        Or email{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-extrabold underline decoration-[#ff6a2b] decoration-2 underline-offset-4"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <div className="mt-6">
        <SupportForm />
      </div>
    </article>
  );
}
