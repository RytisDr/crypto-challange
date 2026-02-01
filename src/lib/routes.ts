export const routes = {
  home: () => "/",
  watchlist: () => "/watchlist",
  coinDetail: (id: string) => `/coin/${id}`,
} as const;
