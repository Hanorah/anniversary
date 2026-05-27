import { questions } from "@/lib/questions";

export default function CorrectAnswersList() {
  return (
    <ol className="space-y-3">
      {questions.map((q) => (
        <li
          key={q.id}
          className="rounded-xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm"
        >
          <p className="font-medium text-white">
            Q{q.id}. {q.question}
          </p>
          <p className="mt-1.5 text-emerald-300">
            <span className="text-blue-100/70">Answer: </span>
            {q.correct}
          </p>
        </li>
      ))}
    </ol>
  );
}
