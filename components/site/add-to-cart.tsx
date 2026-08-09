"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type CartItem } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  item,
  className,
  full = true,
  size = "sm",
  quantity = 1,
}: {
  item: CartItem;
  className?: string;
  full?: boolean;
  size?: "sm" | "lg" | "default";
  quantity?: number;
}) {
  const { add, setOpen: setCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    add(item, quantity);
    setCartOpen(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      size={size}
      className={cn(
        "gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 active:scale-95",
        full && "w-full",
        added && "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
        className
      )}
    >
      {added ? (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Check className="size-4" />
          Added!
        </motion.span>
      ) : (
        <span className="flex items-center gap-2">
          <ShoppingBag className="size-4" />
          Add to Cart
        </span>
      )}
    </Button>
  );
}