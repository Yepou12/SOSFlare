const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readHoneypot(formData: FormData): boolean {
  return String(formData.get("company") ?? "").trim().length > 0;
}

export function readEmail(formData: FormData): string {
  return String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
}

export function validateEmail(email: string): string | null {
  if (email.length === 0 || email.length > 320 || !EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }
  return null;
}

export function readMessage(formData: FormData): string {
  return String(formData.get("message") ?? "").trim();
}

export function validateMessage(message: string): string | null {
  if (message.length < 10 || message.length > 2000) {
    return "Write a message between 10 and 2000 characters.";
  }
  return null;
}
