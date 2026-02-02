import { Coin, CoinDetail } from "@/types/coin";

export async function fetchTopCoins(): Promise<Coin[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
      {
        next: { revalidate: 60 }, // 60 sec is "data freshness" for demo api usage
      },
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const coins: Coin[] = await response.json();
    return coins;
  } catch (error) {
    console.error("Failed to fetch coins:", error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to fetch cryptocurrency data");
  }
}

export async function fetchCoinDetail(id: string): Promise<CoinDetail> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`,
      {
        next: { revalidate: 300 }, // depending on requirements, but won't time-out as easily.
      },
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const coin: CoinDetail = await response.json();
    return coin;
  } catch (error) {
    console.error(`Failed to fetch coin ${id}:`, error);
    if (error instanceof Error) throw error;
    throw new Error(`Failed to fetch coin details for ${id}`);
  }
}
