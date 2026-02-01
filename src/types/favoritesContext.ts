export type FavoritesContextValue = {
  favorites: string[];
  isHydrated: boolean;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
};
