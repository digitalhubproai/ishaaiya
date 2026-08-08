"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Banknote,
  ClipboardList,
  Landmark,
  MessageSquareText,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/site/social-icons";

const DELIVERY_FEE = 100;
const FREE_DELIVERY_ABOVE = 2000;

const PAYMENT_METHODS = [
  {
    id: "cash",
    label: "Cash on Delivery",
    desc: "Paise receive karein delivery par",
    icon: Banknote,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    desc: "JazzCash / Easypaisa / Bank",
    icon: Landmark,
  },
] as const;

type PaymentId = (typeof PAYMENT_METHODS)[number]["id"];

export function CartDrawer() {
  const { items, total, open, setOpen, setQty, setNote, remove, clear } = useCart();
  const [view, setView] = useState<"cart" | "checkout">("cart");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: "",
    payment: "cash" as PaymentId,
  });

  const delivery = items.length === 0 || total >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  const grandTotal = total + delivery;

  const lines = items
    .map((i) => {
      const note = i.note ? `\n    Note: ${i.note}` : "";
      return `• ${i.name} x${i.qty} — Rs. ${i.price * i.qty}${note}`;
    })
    .join("\n");

  const startEdit = (id: string, note: string) => {
    setEditingId(id);
    setDraft(note);
  };

  const saveNote = (id: string) => {
    setNote(id, draft.trim());
    setEditingId(null);
    setDraft("");
  };

  const openCheckout = () => {
    setView("checkout");
  };

  const openCart = () => {
    setView("cart");
    setEditingId(null);
  };

  const closeAll = () => {
    setOpen(false);
    setView("cart");
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentNote =
      form.payment === "cash"
        ? "Cash on Delivery"
        : "Bank Transfer / Easypaisa / JazzCash (details WhatsApp par share kar denge)";
const text = encodeURIComponent(
      `Hi Ishaaiya!\n\nNEW ORDER:\n\n${lines}\n\n———————————\nItems: ${total}\nDelivery: ${delivery === 0 ? "FREE" : `Rs. ${delivery}`}\nTOTAL: Rs. ${grandTotal}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPayment: ${paymentNote}${
        form.instructions
          ? `\nInstructions: ${form.instructions}`
          : ""
      }\n\nPlease confirm my order. Thank you!`
    );
    window.open(`${CONTACT.whatsappLink}?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-[#12100d] text-white"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={openCart}
                  aria-label="Back to cart"
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full transition-colors",
                    view === "checkout"
                      ? "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      : "pointer-events-none opacity-0"
                  )}
                >
                  <ArrowLeft className="size-4" />
                </button>
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    view === "checkout"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-orange-500/15 text-orange-400"
                  )}
                >
                  {view === "checkout" ? (
                    <ClipboardList className="size-5" />
                  ) : (
                    <ShoppingBag className="size-5" />
                  )}
                </span>
                <div>
                  <h2 className="text-lg font-bold">
                    {view === "checkout" ? "Checkout" : "Your Order"}
                  </h2>
                  <p className="text-xs text-white/50">
                    {view === "checkout"
                      ? "Details bharain aur order bhejein"
                      : items.length === 0
                        ? "Cart is empty"
                        : `${items.length} item${items.length > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
              <button
                onClick={closeAll}
                aria-label="Close"
                className="flex size-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {view === "checkout" && items.length > 0 ? (
              <form
                onSubmit={submitOrder}
                className="flex flex-1 flex-col overflow-hidden"
              >
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {/* order summary */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">
                        Order Summary
                      </h3>
                      <button
                        onClick={openCart}
                        className="text-xs font-semibold text-orange-400 transition-colors hover:text-orange-300"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <span className="flex min-w-0 items-center gap-2 text-white/80">
                            <span className="shrink-0 font-bold text-orange-400">
                              {item.qty}x
                            </span>
                            <span className="truncate">{item.name}</span>
                          </span>
                          <span className="shrink-0 tabular-nums text-white/70">
                            Rs. {item.price * item.qty}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 space-y-1 border-t border-white/10 pt-3 text-sm">
                      <div className="flex justify-between text-white/60">
                        <span>Items</span>
                        <span className="tabular-nums">Rs. {total}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Delivery</span>
                        <span className="tabular-nums">
                          {delivery === 0 ? "FREE" : `Rs. ${delivery}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-black">
                        <span>Total</span>
                        <span className="tabular-nums text-orange-400">
                          Rs. {grandTotal}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* name + phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-white/70">
                        Name *
                      </span>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Full name"
                        className="rounded-xl border-white/10"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-white/70">
                        Phone *
                      </span>
                      <Input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        placeholder="03XX-XXXXXXX"
                        className="rounded-xl border-white/10"
                      />
                    </label>
                  </div>

                  {/* address */}
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-white/70">
                      Delivery Address *
                    </span>
                    <textarea
                      required
                      value={form.address}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, address: e.target.value }))
                      }
                      rows={2}
                      placeholder="House, street, area, landmark"
                      className="w-full resize-none rounded-xl border border-white/10 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                    />
                  </label>

                  {/* payment method */}
                  <div>
                    <span className="mb-2 block text-xs font-semibold text-white/70">
                      Payment Method *
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = method.icon;
                        const selected = form.payment === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() =>
                              setForm((f) => ({ ...f, payment: method.id }))
                            }
                            className={cn(
                              "flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-all",
                              selected
                                ? "border-orange-500/60 bg-orange-500/10 ring-1 ring-orange-500/30"
                                : "border-white/10 bg-white/[0.03] hover:border-white/25"
                            )}
                          >
                            <Icon
                              className={cn(
                                "size-5",
                                selected ? "text-orange-400" : "text-white/40"
                              )}
                            />
                            <span className="text-xs font-bold text-white">
                              {method.label}
                            </span>
                            <span className="text-[11px] leading-snug text-white/45">
                              {method.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* instructions */}
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-white/70">
                      Additional Instructions
                    </span>
                    <textarea
                      value={form.instructions}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, instructions: e.target.value }))
                      }
                      rows={2}
                      placeholder="e.g. gate security ko bulana, ring twice..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                    />
                  </label>
                </div>

                <div className="border-t border-white/10 p-5">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                  >
                    <WhatsAppIcon className="size-5" />
                    Send Order on WhatsApp
                  </Button>
                  <p className="mt-3 text-center text-xs text-white/40">
                    WhatsApp par bheja jayega — payment &amp; order confirm hone
                    par
                  </p>
                </div>
              </form>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="flex size-20 items-center justify-center rounded-full bg-white/5">
                  <ShoppingBag className="size-9 text-white/30" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Your cart is empty!</h3>
                  <p className="mt-1 text-sm text-white/50">
                    Add some delicious food from the menu.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-2 rounded-full border-white/20 text-white"
                  onClick={() => setOpen(false)}
                >
                  Browse Menu
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <div className="size-16 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="truncate text-sm font-bold">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => remove(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-white/40 transition-colors hover:text-red-400"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-orange-400">
                          Rs. {item.price * item.qty}
                        </span>

                        {item.note && editingId !== item.id && (
                          <button
                            onClick={() => startEdit(item.id, item.note ?? "")}
                            className="mt-1 flex items-start gap-1.5 rounded-lg bg-amber-500/10 px-2 py-1 text-left text-[11px] leading-snug text-amber-300 transition-colors hover:bg-amber-500/20"
                          >
                            <MessageSquareText className="mt-0.5 size-3 shrink-0" />
                            <span className="line-clamp-2">{item.note}</span>
                          </button>
                        )}

                        {editingId === item.id ? (
                          <div className="mt-2">
                            <textarea
                              value={draft}
                              onChange={(e) => setDraft(e.target.value)}
                              rows={2}
                              autoFocus
                              placeholder="Special instructions..."
                              className="w-full resize-none rounded-xl border border-amber-500/30 bg-white/[0.04] px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none"
                            />
                            <button
                              onClick={() => saveNote(item.id)}
                              className="mt-1.5 text-xs font-bold text-orange-400 transition-opacity hover:text-orange-300"
                            >
                              Save note
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(item.id, item.note ?? "")}
                            className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full border border-dashed border-orange-500/50 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300 transition-colors hover:border-orange-400 hover:bg-orange-500/20 hover:text-orange-200"
                          >
                            <MessageSquareText className="size-3.5" />
                            {item.note ? "Edit note" : "Add note"}
                          </button>
                        )}

                        <div className="mt-auto flex items-center gap-2 pt-2">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex size-7 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-white/10 p-5">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-white/60">
                      <span>Items</span>
                      <span className="tabular-nums">Rs. {total}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>
                        Delivery
                        {delivery === 0 && (
                          <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                            FREE
                          </span>
                        )}
                      </span>
                      <span className="tabular-nums">
                        {delivery === 0 ? "Rs. 0" : `Rs. ${delivery}`}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 text-base font-black">
                      <span>Total Amount</span>
                      <span className="tabular-nums text-orange-400">
                        Rs. {grandTotal}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={openCheckout}
                    size="lg"
                    className="w-full gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                  >
                    <WhatsAppIcon className="size-5" />
                    Continue to Checkout
                  </Button>
                  <button
                    onClick={clear}
                    className="w-full text-center text-xs text-white/40 transition-colors hover:text-white/70"
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}