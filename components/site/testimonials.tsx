"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { TESTIMONIALS } from "@/lib/data";
import { EASE } from "@/components/motion/reveal";
import { imageFor } from "@/lib/images";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  });
  const [selected, setSelected] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-20 overflow-hidden bg-[#0d0b09] py-20 text-white sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,92,0,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer Love"
          title="What They Say"
          description="Sab log kya kehte hain Ishaaiya ke baare mein — asli reviews, asli customer."
          dark
        />

        <div className="overflow-hidden md:-mx-3" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: EASE }}
                className="flex min-w-0 shrink-0 grow-0 basis-full flex-col px-3 pt-1 md:basis-1/3"
              >
                <div className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:bg-white/[0.06]">
                  <Quote className="absolute right-6 top-6 size-8 text-orange-500/20" />
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="size-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-white/75">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                    <Image
                      src={imageFor(t.avatar)}
                      alt={t.name}
                      width={48}
                      height={48}
                      placeholder="blur"
                      className="size-12 rounded-full object-cover ring-2 ring-orange-500/60"
                    />
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-xs text-white/50">{t.role}</div>
                    </div>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous reviews"
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-orange-500/50 hover:bg-orange-500/15 hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === (selected ?? 0)
                    ? "w-7 bg-orange-500"
                    : "w-2 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next reviews"
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:border-orange-500/50 hover:bg-orange-500/15 hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}