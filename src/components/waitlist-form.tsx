"use client";

import { useActionState } from "react";

import { joinWaitlist } from "@/app/actions";
import { idleFormState } from "@/lib/form-state";

function Honeypot({ id }: { id: string }) {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor={id}>Company</label>
      <input id={id} name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

const fieldClass =
  "w-full rounded-2xl bg-tile px-4 py-3 font-semibold text-ink shadow-[0_4px_0_#a5b9c4] placeholder:text-[#4d6573]";

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, idleFormState);

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
      <Honeypot id="waitlist-company" />
      <label htmlFor="waitlist-email" className="font-extrabold">
        Email
      </label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={320}
        placeholder="you@email.com"
        className={fieldClass}
        aria-invalid={state.status === "error"}
        aria-describedby={state.status === "error" ? "waitlist-status" : undefined}
      />
      {state.status === "error" ? (
        <p
          id="waitlist-status"
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
        {pending ? "Sending…" : "Notify me at launch"}
      </button>
    </form>
  );
}
