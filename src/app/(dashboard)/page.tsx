import { fetchTopCoins } from "@/lib/coingecko";
import { CoinList } from "@/components/CoinList";
import { Coin } from "@/types/coin";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "CryptoQuick: Top 10 Cryptocurrencies",
  description:
    "App that displays the top 10 cryptocurrency prices from CoinGecko API",
};

export default async function Home() {
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
            Price Tracker
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Track the top 10 cryptocurrencies in real-time.
          </p>
        </div>
        {error && (
          <div className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-sm text-[var(--destructive)]">
              <strong>Error:</strong> {error}
            </p>
            <p className="text-xs text-[var(--destructive)] mt-1">
              Please try again later or check your internet connection.
            </p>
          </div>
        )}
        {coins.length > 0 ? (
          <CoinList coins={coins} />
        ) : (
          !error && (
            <div className="text-center">
              <p className="text-[var(--muted-foreground)]">Loading...</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
