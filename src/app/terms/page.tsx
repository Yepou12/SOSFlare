import type { Metadata } from "next";

import { CONTACT_EMAIL, POLICY_LAST_UPDATED, PUBLISHER_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for SOS Flare.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl">Terms of Use</h1>
      <p className="mt-3 font-extrabold">Last updated {POLICY_LAST_UPDATED}</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        <p>
          {PUBLISHER_NAME} is provided as is, for personal use.{" "}
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            className="font-extrabold underline decoration-[#ff6a2b] decoration-2 underline-offset-4"
          >
            Apple&apos;s standard licence agreement
          </a>{" "}
          applies.
        </p>
        <p>
          Publisher: {PUBLISHER_NAME}
          <br />
          Contact:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-extrabold underline decoration-[#ff6a2b] decoration-2 underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </article>
  );
}
