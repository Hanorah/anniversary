"use client";

import { TOTAL_QUESTIONS } from "@/lib/constants";
import { formatTime } from "@/lib/format";

export type LeaderboardRow = {
  id: string;
  participant_name: string;
  score: number | null;
  total_time_seconds: number | null;
  is_complete: boolean;
  position: number | null;
  answerCount: number;
  suspicious?: boolean;
};

type LeaderboardProps = {
  rows: LeaderboardRow[];
  onSelect?: (id: string) => void;
  selectedId?: string | null;
  rankingLocked?: boolean;
};

function rowAccent(position: number | null) {
  if (position === 1) return "border-l-4 border-yellow-300";
  if (position === 2) return "border-l-4 border-slate-300";
  if (position === 3) return "border-l-4 border-amber-700";
  return "border-l-4 border-transparent";
}

export default function Leaderboard({
  rows,
  onSelect,
  selectedId = null,
  rankingLocked = false,
}: LeaderboardProps) {
  const sorted = [...rows].sort((a, b) => {
    const scoreA = a.score ?? -1;
    const scoreB = b.score ?? -1;
    if (scoreB !== scoreA) return scoreB - scoreA;
    const timeA = a.total_time_seconds ?? Number.MAX_SAFE_INTEGER;
    const timeB = b.total_time_seconds ?? Number.MAX_SAFE_INTEGER;
    return timeA - timeB;
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/35">
      <table className="w-full min-w-[690px] text-left text-sm text-slate-100">
        <thead className="bg-white/10 text-blue-100/90">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Gold Achiever</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, index) => {
            const rank = row.is_complete
              ? rankingLocked
                ? "Pending"
                : row.position ?? index + 1
              : "-";

            const status = row.is_complete
              ? "Completed"
              : `In Progress (Q ${Math.min(row.answerCount + 1, TOTAL_QUESTIONS)} of ${TOTAL_QUESTIONS})`;

            return (
              <tr
                key={row.id}
                onClick={onSelect ? () => onSelect(row.id) : undefined}
                className={`border-t border-white/10 transition-colors ${
                  onSelect ? "cursor-pointer hover:bg-white/10" : ""
                } ${selectedId === row.id ? "bg-white/10" : ""} ${rowAccent(row.position)}`}
              >
                <td className="px-4 py-3 font-medium">
                  {row.suspicious && "⚠️ "}
                  {rank}
                </td>
                <td className="px-4 py-3 font-medium">{row.participant_name}</td>
                <td className="px-4 py-3">
                  {row.is_complete
                    ? `${row.score ?? 0}/${TOTAL_QUESTIONS}`
                    : row.answerCount > 0
                      ? "In progress"
                      : "—"}
                </td>
                <td className="px-4 py-3">{formatTime(row.total_time_seconds)}</td>
                <td className="px-4 py-3">{(row.score ?? 0) >= 16 ? "⭐" : ""}</td>
                <td className="px-4 py-3">{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

