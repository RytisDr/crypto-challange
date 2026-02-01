"use client";

import { Coin } from "@/types/coin";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";

interface CoinCardProps {
  coin: Coin;
}

export function CoinCard({ coin }: CoinCardProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={coin.image}
          alt={coin.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-neutral-900">
            {coin.name}
          </h3>
          <p className="text-xs text-neutral-500 uppercase">{coin.symbol}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-600">Price</span>
          <span className="font-bold text-sm text-neutral-900">
            $
            {coin.current_price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-600">24h Change</span>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-sm text-green-600">
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-sm text-red-600">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
