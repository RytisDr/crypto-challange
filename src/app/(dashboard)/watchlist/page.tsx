import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CryptoQuick: Watchlist",
  description: "View your favorite cryptocurrencies",
};

export default function WatchlistPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[var(--background)] to-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
            Watchlist
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Your favorite cryptocurrencies.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center">
          <p className="text-[var(--muted-foreground)] mb-4">
            No coins in your watchlist yet.
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Star your favorite coins from the Price Tracker to add them here.
          </p>
        </div>
      </div>
    </main>
  );
}
