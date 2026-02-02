import { Coin } from "@/types/coin";

export const routes = {
  home: () => "/",
  watchlist: () => "/watchlist",
  coinDetail: (id: Coin["id"]) => `/coin/${id}`,
} as const;
