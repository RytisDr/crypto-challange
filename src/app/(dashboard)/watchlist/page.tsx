import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CryptoQuick: Watchlist",
  description: "View your favorite cryptocurrencies",
};

export default function WatchlistPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Watchlist
          </h1>
          <p className="text-neutral-600">
            Your favorite cryptocurrencies saved for quick access
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
          <p className="text-neutral-600 mb-4">
            No coins in your watchlist yet.
          </p>
          <p className="text-sm text-neutral-500">
            Star your favorite coins from the Price Tracker to add them here.
          </p>
        </div>
      </div>
    </main>
  );
}
