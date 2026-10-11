import type { Metadata } from "next";

import { CONTACT_EMAIL, POLICY_LAST_UPDATED, PUBLISHER_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SOS Flare handles information on the device and on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 font-extrabold">Last updated {POLICY_LAST_UPDATED}</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        <p>This policy is published by {PUBLISHER_NAME}.</p>
        <p>The game needs no account and asks for no personal information.</p>
        <p>Scores, settings, and the Daily Flare run are stored on the player&apos;s device only.</p>
        <p>
          The game loads its fonts from Google Fonts. That involves a standard web request to
          Google.
        </p>
        <p>
          The current version shows no ads. If ads are added later through AppLovin, this policy
          will be updated before that version is released.
        </p>
        <p>
          This website stores only what a visitor types into the waitlist or support form: an email,
          and a message on the support form. It is used to reply or to announce the launch. It is
          never sold. To have it deleted, email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-extrabold underline decoration-[#ff6a2b] decoration-2 underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>The game is not directed at children under 13.</p>
        <p>
          Publisher: {PUBLISHER_NAME}
          <br />
          Contact: {CONTACT_EMAIL}
        </p>
      </div>
    </article>
  );
}
