"use client";

export type AnswerRow = {
  question_number: number;
  question_text: string;
  selected_answer: string | null;
  correct_answer: string;
  is_correct: boolean;
};

type ParticipantDetailProps = {
  name: string;
  answers: AnswerRow[];
  defaultOpen?: boolean;
};

export default function ParticipantDetail({
  name,
  answers,
  defaultOpen = false,
}: ParticipantDetailProps) {
  const sorted = [...answers].sort((a, b) => a.question_number - b.question_number);

  return (
    <details
      className="rounded-xl border border-white/10 bg-slate-950/35"
      open={defaultOpen}
    >
      <summary className="cursor-pointer px-4 py-3 font-semibold text-cyan-100">
        {name}
      </summary>
      <ol className="space-y-4 border-t border-white/10 px-4 py-4">
        {sorted.map((a) => (
          <li key={a.question_number} className="text-sm text-blue-100/90">
            <p className="font-medium text-white">
              Q{a.question_number}. {a.question_text}
            </p>
            <p className="mt-1">
              Their answer:{" "}
              {a.selected_answer === null ? (
                <span className="text-slate-400">No answer (timed out)</span>
              ) : (
                <span className={a.is_correct ? "text-emerald-300" : "text-rose-300"}>
                  {a.selected_answer}
                </span>
              )}
            </p>
            <p className="mt-0.5 text-emerald-300">Correct answer: {a.correct_answer}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}

