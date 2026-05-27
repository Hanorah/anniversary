"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import QuizLayout from "@/components/QuizLayout";
import Timer from "@/components/Timer";
import {
  ANSWER_ADVANCE_MS,
  TIMEOUT_ADVANCE_MS,
  TOTAL_QUESTIONS,
} from "@/lib/constants";
import { questions } from "@/lib/questions";

type Step = "name" | "question";

function submitAnswerFireAndForget(
  sessionId: string,
  q: (typeof questions)[0],
  answer: string | null
) {
  fetch("/api/submit-answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      question_number: q.id,
      question_text: q.question,
      selected_answer: answer,
      correct_answer: q.correct,
    }),
  }).catch(() => {});
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [timesUpFlash, setTimesUpFlash] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lockedRef = useRef(false);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (step === "question" || (step === "name" && sessionId)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [step, sessionId]);

  useEffect(() => {
    if (step === "question") {
      window.history.pushState({ quiz: true }, "");
      const onPopState = () => {
        window.history.pushState({ quiz: true }, "");
      };
      window.addEventListener("popstate", onPopState);
      return () => window.removeEventListener("popstate", onPopState);
    }
  }, [step]);

  const goNext = useCallback(() => {
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      const params = new URLSearchParams({
        session_id: sessionId!,
        name,
      });
      router.replace(`/quiz/done?${params.toString()}`);
      return;
    }

    setQuestionIndex((i) => i + 1);
    setSelected(null);
    setDisabled(false);
    setTimesUpFlash(false);
    lockedRef.current = false;
  }, [questionIndex, sessionId, name, router]);

  const handleSelect = useCallback(
    (option: string) => {
      if (disabled || lockedRef.current || !sessionId) return;
      lockedRef.current = true;
      setSelected(option);
      setDisabled(true);

      const q = questions[questionIndex];
      submitAnswerFireAndForget(sessionId, q, option);

      window.setTimeout(goNext, ANSWER_ADVANCE_MS);
    },
    [disabled, sessionId, questionIndex, goNext]
  );

  const handleExpire = useCallback(() => {
    if (lockedRef.current || !sessionId) return;
    lockedRef.current = true;
    setDisabled(true);
    setTimesUpFlash(true);

    const q = questions[questionIndex];
    submitAnswerFireAndForget(sessionId, q, null);

    window.setTimeout(goNext, TIMEOUT_ADVANCE_MS);
  }, [sessionId, questionIndex, goNext]);

  const handleStartName = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name");
      return;
    }
    setError("");
    setLoading(true);

    const res = await fetch("/api/start-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participant_name: trimmed }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Could not start quiz");
      return;
    }

    setSessionId(data.session_id);
    setStep("question");
    router.replace("/quiz");
  };

  if (step === "name") {
    return (
      <QuizLayout className="flex flex-1 flex-col justify-center py-8">
        <div className="quiz-card p-6 sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
            Anniversary Quiz
          </p>
          <h1 className="mt-3 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            What&apos;s your name?
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            We&apos;ll use this on the leaderboard
          </p>
          <form onSubmit={handleStartName} className="mt-8 space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="input-field"
              autoComplete="name"
              autoFocus
            />
            {error && (
              <p className="text-center text-sm text-red-600">{error}</p>
            )}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Starting..." : "Begin Quiz →"}
            </button>
          </form>
        </div>
      </QuizLayout>
    );
  }

  const current = questions[questionIndex];

  return (
    <QuizLayout className="flex flex-1 flex-col gap-4 pb-4">
      <ProgressBar current={questionIndex + 1} total={TOTAL_QUESTIONS} />
      <div className="flex justify-center py-1">
        <Timer
          questionKey={questionIndex}
          onExpire={handleExpire}
          paused={disabled}
        />
      </div>
      <QuestionCard
        question={current}
        selected={selected}
        disabled={disabled}
        onSelect={handleSelect}
        timesUpFlash={timesUpFlash}
      />
    </QuizLayout>
  );
}
