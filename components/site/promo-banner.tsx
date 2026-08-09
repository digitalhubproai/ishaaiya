"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONTACT, type PromoBanner } from "@/lib/data";
import { WhatsAppIcon } from "@/components/site/social-icons";
import { imageFor } from "@/lib/images";

export function PromoBanner({ banner }: { banner: PromoBanner }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="group relative flex w-full flex-col justify-center overflow-hidden rounded-3xl border border-orange-500/20 shadow-2xl shadow-black/50"
    >
      <Image
        src={imageFor(banner.image)}
        alt={banner.title}
        fill
        placeholder="blur"
        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09] via-[#0d0b09]/80 to-[#0d0b09]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_10%_50%,rgba(255,120,20,0.25),transparent_60%)]" />

      {/* animated sheen sweep */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: "250%" }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.2 }}
        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* content */}
      <div className="relative flex w-full flex-col gap-2.5 px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-14">
        <motion.span
          initial={{ scale: 0, rotate: -8 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
          className="w-fit rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/40 sm:text-xs"
        >
          {banner.badge}
        </motion.span>
        <h3 className="max-w-lg text-2xl font-black leading-tight text-white drop-shadow sm:text-3xl md:text-4xl">
          {banner.title}
        </h3>
        <p className="line-clamp-2 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base md:line-clamp-1 xl:line-clamp-2">
          {banner.description}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <a
            href={`${CONTACT.whatsappLink}?text=${encodeURIComponent(
              `Hi! I want to order the "${banner.title}" offer from Ishaaiya.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/40 transition-all hover:scale-[1.03] hover:shadow-orange-500/60 sm:px-6 sm:py-3"
          >
            <WhatsAppIcon className="size-4" />
            {banner.cta}
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
          </a>
          <span className="hidden items-center gap-1.5 text-xs font-medium text-white/50 sm:inline-flex">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-green-400" />
            Limited time — order on WhatsApp
          </span>
        </div>
      </div>

      {/* watermark */}
      <div
        className="pointer-events-none absolute -right-8 -top-10 hidden select-none text-[110px] font-black leading-none text-white/[0.06] sm:block sm:-right-6 sm:-top-14 sm:text-[180px]"
        aria-hidden
      >
        {banner.title.split(" ")[0]}
      </div>
      {/* fade bottom for smoothness on short screens */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent" />
    </motion.div>
  );
}