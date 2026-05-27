"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import QuizLayout from "@/components/QuizLayout";

function DoneContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const name = searchParams.get("name") ?? "Participant";
  const calledRef = useRef(false);

  useEffect(() => {
    if (!sessionId || calledRef.current) return;
    calledRef.current = true;
    fetch("/api/complete-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
  }, [sessionId]);

  if (!sessionId) {
    return (
      <QuizLayout className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">Invalid session.</p>
      </QuizLayout>
    );
  }

  return (
    <QuizLayout className="flex flex-1 flex-col items-center justify-center py-10 text-center">
      <div className="quiz-card w-full p-8 sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 animate-check-pop items-center justify-center rounded-full bg-emerald-500 text-4xl text-white shadow-md shadow-emerald-200">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          You&apos;re done! 🎉
        </h1>
        <p className="mt-4 text-xl font-medium text-amber-700">
          {decodeURIComponent(name)}
        </p>
        <p className="mt-6 text-slate-600">
          Your answers have been submitted.
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Stay tuned — results will be announced shortly!
        </p>
      </div>
    </QuizLayout>
  );
}

export default function QuizDonePage() {
  return (
    <Suspense
      fallback={
        <QuizLayout className="flex flex-1 items-center justify-center">
          <p className="text-slate-400">Loading...</p>
        </QuizLayout>
      }
    >
      <DoneContent />
    </Suspense>
  );
}
