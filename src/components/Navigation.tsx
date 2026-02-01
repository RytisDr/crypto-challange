"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Star } from "lucide-react";

const navigation = [
  { href: "/", label: "Price Tracker", icon: TrendingUp },
  { href: "/watchlist", label: "Watchlist", icon: Star },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-neutral-900">
              CryptoQuick
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {navigation.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
