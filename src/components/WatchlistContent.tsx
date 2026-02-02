"use client";

import { useEffect, useState } from "react";
import { useFavoritesContext } from "@/components/FavoritesProvider";
import { CoinList } from "@/components/CoinList";
import { Coin } from "@/types/coin";

type WatchlistContentProps = {
  coins: Coin[];
  error?: string | null;
};

export function WatchlistContent({ coins, error }: WatchlistContentProps) {
  const { favorites, isHydrated } = useFavoritesContext();
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);

  useEffect(() => {
    if (isHydrated) {
      const watched = coins.filter((coin) => favorites.includes(coin.id));
      setFilteredCoins(watched);
    }
  }, [favorites, isHydrated, coins]);

  if (!isHydrated) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted-foreground)]">Loading watchlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="text-sm text-[var(--destructive)]">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  if (filteredCoins.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <p className="text-[var(--muted-foreground)] mb-4">
          No coins in your watchlist yet.
        </p>
        <p className="text-sm text-[var(--muted-foreground)]">
          Star your favorite coins from the Price Tracker to add them here.
        </p>
      </div>
    );
  }

  return <CoinList coins={filteredCoins} />;
}
