"use client";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-2xl flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest",
          dark ? "bg-orange-500/15 text-orange-400" : "bg-flame/10 text-flame"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            dark ? "text-white/50" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}