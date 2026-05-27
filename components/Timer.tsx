"use client";

import { useEffect, useRef, useState } from "react";
import {
  QUESTION_TIME_SECONDS,
  TIMER_WARNING_SECONDS,
} from "@/lib/constants";
import { formatTimerDisplay } from "@/lib/format";

type TimerProps = {
  questionKey: number;
  onExpire: () => void;
  paused?: boolean;
};

export default function Timer({
  questionKey,
  onExpire,
  paused = false,
}: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_TIME_SECONDS);
  const onExpireRef = useRef(onExpire);
  const expiredRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setSecondsLeft(QUESTION_TIME_SECONDS);
    expiredRef.current = false;
  }, [questionKey]);

  useEffect(() => {
    if (paused) return;

    if (secondsLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current();
      }
      return;
    }

    const id = window.setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [secondsLeft, paused]);

  const isWarning = secondsLeft <= TIMER_WARNING_SECONDS;
  const pct = (secondsLeft / QUESTION_TIME_SECONDS) * 100;
  const circumference = 2 * Math.PI * 36;

  return (
    <div
      className="flex items-center justify-center gap-3"
      aria-live="polite"
      aria-label={`${secondsLeft} seconds remaining`}
    >
      <div className="relative h-[80px] w-[80px]">
        <svg className="-rotate-90" width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="5"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={isWarning ? "#ef4444" : "#f59e0b"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-lg font-bold tabular-nums ${
            isWarning ? "text-red-500 animate-timer-pulse" : "text-slate-800"
          }`}
        >
          {formatTimerDisplay(secondsLeft)}
        </span>
      </div>
      <div className="text-left">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Time left
        </p>
        <p
          className={`text-sm font-semibold ${isWarning ? "text-red-500" : "text-slate-700"}`}
        >
          {isWarning ? "Hurry!" : "Pick an answer"}
        </p>
      </div>
    </div>
  );
}
