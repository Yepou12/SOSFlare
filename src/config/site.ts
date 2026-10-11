/**
 * Everything you edit lives here.
 * On launch day, set SITE_URL, APP_STORE_URL, and APP_STORE_ID.
 */
export const SITE_URL = "https://YOUR-DOMAIN.com";
export const CONTACT_EMAIL = "jacobcarrier717@gmail.com";
export const PUBLISHER_NAME = "SOS Flare";

/** Leave empty until the app is live. The landing page then shows the App Store badge. */
export const APP_STORE_URL = "";

/** Leave empty until the app is live. When set, the Smart App Banner meta tag is added. */
export const APP_STORE_ID = "";

export const POLICY_LAST_UPDATED = "October 11, 2026";

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  return path === "/" ? base : `${base}${path}`;
}
