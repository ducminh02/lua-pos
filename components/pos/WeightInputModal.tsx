"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/pos";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/formatters";

interface WeightInputModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (weight: number) => void;
}

export const WeightInputModal = ({
    product,
    isOpen,
    onClose,
    onConfirm,
}: WeightInputModalProps) => {
    const [weight, setWeight] = useState("");

    useEffect(() => {
        if (isOpen) {
            setWeight("");
        }
    }, [isOpen]);

    if (!product) return null;

    const numericWeight = parseFloat(weight) || 0;
    const totalPrice = numericWeight * product.price;

    const handleConfirm = () => {
        if (numericWeight > 0) {
            onConfirm(numericWeight);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Nhập trọng lượng</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-16 h-16 rounded-md object-cover"
                        />
                        <div>
                            <h3 className="font-medium text-lg">{product.name}</h3>
                            <p className="text-muted-foreground">{formatCurrency(product.price)} / {product.unit}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="text-lg"
                            autoFocus
                            min={0}
                            step={0.01}
                        />
                        <span className="text-muted-foreground font-medium w-8">
                            {product.unit}
                        </span>
                    </div>

                    <div className="flex justify-between items-center text-lg font-semibold pt-2 border-t">
                        <span>Thành tiền:</span>
                        <span className="text-primary">{formatCurrency(totalPrice)}</span>
                    </div>
                </div>

                <DialogFooter className="sm:justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleConfirm} disabled={numericWeight <= 0}>
                        Thêm vào giỏ
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
