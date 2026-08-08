"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Send,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/site/section-heading";
import { CONTACT } from "@/lib/data";
import { EASE } from "@/components/motion/reveal";
import {
  WhatsAppIcon,
  TikTokIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";

const CHANNELS = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappLink,
    desc: "Order karein ek message mein",
    color: "bg-emerald-500/15 text-emerald-500",
  },
  {
    icon: Phone,
    label: "Call to Order",
    value: CONTACT.phone,
    href: CONTACT.phoneLink,
    desc: "Direct call — quick order",
    color: "bg-orange-500/15 text-orange-500",
  },
  {
    icon: MapPin,
    label: "Find Us",
    value: "Google Maps",
    href: CONTACT.mapsLink,
    desc: "Get directions in one tap",
    color: "bg-blue-500/15 text-blue-500",
  },
  {
    icon: Clock,
    label: "Timings",
    value: "12 PM — 2 AM",
    href: undefined,
    desc: "Open daily, 7 days a week",
    color: "bg-amber-500/15 text-amber-500",
  },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Ishaaiya!\n\nName: ${name}\nPhone: ${phone}\n\n${message || "I want to place an order."}`
    );
    window.open(`${CONTACT.whatsappLink}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-[#100e0b] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Order & Contact"
          description="Reach us anytime — WhatsApp, call ya social media. Home delivery available daily, fast aur reliable."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((channel, i) => {
              const Comp = channel.icon;
              const inner = (
                <>
                  <span
                    className={`flex size-11 items-center justify-center rounded-xl ${channel.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Comp className="size-5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      {channel.label}
                    </div>
                    <div className="font-bold text-white">
                      {channel.value}
                    </div>
                    <div className="text-sm text-white/50">{channel.desc}</div>
                  </div>
                </>
              );
              const cls =
                "group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";
              return (
                <motion.div
                  key={channel.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                >
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-5 text-white sm:col-span-2"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Location
                  </div>
                  <div className="font-bold">
                    Find us — tap for Google Maps
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="sm"
                  className="gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  <a
                    href={CONTACT.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="size-4" />
                    Get Directions
                  </a>
                </Button>
                <div className="flex items-center gap-2">
                  {[
                    { icon: InstagramIcon, href: CONTACT.instagram, label: "Instagram" },
                    { icon: FacebookIcon, href: CONTACT.facebook, label: "Facebook" },
                    { icon: TikTokIcon, href: CONTACT.tiktok, label: "TikTok" },
                    { icon: YoutubeIcon, href: CONTACT.youtube, label: "YouTube" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-orange-500 hover:text-white"
                    >
                      <s.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <WhatsAppIcon className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Quick Order Form
                </h3>
                <p className="text-sm text-white/50">
                  Form bharain — order WhatsApp par aayega
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-white">
                  Your Name *
                </span>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ahmed"
                  className="rounded-xl border-white/10"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-white">
                  Phone Number *
                </span>
                <Input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="rounded-xl border-white/10"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-white">
                Your Order
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. 1x Jumbo BBQ Platter, 2x Zinger Burger — delivery address..."
                rows={4}
                className="border-white/10 placeholder:text-white/40 flex w-full min-w-0 resize-none rounded-xl border bg-transparent px-3 py-2.5 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-orange-400 focus-visible:ring-orange-400/30 focus-visible:ring-[3px] md:text-sm"
              />
            </label>

            <Button
              type="submit"
              size="lg"
              className="gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
            >
              <Send className="size-4" />
              Send Order on WhatsApp
            </Button>
            <p className="text-center text-xs text-white/50">
              Delivery charges: Rs. 100 (free on orders above Rs. 2,000)
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}


