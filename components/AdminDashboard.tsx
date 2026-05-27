"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CorrectAnswersList from "@/components/CorrectAnswersList";
import Leaderboard, { type LeaderboardRow } from "@/components/Leaderboard";
import Podium, { type PodiumEntry } from "@/components/Podium";
import StatsBar from "@/components/StatsBar";
import {
  MIN_SECONDS_PER_QUESTION,
  TOTAL_QUESTIONS,
  WINNER_DELAY_SECONDS,
} from "@/lib/constants";
import { formatTimerDisplay } from "@/lib/format";
import { computePositions } from "@/lib/ranking";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type Session = {
  id: string;
  participant_name: string;
  score: number | null;
  total_time_seconds: number | null;
  is_complete: boolean;
  position: number | null;
  started_at: string;
  completed_at: string | null;
};

function toCountdown(seconds: number) {
  return formatTimerDisplay(Math.max(0, seconds));
}

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [answerCounts, setAnswerCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [nowMs, setNowMs] = useState(Date.now());
  const [rankingsFinalized, setRankingsFinalized] = useState(false);

  const loadData = useCallback(async () => {
    const { data: sessionData, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .order("started_at", { ascending: false });

    if (sessionError) {
      console.error(sessionError);
      setLoading(false);
      return;
    }

    const list = (sessionData ?? []) as Session[];
    setSessions(list);

    const { data: answerData, error: answerError } = await supabase
      .from("answers")
      .select("session_id");

    if (!answerError && answerData) {
      const counts: Record<string, number> = {};
      for (const row of answerData) {
        const sid = row.session_id as string;
        counts[sid] = (counts[sid] ?? 0) + 1;
      }
      setAnswerCounts(counts);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel("sessions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sessions" },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, loadData]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const completed = sessions.filter((s) => s.is_complete);

  const earliestStartedMs = sessions.reduce((earliest, s) => {
    const ms = new Date(s.started_at).getTime();
    if (!Number.isFinite(ms)) return earliest;
    if (earliest === 0 || ms < earliest) return ms;
    return earliest;
  }, 0);

  const unlockAtMs =
    earliestStartedMs > 0
      ? earliestStartedMs + WINNER_DELAY_SECONDS * 1000
      : 0;
  const remainingSeconds = Math.max(0, Math.ceil((unlockAtMs - nowMs) / 1000));
  const quizStarted = earliestStartedMs > 0;
  const rankingLocked = quizStarted && remainingSeconds > 0;

  const provisionalPositions = computePositions(
    completed.map((s) => ({
      id: s.id,
      score: s.score,
      total_time_seconds: s.total_time_seconds,
    }))
  );

  useEffect(() => {
    if (rankingLocked || !quizStarted || rankingsFinalized) return;

    fetch("/api/finalize-rankings", { method: "POST" })
      .then(() => {
        setRankingsFinalized(true);
        loadData();
      })
      .catch((e) => {
        console.error("finalize rankings:", e);
      });
  }, [rankingLocked, quizStarted, rankingsFinalized, loadData]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const goldAchievers = completed.filter((s) => (s.score ?? 0) >= 16).length;

  const podiumWinners: (PodiumEntry | null)[] = [null, null, null];
  if (!rankingLocked) {
    for (const pos of [1, 2, 3] as const) {
      const match = completed.find(
        (s) => (s.position ?? provisionalPositions.get(s.id)) === pos
      );
      if (match) {
        podiumWinners[pos - 1] = {
          id: match.id,
          name: match.participant_name,
          score: match.score ?? 0,
          total_time_seconds: match.total_time_seconds,
          position: pos,
        };
      }
    }
  }

  const leaderboardRows: LeaderboardRow[] = sessions.map((s) => ({
    id: s.id,
    participant_name: s.participant_name,
    score: s.score,
    total_time_seconds: s.total_time_seconds,
    is_complete: s.is_complete,
    position: rankingLocked
      ? null
      : s.position ?? provisionalPositions.get(s.id) ?? null,
    answerCount: answerCounts[s.id] ?? 0,
    suspicious:
      s.is_complete &&
      (s.total_time_seconds ?? 0) <
        TOTAL_QUESTIONS * MIN_SECONDS_PER_QUESTION,
  }));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <p className="text-slate-200">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">CGMI Quiz Admin</h1>
              <p className="text-sm text-blue-100/70">Live event control room</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => loadData()}
                className="rounded-lg border border-cyan-300/40 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg bg-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/25"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {quizStarted && (
          <div className="rounded-2xl border border-amber-300/30 bg-amber-100/10 p-4 text-center text-amber-100 shadow-lg">
            {rankingLocked ? (
              <>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                  Winner calculation in progress
                </p>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {toCountdown(remainingSeconds)}
                </p>
                <p className="mt-1 text-sm text-amber-100/80">
                  Final podium unlocks 4 minutes after the first Begin Quiz tap.
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-emerald-200">
                Final rankings are now locked.
              </p>
            )}
          </div>
        )}

        <StatsBar
          total={sessions.length}
          completed={completed.length}
          inProgress={sessions.length - completed.length}
          goldAchievers={goldAchievers}
        />

        <section className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Podium - Top 3
          </h2>
          <Podium
            winners={[
              podiumWinners[1] ?? null,
              podiumWinners[0] ?? null,
              podiumWinners[2] ?? null,
            ]}
            locked={rankingLocked}
          />
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">Leaderboard</h2>
          <Leaderboard rows={leaderboardRows} rankingLocked={rankingLocked} />
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Correct Answers
          </h2>
          <p className="mb-4 text-sm text-blue-100/70">
            Official answer key for live review after the quiz.
          </p>
          <CorrectAnswersList />
        </section>
      </div>
    </div>
  );
}
