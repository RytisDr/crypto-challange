import { fetchCoinDetail } from "@/lib/coingecko";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { StarButton } from "@/components/StarButton";
import { notFound } from "next/navigation";
const pageDescription =
  "View detailed information about a specific cryptocurrency";

export async function generateMetadata({ params }: { params: any }) {
  try {
    const resolved = await params;
    const id = resolved?.id as string | undefined;
    if (!id) {
      return {
        title: "Coin Not found - CryptoQuick",
        description: pageDescription,
      };
    }

    const coin = await fetchCoinDetail(id);
    return {
      title: `${coin.name} (${coin.symbol.toUpperCase()}) - CryptoQuick`,
      description:
        coin.description?.en?.slice(0, 160) ||
        `${coin.name} cryptocurrency details`,
    };
  } catch (err) {
    return {
      title: "Coin Details - CryptoQuick",
      description: pageDescription,
    };
  }
}

export default async function CoinPage({ params }: { params: any }) {
  const resolved = await params;
  const id = resolved?.id as string | undefined;

  let coin = null;
  let error: string | null = null;

  try {
    if (!id) {
      throw new Error("Coin ID is required");
    }
    coin = await fetchCoinDetail(id);
  } catch (err) {
    if (err instanceof Error) {
      // Handle 404 Not Found
      if (/API Error:\s*404|\b404\b/i.test(err.message)) {
        return notFound();
      }
      // Handle rate limit errors
      if (/429|rate limit|API Error:\s*429/i.test(err.message)) {
        error = "Rate limit exceeded. Please try again in a moment.";
      } else {
        error = err.message;
      }
    } else {
      error = "Failed to load coin details";
    }
  }

  if (error || !coin) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[var(--background)] to-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={routes.home()}
            className="text-[var(--primary)] hover:text-[var(--primary-foreground)] mb-6 inline-block"
          >
            ← Back to Price Tracker
          </Link>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center">
            <p className="text-sm text-[var(--destructive)]">
              <strong>Error:</strong> {error || "Coin not found"}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const marketCap = coin.market_data?.market_cap?.usd;
  const price = coin.market_data?.current_price?.usd;
  const description = coin.description?.en || "No description available";

  return (
    <main className="bg-gradient-to-br from-[var(--background)] to-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href={routes.home()}
          className="text-[var(--primary)] hover:text-[var(--primary-foreground)] mb-8 inline-block font-medium"
        >
          ← Back to Price Tracker
        </Link>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                  {coin.name}
                </h1>
                <span className="text-lg font-semibold text-[var(--muted-foreground)] uppercase">
                  {coin.symbol}
                </span>
                <StarButton coinId={coin.id} />
              </div>
              {price && (
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  $
                  {price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>
          </div>

          {marketCap && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--border)]">
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-1">
                  Market Cap
                </p>
                <p className="text-lg font-semibold text-[var(--foreground)]">
                  $
                  {marketCap >= 1e9
                    ? (marketCap / 1e9).toFixed(2) + "B"
                    : (marketCap / 1e6).toFixed(2) + "M"}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            About {coin.name}
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-justify">
            {description}
          </p>
        </div>
      </div>
    </main>
  );
}
