-- Waitlist and support messages are written only by the server
-- using the service role. RLS is on and there are no policies,
-- so the public Data API cannot read or write these tables.

create extension if not exists pgcrypto;

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text unique not null
);

create table public.support_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text not null,
  message text not null
);

alter table public.waitlist enable row level security;
alter table public.support_messages enable row level security;

revoke all on table public.waitlist from anon, authenticated;
revoke all on table public.support_messages from anon, authenticated;

grant all on table public.waitlist to service_role;
grant all on table public.support_messages to service_role;
