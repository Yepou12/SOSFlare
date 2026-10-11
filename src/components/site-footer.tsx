import Link from "next/link";

import { CONTACT_EMAIL, PUBLISHER_NAME } from "@/config/site";

const footerLink = "rounded-md font-extrabold text-white underline-offset-4 hover:underline";

export function SiteFooter() {
  return (
    <footer className="mt-auto px-5 pb-8 pt-4">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] bg-navy px-6 py-8 text-[#e6f0f4] shadow-[0_8px_0_#091e2d] sm:px-10">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/privacy" className={footerLink}>
            Privacy
          </Link>
          <Link href="/support" className={footerLink}>
            Support
          </Link>
          <Link href="/terms" className={footerLink}>
            Terms
          </Link>
        </nav>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-4 inline-block rounded-md font-extrabold text-gold underline-offset-4 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-6 font-display text-xl text-white">{PUBLISHER_NAME}</p>
      </div>
    </footer>
  );
}
