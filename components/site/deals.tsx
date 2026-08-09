"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { DEALS, CONTACT, dealSlug } from "@/lib/data";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/site/social-icons";
import { AddToCartButton } from "@/components/site/add-to-cart";

const SPRING = { type: "spring", stiffness: 220, damping: 28, mass: 1 } as const;

function getPosition(index: number, active: number, length: number) {
  let diff = index - active;
  const half = Math.floor(length / 2);
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

export function DealsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressControls = useAnimation();

  const length = DEALS.length;

  const next = useCallback(
    () => setActive((a) => (a + 1) % length),
    [length]
  );
  const prev = useCallback(
    () => setActive((a) => (a - 1 + length) % length),
    [length]
  );

  useEffect(() => {
    progressControls.start({
      scaleX: [0, 1],
      transition: { duration: 5, ease: "linear" },
    });
  }, [active, progressControls]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => next(), 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section id="deals" className="relative scroll-mt-20 overflow-hidden bg-[#0d0b09] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-red-700/10 blur-[100px]" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-amber-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Special Offers"
          title="Hot Deals"
          description="Limited time combos at unbeatable prices. Swipe ya arrows use karein — order WhatsApp par!"
          dark
        />

        {/* Coverflow carousel */}
        <div
          className="relative mx-auto max-w-6xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative flex h-[480px] items-center justify-center sm:h-[470px]"
            style={{ perspective: 1600 }}
          >
            {DEALS.map((deal, i) => {
              const position = getPosition(i, active, length);
              const distance = Math.abs(position);
              const isActive = position === 0;
              const visible = distance <= 1;

              return (
                <div
                  key={deal.id}
                  className="absolute left-1/2 top-1/2 h-full w-[280px] -translate-x-1/2 -translate-y-1/2 select-none sm:w-[340px] md:w-[380px]"
                  style={{
                    zIndex: 100 - distance,
                    visibility: visible ? "visible" : "hidden",
                    pointerEvents: visible ? "auto" : "none",
                  }}
                  onClick={() => {
                    if (!isActive) setActive(i);
                  }}
                >
                  <motion.div
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) next();
                      else if (info.offset.x > 80) prev();
                    }}
                    style={{ transformPerspective: 1600 }}
                    animate={{
                      x: `${position * 52}%`,
                      scale: isActive ? 1 : 0.85,
                      rotateY: position * -16,
                      rotateZ: position * 1.2,
                      opacity: isActive ? 1 : 0.45,
                    }}
                    transition={SPRING}
                    className={cn(
                      "relative h-full",
                      isActive && "cursor-grab active:cursor-grabbing"
                    )}
                  >
                    <div
                      className={cn(
                        "relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-2xl transition-shadow duration-300",
                        isActive
                          ? "border-orange-500/50 shadow-orange-500/20"
                          : "border-white/10 shadow-black/40"
                      )}
                    >
                      {isActive && (
                        <Link
                          href={`/item/${dealSlug(deal)}`}
                          aria-label={`View ${deal.title}`}
                          className="absolute inset-0 z-10"
                        />
                      )}
                      {isActive && (
                        <div
                          className="pointer-events-none absolute inset-x-8 top-8 z-10 h-1/2 rounded-full blur-2xl"
                          style={{
                            background:
                              "radial-gradient(closest-side, rgba(255,120,20,0.2), transparent)",
                          }}
                        />
                      )}
                      <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                        <Image
                          src={deal.image}
                          alt={deal.title}
                          width={760}
                          height={460}
                          className="h-full w-full object-cover transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-black/20 to-transparent" />
                        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                          <Gauge className="size-3.5" />
                          {deal.tag}
                        </span>
                        <div className="absolute bottom-3 right-3 flex flex-col items-end gap-0.5 rounded-xl bg-black/60 px-3 py-1.5 backdrop-blur-md">
                          <span className="text-[10px] font-medium text-white/50 line-through">
                            Rs. {deal.oldPrice}
                          </span>
                          <span className="text-lg font-black leading-none text-white">
                            Rs. {deal.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-2 bg-[#12100e] p-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white">
                            {deal.title}
                          </h3>
                          <span className="rounded-full bg-orange-500/15 px-2.5 py-0.5 text-xs font-black text-orange-400">
                            -{Math.round((1 - deal.price / deal.oldPrice) * 100)}%
                          </span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-relaxed text-white/50">
                          {deal.description}
                        </p>
                        <div className="relative z-20 mt-auto flex gap-2">
                          <AddToCartButton
                            item={{
                              id: `deal-${deal.id}`,
                              name: deal.title,
                              price: deal.price,
                              image: deal.image,
                            }}
                            className="flex-1"
                          />
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="size-9 shrink-0 gap-0 rounded-full border-white/20 bg-white/5 px-0 text-white hover:bg-white/10 hover:text-white"
                            aria-label={`Order ${deal.title} on WhatsApp`}
                          >
                            <a
                              href={`${CONTACT.whatsappLink}?text=${encodeURIComponent(
                                `Hi! I want to order the ${deal.title} (Rs. ${deal.price}) from Ishaaiya Restaurant`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <WhatsAppIcon className="size-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* controls */}
          <div className="relative mt-4 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Previous deal"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-2">
              {DEALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to deal ${i + 1}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-500",
                    i === active
                      ? "w-10 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/40"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => next()}
              aria-label="Next deal"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {/* auto-progress bar */}
          <div className="mx-auto mt-5 h-1 max-w-md overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={progressControls}
              className="h-full origin-left rounded-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ transition: "none" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}