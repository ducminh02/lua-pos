"use client";

import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ProductGrid } from "@/components/pos/ProductGrid";
import { CartPanel } from "@/components/pos/CartPanel";
import { Receipt } from "@/components/pos/Receipt";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useCart } from "@/hooks/useCart";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";
import { mockProducts } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { usePrint } from "@/hooks/usePrint";

function POSContent() {
    const { items, addToCart, removeFromCart, updateQuantity, clearCart, total } = useCart();
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
    const { printElement } = usePrint();

    // Barcode scanner hook
    useBarcodeScanner({
        products: mockProducts,
        onProductFound: addToCart,
    });

    const handleCheckout = () => {
        if (items.length === 0) return;

        // Generate order ID
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
        setCurrentOrderId(orderId);

        // Show success message
        toast({
            title: "Đơn hàng thành công!",
            description: `Mã đơn: ${orderId}`,
        });

        // Trigger print
        setTimeout(() => {
            printElement("receipt-to-print");
            // clearCart(); // moved after the timeout to be safer, though printElement copies content immediately
            // But we want to clear purely for UI reasons.
            // Actually, keep it here.
            clearCart();
            setCurrentOrderId(null);
        }, 100);
    };

    return (
        <AppLayout>
            <div className="flex h-[calc(100vh-4rem)]">
                {/* Left Side - Products (65%) */}
                <div className="flex-1 min-w-0">
                    <ProductGrid products={mockProducts} onAddToCart={addToCart} />
                </div>

                {/* Right Side - Cart (35%) */}
                <div className="w-[35%] min-w-[320px] max-w-[450px]">
                    <CartPanel
                        items={items}
                        total={total}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>

            {/* Hidden Receipt for Printing */}
            {currentOrderId && (
                <Receipt items={items} total={total} orderId={currentOrderId} />
            )}
        </AppLayout>
    );
}

export default function POSPage() {
    return (
        <ProtectedRoute>
            <POSContent />
        </ProtectedRoute>
    );
}
