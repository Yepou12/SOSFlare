"use server";

import { CONTACT_EMAIL } from "@/config/site";
import type { FormState } from "@/lib/form-state";
import { createServiceClient } from "@/lib/supabase";
import {
  readEmail,
  readHoneypot,
  readMessage,
  validateEmail,
  validateMessage,
} from "@/lib/validation";

const waitlistSuccess: FormState = {
  status: "success",
  message: "You are on the list. We will email you when SOS Flare launches.",
};

function isDuplicate(error: { code?: string; message?: string }): boolean {
  return error.code === "23505" || /duplicate key/i.test(error.message ?? "");
}

export async function joinWaitlist(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  if (readHoneypot(formData)) {
    return waitlistSuccess;
  }

  const emailError = validateEmail(readEmail(formData));
  if (emailError) {
    return { status: "error", message: emailError };
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return {
      status: "error",
      message: `We could not save that. Email ${CONTACT_EMAIL} instead.`,
    };
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: readEmail(formData) });

  if (!error || isDuplicate(error)) {
    return waitlistSuccess;
  }

  console.error("waitlist insert failed", error.code);
  return {
    status: "error",
    message: `We could not save that. Email ${CONTACT_EMAIL} instead.`,
  };
}

export async function sendSupportMessage(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  if (readHoneypot(formData)) {
    return {
      status: "success",
      message: "Message sent. We will reply to that email.",
    };
  }

  const email = readEmail(formData);
  const message = readMessage(formData);
  const problems = [validateEmail(email), validateMessage(message)].filter(
    (problem): problem is string => problem !== null,
  );

  if (problems.length > 0) {
    return { status: "error", message: problems.join(" ") };
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return {
      status: "error",
      message: `We could not send that. Email ${CONTACT_EMAIL} instead.`,
    };
  }

  const { error } = await supabase
    .from("support_messages")
    .insert({ email, message });

  if (error) {
    console.error("support insert failed", error.code);
    return {
      status: "error",
      message: `We could not send that. Email ${CONTACT_EMAIL} instead.`,
    };
  }

  return {
    status: "success",
    message: "Message sent. We will reply to that email.",
  };
}
