import Image from "next/image";
import Link from "next/link";
import QuizLayout from "@/components/QuizLayout";

export default function WelcomePage() {
  return (
    <QuizLayout className="flex flex-1 flex-col items-center justify-center py-10 text-center">
      <div className="quiz-card w-full p-8 sm:p-10">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-slate-100 bg-slate-50 p-2">
          <Image
            src="/logo.png"
            alt="CGMI Church Plus"
            width={100}
            height={100}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
          CGMI Church Plus
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          Anniversary Quiz
        </h1>
        <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
          Changed by God&apos;s Word to Change Our World
        </p>
        <Link href="/quiz" className="btn-primary mt-10">
          Start Quiz →
        </Link>
        <p className="mt-4 text-xs text-slate-400">
          20 questions · 20 seconds each
        </p>
      </div>
    </QuizLayout>
  );
}
