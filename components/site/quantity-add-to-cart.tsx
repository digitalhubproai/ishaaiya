"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AddToCartButton } from "@/components/site/add-to-cart";
import type { CartItem } from "@/lib/cart";

export function QtyAddToCart({ item }: { item: CartItem }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex w-full items-stretch justify-between gap-2 sm:w-fit">
      <div className="flex h-12 shrink-0 items-center justify-between gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-1">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="flex size-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white active:scale-90"
        >
          <Minus className="size-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-black tabular-nums text-white">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          aria-label="Increase quantity"
          className="flex size-8 items-center justify-center rounded-lg text-orange-400 transition-colors hover:bg-orange-500/15 active:scale-90"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
      <AddToCartButton
        item={item}
        quantity={qty}
        size="lg"
        full={false}
        className="rounded-xl px-7"
      />
    </div>
  );
}
