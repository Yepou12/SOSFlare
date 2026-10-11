"use client";

import { useActionState } from "react";

import { sendSupportMessage } from "@/app/actions";
import { idleFormState } from "@/lib/form-state";

const fieldClass =
  "w-full rounded-2xl bg-tile px-4 py-3 font-semibold text-ink shadow-[0_4px_0_#a5b9c4] placeholder:text-[#4d6573]";

export function SupportForm() {
  const [state, formAction, pending] = useActionState(sendSupportMessage, idleFormState);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-2xl bg-navy px-5 py-4 font-extrabold text-white shadow-[0_6px_0_#091e2d]"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="relative grid gap-3" noValidate>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="support-company">Company</label>
        <input id="support-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="support-email" className="font-extrabold">
        Email
      </label>
      <input
        id="support-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={320}
        className={fieldClass}
        aria-invalid={state.status === "error"}
        aria-describedby={state.status === "error" ? "support-status" : undefined}
      />
      <label htmlFor="support-message" className="font-extrabold">
        Message
      </label>
      <textarea
        id="support-message"
        name="message"
        required
        minLength={10}
        maxLength={2000}
        rows={6}
        className={`${fieldClass} min-h-36 resize-y`}
        aria-invalid={state.status === "error"}
        aria-describedby="support-hint"
      />
      <p id="support-hint" className="text-sm font-extrabold opacity-80">
        10 to 2000 characters.
      </p>
      {state.status === "error" ? (
        <p
          id="support-status"
          role="alert"
          className="rounded-2xl bg-tile px-4 py-3 font-extrabold text-ink shadow-[0_4px_0_#bf3f0c]"
        >
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="pressable inline-flex min-h-12 items-center justify-center rounded-2xl bg-orange px-6 py-3 font-extrabold text-white"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
