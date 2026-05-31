import { TOTAL_QUESTIONS } from "@/lib/constants";
import { formatTime } from "@/lib/format";

export type PodiumEntry = {
  id: string;
  name: string;
  score: number;
  total_time_seconds: number | null;
  position: number;
};

type PodiumProps = {
  winners: (PodiumEntry | null)[];
  locked?: boolean;
};

function PodiumCard({
  entry,
  place,
  locked,
}: {
  entry: PodiumEntry | null;
  place: 1 | 2 | 3;
  locked: boolean;
}) {
  const styles = {
    1: {
      bg: "bg-gradient-to-b from-yellow-300 to-amber-500 text-slate-900",
      label: "1st Place",
      order: "order-2",
      h: "min-h-[230px]",
    },
    2: {
      bg: "bg-gradient-to-b from-slate-200 to-slate-400 text-slate-900",
      label: "2nd Place",
      order: "order-1",
      h: "min-h-[190px]",
    },
    3: {
      bg: "bg-gradient-to-b from-amber-700 to-amber-900 text-white",
      label: "3rd Place",
      order: "order-3",
      h: "min-h-[190px]",
    },
  }[place];

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-end rounded-t-2xl px-3 pb-4 pt-6 shadow-lg ${styles.bg} ${styles.order} ${styles.h}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
        {styles.label}
      </p>
      {locked ? (
        <p className="mt-3 text-sm font-semibold opacity-80">Calculating...</p>
      ) : entry ? (
        <>
          <p className="mt-2 text-center text-lg font-bold leading-tight">
            {entry.name}
          </p>
          <p className="mt-1 text-sm font-medium">Score: {entry.score}/{TOTAL_QUESTIONS}</p>
          <p className="text-sm opacity-90">Time: {formatTime(entry.total_time_seconds)}</p>
          {entry.score >= 16 && (
            <p className="mt-2 text-sm font-semibold">? Gold Achiever</p>
          )}
        </>
      ) : (
        <p className="mt-4 text-center text-lg font-medium opacity-70">Waiting...</p>
      )}
    </div>
  );
}

export default function Podium({ winners, locked = false }: PodiumProps) {
  const [second, first, third] = winners;

  return (
    <div className="flex items-end justify-center gap-2 md:gap-4">
      <PodiumCard entry={second} place={2} locked={locked} />
      <PodiumCard entry={first} place={1} locked={locked} />
      <PodiumCard entry={third} place={3} locked={locked} />
    </div>
  );
}

