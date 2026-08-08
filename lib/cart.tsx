"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  note?: string;
};

type CartState = {
  items: (CartItem & { qty: number })[];
  count: number;
  total: number;
  open: boolean;
  add: (item: CartItem, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setNote: (id: string, note: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  lastAdded: CartItem | null;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "ishaaiya-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<(CartItem & { qty: number })[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as (CartItem & { qty: number })[]) : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const add = useCallback((item: CartItem, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: Math.min(99, i.qty + qty) } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setLastAdded(item);
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i))
    );
  }, []);

  const setNote = useCallback((id: string, note: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, note } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartState>(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);
    return {
      items,
      count,
      total,
      open,
      add,
      remove,
      setQty,
      setNote,
      clear,
      setOpen,
      lastAdded,
    };
  }, [items, open, add, remove, setQty, setNote, clear, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}