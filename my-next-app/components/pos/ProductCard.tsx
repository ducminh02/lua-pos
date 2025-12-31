"use client";
import { Product } from "@/types/pos";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <button
      onClick={() => onAdd(product)}
      className={cn(
        "group relative bg-card rounded-xl border border-border p-3 text-left transition-all",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "animate-scale-in"
      )}
    >
      {/* Image */}
      <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-foreground text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-primary font-semibold text-base">
          {formatCurrency(product.price)}
        </p>
        <p className="text-muted-foreground text-xs">
          {product.unit}
        </p>
      </div>

      {/* Stock indicator */}
      {product.stock < 10 && (
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
          Còn {product.stock}
        </div>
      )}
    </button>
  );
};
