"use client";

import type { Question } from "@/lib/questions";

const LABELS = ["A", "B", "C", "D"];

type QuestionCardProps = {
  question: Question;
  selected: string | null;
  disabled: boolean;
  onSelect: (option: string) => void;
  timesUpFlash?: boolean;
};

export default function QuestionCard({
  question,
  selected,
  disabled,
  onSelect,
  timesUpFlash = false,
}: QuestionCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {timesUpFlash && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-center text-sm font-semibold text-red-600 animate-pulse">
          Time&apos;s up — moving on
        </div>
      )}

      <div className="quiz-card p-5 sm:p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
          Question {question.id}
        </p>
        <h2 className="text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl">
          {question.question}
        </h2>
      </div>

      <ul className="flex flex-col gap-2.5">
        {question.options.map((option, index) => {
          const isSelected = selected === option;
          const label = LABELS[index] ?? String(index + 1);

          return (
            <li
              key={option}
              className="option-enter"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(option)}
                className={`group flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150 sm:gap-4 sm:px-5 ${
                  isSelected
                    ? "option-selected scale-[1.01]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]"
                } ${disabled && !isSelected ? "pointer-events-none opacity-40" : ""}`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                    isSelected
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                  }`}
                >
                  {isSelected ? "✓" : label}
                </span>
                <span
                  className={`flex-1 text-[15px] leading-snug sm:text-base ${
                    isSelected ? "font-medium text-slate-900" : "text-slate-700"
                  }`}
                >
                  {option}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
