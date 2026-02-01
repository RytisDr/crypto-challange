"use client";

import { FavoritesContextValue } from "@/types/favoritesContext";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

const KEY = "crypto_quick_favorites";

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setFavorites(raw ? JSON.parse(raw) : []);
    } catch {
      setFavorites([]);
    } finally {
      setIsHydrated(true);
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        try {
          setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setFavorites([]);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isHydrated, isFavorite, toggle }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error(
      "useFavoritesContext must be used within FavoritesProvider",
    );
  return ctx;
}
