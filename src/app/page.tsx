import Link from "next/link";
import { Timer, Clock, BarChart2, History } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Timer className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold tracking-tight">OT Tracker</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-24 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <Clock className="h-3 w-3" />
            Track every extra hour
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Your overtime,{" "}
            <span className="text-primary">organized.</span>
          </h1>

          <p className="mx-auto max-w-xl text-base text-muted-foreground mb-8">
            Log overtime hours, track monthly stats, and keep a full history —
            all in one simple place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="w-full sm:w-auto rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started — it&apos;s free
            </Link>
            <Link
              href="/sign-in"
              className="w-full sm:w-auto rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 py-16 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Log Hours</h3>
              <p className="text-sm text-muted-foreground">
                Quickly add overtime entries with date, hours, and an optional description.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground">
                <BarChart2 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Monthly Stats</h3>
              <p className="text-sm text-muted-foreground">
                See totals, averages, and a daily breakdown for any month at a glance.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground">
                <History className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Full History</h3>
              <p className="text-sm text-muted-foreground">
                Browse, search, and edit all your past entries in one organized table.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5" />
            OT Tracker
          </div>
          <div className="flex gap-4">
            <Link href="/sign-in" className="hover:text-foreground transition-colors">Sign In</Link>
            <Link href="/sign-up" className="hover:text-foreground transition-colors">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
