"use client";

import { useState, useCallback } from "react";
import { CartItem, Product } from "@/types/pos";
import { toast } from "@/hooks/use-toast";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: product.name,
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
};
