"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ShoppingBag,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NAV_ITEMS,
  CONTACT,
  CATEGORIES,
  MENU_ITEMS,
} from "@/lib/data";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/site/social-icons";
import { useCart } from "@/lib/cart";

function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<(typeof CATEGORIES)[number]["id"]>("fast-food");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const searchResults = searching
    ? MENU_ITEMS.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 8)
    : [];

  const activeItems = MENU_ITEMS.filter((item) => item.category === active).slice(0, 5);

  const reset = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
      >
        Menu
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="absolute left-1/2 top-full z-10 mt-3 w-[800px] -translate-x-1/2"
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#12100d]/95 shadow-2xl shadow-black/60 backdrop-blur-2xl">
                {/* search bar */}
                <div className="border-b border-white/10 p-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 transition-colors focus-within:border-orange-500/40">
                    <Search className="size-4 text-white/40" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search dishes — burger, karahi, broast..."
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="text-white/40 hover:text-white"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[230px_1fr]">
                  {/* categories column */}
                  <div
                    className={cn(
                      "border-r border-white/10 bg-white/[0.02] p-4 transition-opacity",
                      searching && "pointer-events-none opacity-40"
                    )}
                  >
                    <div className="mb-3 flex items-center justify-between px-3">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
                        Categories
                      </span>
                      <span className="flex size-6 items-center justify-center rounded-full bg-orange-500/15 text-[10px] font-black text-orange-400">
                        {MENU_ITEMS.length}
                      </span>
                    </div>
                    {CATEGORIES.map((cat) => {
                      const Icon = CATEGORY_ICONS[cat.id];
                      const count = MENU_ITEMS.filter(
                        (i) => i.category === cat.id
                      ).length;
                      return (
                        <div
                          key={cat.id}
                          role="button"
                          tabIndex={0}
                          onMouseEnter={() => setActive(cat.id)}
                          onClick={() => setActive(cat.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActive(cat.id);
                            }
                          }}
                          className={cn(
                            "group flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-200",
                            active === cat.id
                              ? "bg-gradient-to-r from-orange-500/20 to-red-500/10 ring-1 ring-orange-500/30 shadow-lg shadow-orange-500/10"
                              : "hover:bg-white/5"
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={cn(
                                "flex size-8 items-center justify-center rounded-xl transition-colors",
                                active === cat.id
                                  ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                                  : "bg-white/5 text-white/60 group-hover:text-white"
                              )}
                            >
                              <Icon className="size-4" />
                            </span>
                            <span
                              className={cn(
                                "text-sm font-semibold",
                                active === cat.id ? "text-white" : "text-white/60"
                              )}
                            >
                              {cat.label}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold",
                              active === cat.id
                                ? "bg-orange-500/20 text-orange-300"
                                : "bg-white/5 text-white/30"
                            )}
                          >
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* items / search results column */}
                  <div className="min-h-[300px] p-5">
                    <AnimatePresence mode="wait">
                      {searching ? (
                        <motion.div
                          key="search"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="mb-3 flex items-center justify-between px-1">
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-400">
                              {searchResults.length} result{searchResults.length !== 1 && "s"} found
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2.5">
                            {searchResults.map((item) => (
                              <a
                                key={item.id}
                                href="#menu"
                                onClick={() => setOpen(false)}
                                className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-2.5 transition-all duration-200 hover:border-orange-500/30 hover:bg-white/[0.06]"
                              >
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={56}
                                  height={56}
                                  className="size-14 shrink-0 rounded-xl object-cover"
                                />
                                <div className="min-w-0">
                                  <div className="truncate text-[13px] font-bold text-white">
                                    {item.name}
                                  </div>
                                  <div className="mt-0.5 text-xs font-semibold text-orange-400">
                                    Rs. {item.price}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                          {searchResults.length === 0 && (
                            <div className="flex flex-col items-center gap-2 py-14 text-center">
                              <Search className="size-8 text-white/15" />
                              <p className="text-sm text-white/50">
                                Kuch nahi mila &quot;{query}&quot; ke liye. Dusra
                                naam try karein.
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key={active}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.22 }}
                        >
                          <div className="mb-3 flex items-center justify-between px-1">
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-400">
                              {CATEGORIES.find((c) => c.id === active)?.label}
                            </span>
                            <span className="text-[11px] font-medium text-white/30">
                              Pick a dish
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2.5">
                            {activeItems.map((item) => (
                              <a
                                key={item.id}
                                href="#menu"
                                onClick={() => setOpen(false)}
                                className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-2.5 transition-all duration-200 hover:border-orange-500/30 hover:bg-white/[0.06]"
                              >
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={56}
                                  height={56}
                                  className="size-14 shrink-0 rounded-xl object-cover"
                                />
                                <div className="min-w-0">
                                  <div className="truncate text-[13px] font-bold text-white">
                                    {item.name}
                                  </div>
                                  <div className="mt-0.5 text-xs font-semibold text-orange-400">
                                    Rs. {item.price}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* footer CTA */}
                <div className="flex items-center justify-between border-t border-white/10 bg-gradient-to-r from-orange-500/10 to-red-500/5 px-5 py-3.5">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                  <Store className="size-4 text-orange-400" />
                    <span>
                      <span className="font-bold text-white">
                        {MENU_ITEMS.length}
                      </span>{" "}
                      dishes — hot, fresh aur ready
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="gap-1.5 rounded-full text-white hover:bg-white/10"
                    >
                      <a href="#menu" onClick={reset}>
                        Full Menu
                        <ArrowRight className="size-3.5" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                    >
                      <a
                        href={`${CONTACT.whatsappLink}?text=${encodeURIComponent(
                          "Hi! Please share the full menu of Ishaaiya"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="size-3.5" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="group flex items-center gap-3">
          <div className="relative">
            <Image
              src="/ishaaiyalogo-cropped.png"
              alt="Ishaaiya Restaurant & Catering"
              width={56}
              height={56}
              className="size-14 object-contain drop-shadow-[0_2px_12px_rgba(255,120,20,0.35)] transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) =>
            item.label === "Menu" ? (
              <MegaMenu key={item.href} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full text-white transition-colors hover:bg-white/10"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-1 text-[11px] font-black text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-2 rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
          >
            <a href={CONTACT.phoneLink}>
              <span className="font-mono text-sm">{CONTACT.phone}</span>
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:from-orange-400 hover:to-red-400"
          >
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-4" />
              Order Now
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full text-white transition-colors hover:bg-white/10"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-1 text-[11px] font-black text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute inset-y-0 right-0 flex w-4/5 max-w-sm flex-col border-l border-white/10 bg-[#0d0b09] p-6"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <Image
                    src="/ishaaiyalogo-cropped.png"
                    alt="Ishaaiya logo"
                    width={48}
                    height={48}
                    className="size-12 object-contain"
                  />
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-lg font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  <a
                    href={CONTACT.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-4" />
                    Order on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 text-white">
                  <a href={CONTACT.phoneLink}>{CONTACT.phone}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}