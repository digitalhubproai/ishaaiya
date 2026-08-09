"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS, CONTACT } from "@/lib/data";
import { WhatsAppIcon } from "@/components/site/social-icons";
import Image from "next/image";
import { HERO_IMAGE } from "@/lib/images";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const titleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const titleLine = {
  hidden: { y: "115%", filter: "blur(10px)" },
  show: {
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function AnimatedStat({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = decimals
          ? v.toFixed(decimals)
          : Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#0d0b09] text-white"
    >
      {/* full-width background image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 -top-8">
          <motion.div
            initial={{ scale: 1.14 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.6, ease: EASE }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_IMAGE}
                alt="Ishaaiya signature plate"
                fill
                priority
                placeholder="blur"
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09] via-[#0d0b09]/80 to-[#0d0b09]/30" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(13,11,9,0.6)_100%)]" />

        {/* cinematic light beam sweep */}
        <motion.div
          aria-hidden
          initial={{ x: "-130%", opacity: 0 }}
          animate={{ x: "130%", opacity: [0, 0.9, 0] }}
          transition={{
            x: { duration: 2, ease: [0.7, 0, 0.3, 1] as const, delay: 0.9 },
            opacity: { duration: 2, times: [0, 0.5, 1], delay: 0.9 },
          }}
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0b09] to-transparent" />
      </div>

      {/* ambient glow — desktop */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, -26, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 top-1/4 h-[440px] w-[440px] rounded-full bg-orange-500/15 blur-[140px]"
        />
        <motion.div
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-red-700/15 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div
            variants={item}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Home Delivery Available
            </span>
          </motion.div>

          <motion.h1
            variants={titleWrap}
            initial="hidden"
            animate="show"
            className="mt-7 text-[clamp(2.4rem,9vw,4.75rem)] font-black leading-[1.05] tracking-tight"
          >
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span variants={titleLine} className="block will-change-transform">
                Delicious Taste.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span variants={titleLine} className="block will-change-transform">
                <span
                  className="relative inline-block bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["200% 0%", "0% 0%", "200% 0%"],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent [background-size:200%_100%]"
                    aria-hidden
                  >
                    Best Quality.
                  </motion.span>
                  Best Quality.
                </span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
          >
            BBQ, Desi, Fast Food, Chinese aur Tandoor — sab ek hi jagah. Hot,
            fresh aur affordable, sirf ek WhatsApp message door.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                asChild
                size="lg"
                className="h-13 gap-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 text-[15px] font-bold text-white shadow-2xl shadow-orange-500/40 transition-shadow hover:shadow-orange-500/70"
              >
                <a href="#menu">
                  Explore Menu
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                asChild
                size="lg"
                className="h-13 gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp Us
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/60"
          >
            <span className="flex items-center gap-2">
              <span className="flex -space-x-2">
                {["from-orange-400 to-red-500", "from-amber-300 to-orange-500", "from-rose-400 to-red-600"].map(
                  (g, i) => (
                    <span
                      key={i}
                      className={`flex size-7 items-center justify-center rounded-full bg-gradient-to-br ${g} text-[10px] font-bold ring-2 ring-[#0d0b09]`}
                    >
                      {["A", "S", "B"][i]}
                    </span>
                  )
                )}
              </span>
              <span>
                <span className="font-semibold text-white">10,000+</span> happy
                orders
              </span>
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span className="text-white/80">
                <span className="font-semibold text-white">4.9/5</span> food rating
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-4"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5"
        >
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="size-1 rounded-full bg-orange-400"
          />
        </motion.div>
      </motion.div>

      {/* stats strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-1 text-center transition-colors md:items-start"
            >
              <span className="text-3xl font-black text-white sm:text-4xl">
                <AnimatedStat
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                />
                {stat.suffix}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}