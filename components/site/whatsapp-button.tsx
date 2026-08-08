"use client";

import { motion } from "framer-motion";
import { CONTACT } from "@/lib/data";
import { WhatsAppIcon } from "@/components/site/social-icons";

export function WhatsAppButton() {
  return (
    <motion.a
      href={CONTACT.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40"
    >
      <WhatsAppIcon className="size-7" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </motion.a>
  );
}