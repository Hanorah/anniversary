type StatsBarProps = {
  total: number;
  completed: number;
  inProgress: number;
  goldAchievers: number;
};

export default function StatsBar({
  total,
  completed,
  inProgress,
  goldAchievers,
}: StatsBarProps) {
  const cards = [
    { label: "Total Participants", value: total, glow: "from-cyan-300/30 to-blue-400/20" },
    { label: "Completed", value: completed, glow: "from-emerald-300/30 to-green-400/20" },
    { label: "In Progress", value: inProgress, glow: "from-violet-300/30 to-indigo-400/20" },
    { label: "Gold Achievers", value: goldAchievers, glow: "from-amber-300/30 to-yellow-400/20" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-lg backdrop-blur-md"
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.glow}`} />
          <p className="relative text-3xl font-bold text-white">{card.value}</p>
          <p className="relative mt-1 text-sm text-blue-100/80">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

