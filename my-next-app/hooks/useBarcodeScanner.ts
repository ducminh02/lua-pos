"use client";

import { useEffect, useCallback } from "react";
import { Product } from "@/types/pos";

interface UseBarcodeScanner {
  products: Product[];
  onProductFound: (product: Product) => void;
}

export const useBarcodeScanner = ({ products, onProductFound }: UseBarcodeScanner) => {
  const handleBarcodeScan = useCallback(
    (barcode: string) => {
      const product = products.find((p) => p.barcode === barcode);
      if (product) {
        onProductFound(product);
      }
    },
    [products, onProductFound]
  );

  useEffect(() => {
    let barcodeBuffer = "";
    let lastKeyTime = Date.now();

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentTime = Date.now();

      // Reset buffer if more than 100ms between keystrokes (manual typing)
      if (currentTime - lastKeyTime > 100) {
        barcodeBuffer = "";
      }

      lastKeyTime = currentTime;

      if (event.key === "Enter") {
        if (barcodeBuffer.length >= 8) {
          handleBarcodeScan(barcodeBuffer);
        }
        barcodeBuffer = "";
        return;
      }

      // Only add alphanumeric characters
      if (/^[a-zA-Z0-9]$/.test(event.key)) {
        barcodeBuffer += event.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleBarcodeScan]);
};
