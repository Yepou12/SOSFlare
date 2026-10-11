import Image from "next/image";
import Link from "next/link";

const navLink =
  "rounded-md font-extrabold underline-offset-4 hover:underline";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#0e2a3c]/10 bg-background/90 backdrop-blur-sm dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3 rounded-xl">
          <Image
            src="/logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="size-12 rounded-2xl"
          />
          <span className="font-display text-2xl leading-none">SOS Flare</span>
        </Link>
        <nav aria-label="Site" className="flex gap-4 text-sm sm:text-base">
          <Link href="/privacy" className={navLink}>
            Privacy
          </Link>
          <Link href="/support" className={navLink}>
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}
