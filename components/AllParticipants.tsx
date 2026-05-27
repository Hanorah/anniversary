"use client";

import { formatTime } from "@/lib/format";

export type ParticipantRow = {
  id: string;
  name: string;
  score: number | null;
  liveScore: number;
  total_time_seconds: number | null;
  is_complete: boolean;
  answerCount: number;
};

type AllParticipantsProps = {
  rows: ParticipantRow[];
};

export default function AllParticipants({ rows }: AllParticipantsProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-blue-100/70">No participants yet.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/35">
      <table className="w-full min-w-[640px] text-left text-sm text-slate-100">
        <thead className="bg-white/10 text-blue-100/90">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const displayScore = row.is_complete
              ? `${row.score ?? 0}/20`
              : row.liveScore > 0
                ? `${row.liveScore}/20 (so far)`
                : row.answerCount > 0
                  ? `0/20 (Q ${row.answerCount})`
                  : "—";

            const status = row.is_complete
              ? "Completed"
              : `In progress · Q ${Math.min(row.answerCount + 1, 20)} of 20`;

            return (
              <tr
                key={row.id}
                className="border-t border-white/10 transition-colors hover:bg-white/5"
              >
                <td className="px-4 py-3 tabular-nums text-blue-100/80">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{displayScore}</td>
                <td className="px-4 py-3">
                  {row.is_complete ? formatTime(row.total_time_seconds) : "—"}
                </td>
                <td className="px-4 py-3 text-blue-100/80">{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="border-t border-white/10 px-4 py-2 text-xs text-blue-100/60">
        {rows.length} participant{rows.length === 1 ? "" : "s"} total
      </p>
    </div>
  );
}
