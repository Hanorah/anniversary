type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, (current / total) * 100);

  return (
    <div className="quiz-card px-4 py-3">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>Progress</span>
        <span className="text-slate-800">
          {current} <span className="text-slate-400">/</span> {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
