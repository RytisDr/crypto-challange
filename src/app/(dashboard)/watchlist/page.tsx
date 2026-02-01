import type { Metadata } from "next";
import { WatchlistContent } from "@/components/WatchlistContent";
import { fetchTopCoins } from "@/lib/coingecko";
import { Coin } from "@/types/coin";

export const metadata: Metadata = {
  title: "CryptoQuick: Watchlist",
  description: "View your favorite cryptocurrencies",
};

export default async function WatchlistPage() {
  let coins: Coin[] = [];
  let error: string | null = null;

  try {
    coins = await fetchTopCoins();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load data";
  }

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
        <WatchlistContent coins={coins} error={error} />
      </div>
    </main>
  );
}
