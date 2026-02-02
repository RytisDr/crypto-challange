export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
};

export type CoinDetail = {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  description?: {
    en: string;
  };
  market_data?: {
    market_cap?: {
      usd: number | null;
    };
    current_price?: {
      usd: number;
    };
  };
};
