"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Snowflake, Bike, MessageCircle, Utensils } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { FEATURES } from "@/lib/data";
import { EASE } from "@/components/motion/reveal";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  snowflake: Snowflake,
  bike: Bike,
  message: MessageCircle,
  utensils: Utensils,
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-[#0d0b09] py-20 sm:py-28"
    >
      <div className="absolute -left-24 top-1/4 size-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/images/karahi.jpg"
                    alt="Fresh desi karahi"
                    width={600}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl">
                    <Image
                      src="/images/biryani.jpg"
                      alt="Aromatic biryani"
                      width={600}
                      height={500}
                      className="h-52 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl">
                    <Image
                      src="/images/shawarma.jpg"
                      alt="Loaded shawarma"
                      width={600}
                      height={500}
                      className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/70 px-6 py-4 text-white shadow-2xl shadow-black/40 backdrop-blur-xl"
              >
                <span className="text-4xl font-black leading-none text-orange-400">
                  10+
                </span>
                <span className="text-sm font-medium leading-tight text-white/70">
                  Years of serving
                  <br />
                  authentic swaad
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              dark
              eyebrow="Our Story"
              title="Why Ishaaiya?"
              description="Ishaaiya Restaurant mein aap ko milta hai hot, fresh aur authentic Pakistani cuisine. BBQ se desi tak, sab kuch best quality mein. Har dish mein hai swaad, har bite mein hai pyaar."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, i) => {
                const Icon = ICON_MAP[feature.icon] ?? Utensils;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-orange-500/40 hover:bg-white/[0.06]"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{feature.title}</h3>
                      <p className="text-sm text-white/50">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}