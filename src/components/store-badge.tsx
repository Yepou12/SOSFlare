import { APP_STORE_URL } from "@/config/site";

export function StoreBadge() {
  if (!APP_STORE_URL) {
    return null;
  }

  return (
    <a href={APP_STORE_URL} className="inline-block rounded-md">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet="/badges/app-store-white.svg" />
        <img
          src="/badges/app-store-black.svg"
          alt="Download on the App Store"
          width={120}
          height={40}
          className="h-12 w-auto"
        />
      </picture>
    </a>
  );
}
