"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import {
  CATEGORIES,
  MENU_ITEMS,
  CONTACT,
  PROMO_BANNERS,
  menuItemSlug,
} from "@/lib/data";
import { SPRING } from "@/components/motion/reveal";
import { AddToCartButton } from "@/components/site/add-to-cart";
import { PromoBanner } from "@/components/site/promo-banner";
import { CATEGORY_ICONS } from "@/lib/category-icons";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const scale = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
    scale.set(1.02);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        scale.set(1);
      }}
      style={{ rotateX, rotateY, scale, transformPerspective: 1000 }}
      className="group relative h-full [transform-style:preserve-3d]"
    >
      {children}
    </motion.div>
  );
}

function CategoryBlock({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  const items = MENU_ITEMS.filter((item) => item.category === cat.id);
  const Icon = CATEGORY_ICONS[cat.id];

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25">
          <Icon className="size-5" />
        </span>
        <div>
          <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
            {cat.label}
          </h3>
          <p className="text-xs font-medium text-white/40">
            {items.length} items — fresh, hot &amp; ready
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{
                ...SPRING,
                delay: Math.min(i % 3, 2) * 0.08,
              }}
              className="h-full"
            >
              <TiltCard>
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-sm transition-colors duration-300 hover:border-orange-500/40 [transform:translateZ(20px)]">
                  <Link
                    href={`/item/${menuItemSlug(item)}`}
                    aria-label={`View ${item.name}`}
                    className="absolute inset-0 z-10"
                  />
                  <div className="pointer-events-none relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm font-black text-white backdrop-blur-md">
                      Rs. {item.price}
                    </span>
                    <span className="absolute left-3 top-3 rounded-full bg-orange-500/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white opacity-0 shadow-lg shadow-orange-500/40 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5">
                      {cat.label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-white/50">
                      {item.description}
                    </p>
                    <div className="relative z-20">
                      <AddToCartButton
                        item={{
                          id: `menu-${item.id}`,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        }}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:linear-gradient(120deg,transparent_30%,rgba(255,150,40,0.08)_50%,transparent_70%)]" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MenuSection() {
  const banners = PROMO_BANNERS;

  return (
    <section id="menu" className="scroll-mt-20 bg-[#100e0b] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse Menu"
          title="What are you craving?"
          description="100+ menu items — Fast Food, BBQ & Platters, Desi, Chinese, aur Tandoor & Tea. Sab fresh, sab best quality."
          dark
        />

        {/* sections separated with banners between */}
        {CATEGORIES.map((cat, i) => (
          <div key={cat.id}>
            <CategoryBlock cat={cat} />
            {i < CATEGORIES.length - 1 && i < banners.length && (
              <div className="mt-16">
                <PromoBanner banner={banners[i]} />
              </div>
            )}
          </div>
        ))}

        <div className="mt-14 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2.5 rounded-full border-white/20 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white"
          >
            <a
              href={`${CONTACT.whatsappLink}?text=${encodeURIComponent(
                "Hi! Please share the full menu of Ishaaiya Restaurant 📋"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <UtensilsCrossed className="size-4" />
              Get Full Menu on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}