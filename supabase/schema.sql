-- Run this in the Supabase SQL Editor

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  participant_name text not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  score integer,
  total_time_seconds integer,
  is_complete boolean default false,
  position integer
);

create table if not exists answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  question_number integer not null,
  question_text text not null,
  selected_answer text,
  correct_answer text not null,
  is_correct boolean default false,
  answered_at timestamptz default now()
);

create index if not exists answers_session_id_idx on answers(session_id);

alter table sessions enable row level security;
alter table answers enable row level security;

-- Participants (anon) can create sessions
create policy "anon_insert_sessions"
  on sessions for insert
  to anon
  with check (true);

-- Admin (authenticated) can read and update sessions
create policy "auth_select_sessions"
  on sessions for select
  to authenticated
  using (true);

create policy "auth_update_sessions"
  on sessions for update
  to authenticated
  using (true)
  with check (true);

-- Participants (anon) can insert answers
create policy "anon_insert_answers"
  on answers for insert
  to anon
  with check (true);

-- Admin (authenticated) can read answers
create policy "auth_select_answers"
  on answers for select
  to authenticated
  using (true);

-- Enable Realtime for admin dashboard
alter publication supabase_realtime add table sessions;
