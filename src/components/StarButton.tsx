import { useFavoritesContext as useFavorites } from "@/components/FavoritesProvider";
import { Coin } from "@/types/coin";
import { Star } from "lucide-react";

export function StarButton({ coinId }: { coinId: Coin["id"] }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(coinId);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggle(coinId);
      }}
      aria-pressed={fav}
      aria-label={fav ? "Remove from watchlist" : "Add to watchlist"}
      className={`p-1 rounded-md transition-colors cursor-pointer ${
        fav
          ? "text-[var(--accent)] hover:text-[var(--accent-foreground)]"
          : "text-[var(--ring)] hover:text-[var(--muted-foreground)]"
      }`}
    >
      {fav ? (
        <Star className="w-7 h-7 text-[var(--chart-4)] fill-[var(--chart-4)] transition-colors" />
      ) : (
        <Star className="w-7 h-7 transition-colors" />
      )}
    </button>
  );
}
