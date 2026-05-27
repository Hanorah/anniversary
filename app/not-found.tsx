import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">This page does not exist.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
        >
          Start Quiz
        </Link>
        <Link
          href="/admin/login"
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900"
        >
          Admin Login
        </Link>
      </div>
    </main>
  );
}
