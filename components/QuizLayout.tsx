import type { ReactNode } from "react";

type QuizLayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function QuizLayout({ children, className = "" }: QuizLayoutProps) {
  return (
    <div className="quiz-scene relative min-h-screen overflow-hidden bg-white">
      <div className="quiz-grid" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-6 sm:px-6">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
