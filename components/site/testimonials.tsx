"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { TESTIMONIALS } from "@/lib/data";
import { EASE } from "@/components/motion/reveal";

export function Testimonials() {
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

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              className="relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:bg-white/[0.06]"
            >
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
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover ring-2 ring-orange-500/60"
                />
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}