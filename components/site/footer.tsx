"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/site/social-icons";
import { NAV_ITEMS, CATEGORIES, CONTACT } from "@/lib/data";

const SOCIALS = [
  { icon: WhatsAppIcon, href: CONTACT.whatsappLink, label: "WhatsApp" },
  { icon: InstagramIcon, href: CONTACT.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: CONTACT.facebook, label: "Facebook" },
  { icon: TikTokIcon, href: CONTACT.tiktok, label: "TikTok" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#090807] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Image
                src="/ishaaiyalogo-cropped.png"
                alt="Ishaaiya Restaurant & Catering"
                width={56}
                height={56}
                className="size-14 object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/55">
              Delicious taste, best quality, best value. BBQ, Desi, Fast Food,
              Chinese — sab kuch ek hi jagah. Home delivery available daily.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/30"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/70">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-orange-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/70">
              Categories
            </h3>
            <ul className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href="#menu"
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-orange-400"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/70">
              Order Now
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/55">
              <li>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-orange-400"
                >
                  <WhatsAppIcon className="size-4 text-emerald-400" />
                  WhatsApp: {CONTACT.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneLink}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-orange-400"
                >
                  <Phone className="size-4 text-orange-400" />
                  Call: {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-orange-400"
                >
                  <MapPin className="size-4 text-blue-400" />
                  Find us on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Ishaaiya Restaurant. All rights
            reserved.
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
            Delicious Taste · Best Quality · Best Value
          </p>
        </div>
      </div>
    </footer>
  );
}