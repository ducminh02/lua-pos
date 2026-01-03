"use client";
import { useState } from "react";
import { Product } from "@/types/pos";
import { ProductCard } from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn, removeAccents } from "@/lib/utils";
import { categories } from "@/data/mockData";

import { WeightInputModal } from "./WeightInputModal";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      removeAccents(product.name.toLowerCase()).includes(
        removeAccents(searchQuery.toLowerCase())
      ) ||
      product.barcode.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: Product) => {
    if (product.unit.toLowerCase() === "kg") {
      setSelectedProduct(product);
      setWeightModalOpen(true);
    } else {
      onAddToCart(product);
    }
  };

  const handleWeightConfirm = (weight: number) => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, weight);
      setWeightModalOpen(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Category Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto border-b border-border">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "whitespace-nowrap",
              selectedCategory === category && "shadow-lg shadow-primary/25"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleProductClick}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Search className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Không tìm thấy sản phẩm</p>
            <p className="text-sm">Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>

      {/* Search Bar - Bottom */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm kiếm hoặc quét mã vạch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base bg-secondary border-none"
          />
        </div>
      </div>
      <WeightInputModal
        product={selectedProduct}
        isOpen={weightModalOpen}
        onClose={() => setWeightModalOpen(false)}
        onConfirm={handleWeightConfirm}
      />
    </div>
  );
};
