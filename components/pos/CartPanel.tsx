"use client";
import { CartItem } from "@/types/pos";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartPanelProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export const CartPanel = ({
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartPanelProps) => {
  return (
    <div className="flex flex-col h-full bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Giỏ Hàng
          {items.length > 0 && (
            <span className="ml-auto px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-sm">
              {items.length}
            </span>
          )}
        </h2>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-sm">Giỏ hàng trống</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.product.id}
              className={cn(
                "bg-secondary/50 rounded-lg p-3 animate-slide-in",
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                {/* Product Image */}
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm line-clamp-1">
                    {item.product.name}
                  </h4>
                  <p className="text-primary text-sm font-semibold">
                    {formatCurrency(item.product.price)}
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(item.product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onUpdateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(
                        item.product.id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-16 h-8 text-center"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onUpdateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="font-semibold text-foreground">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer - Total & Checkout */}
      <div className="p-4 border-t border-border space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg text-muted-foreground">Tổng cộng</span>
          <span className="text-2xl font-bold text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
        <Button
          onClick={onCheckout}
          disabled={items.length === 0}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-success hover:bg-success/90 text-success-foreground shadow-lg shadow-success/25"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};
