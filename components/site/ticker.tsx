"use client";

import { motion } from "framer-motion";
import { TICKER_ITEMS } from "@/lib/data";

export function Ticker() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-orange-600/90 via-red-600/90 to-orange-600/90 py-3.5">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.22em] text-white"
          >
            {item}
            <span className="text-yellow-300/90">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}