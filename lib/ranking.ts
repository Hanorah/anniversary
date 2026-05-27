export type SessionRow = {
  id: string;
  score: number | null;
  total_time_seconds: number | null;
};

/** Assign position 1–3 with ties sharing the same position number */
export function computePositions(
  sessions: SessionRow[]
): Map<string, number | null> {
  const sorted = [...sessions].sort((a, b) => {
    const scoreA = a.score ?? 0;
    const scoreB = b.score ?? 0;
    if (scoreB !== scoreA) return scoreB - scoreA;
    const timeA = a.total_time_seconds ?? Number.MAX_SAFE_INTEGER;
    const timeB = b.total_time_seconds ?? Number.MAX_SAFE_INTEGER;
    return timeA - timeB;
  });

  const positions = new Map<string, number | null>();
  let rank = 0;
  let lastScore: number | null = null;
  let lastTime: number | null = null;

  for (const session of sorted) {
    const score = session.score ?? 0;
    const time = session.total_time_seconds ?? 0;
    const tied =
      lastScore !== null &&
      score === lastScore &&
      time === lastTime;

    if (!tied) {
      rank += 1;
    }

    lastScore = score;
    lastTime = time;
    positions.set(session.id, rank <= 3 ? rank : null);
  }

  return positions;
}
