"use client";

import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { mockProducts, categories } from "@/data/mockData";
import { Product } from "@/types/pos";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Search, Upload, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

function ProductsContent() {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        barcode: "",
        price: 0,
        unit: "",
        category: "",
        image_url: "",
        stock: 0,
    });

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.barcode.includes(searchQuery)
    );

    const openAddDialog = () => {
        setEditingProduct(null);
        setFormData({
            name: "",
            barcode: "",
            price: 0,
            unit: "",
            category: categories[1],
            image_url: "",
            stock: 0,
        });
        setIsDialogOpen(true);
    };

    const openEditDialog = (product: Product) => {
        setEditingProduct(product);
        setFormData(product);
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!formData.name || !formData.barcode || !formData.price) {
            toast({
                title: "Lỗi",
                description: "Vui lòng điền đầy đủ thông tin",
                variant: "destructive",
            });
            return;
        }

        if (editingProduct) {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === editingProduct.id ? { ...p, ...formData } as Product : p
                )
            );
            toast({ title: "Đã cập nhật sản phẩm" });
        } else {
            const newProduct: Product = {
                id: Date.now().toString(),
                ...formData,
            } as Product;
            setProducts((prev) => [...prev, newProduct]);
            toast({ title: "Đã thêm sản phẩm mới" });
        }

        setIsDialogOpen(false);
    };

    const handleDelete = (productId: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        toast({ title: "Đã xóa sản phẩm" });
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Sản Phẩm</h1>
                        <p className="text-muted-foreground">
                            Quản lý danh sách sản phẩm của cửa hàng
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <Upload className="w-4 h-4" />
                            Import
                        </Button>
                        <Button onClick={openAddDialog} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Thêm sản phẩm
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm theo tên hoặc mã vạch..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Table */}
                <div className="border border-border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Ảnh</TableHead>
                                <TableHead>Mã vạch</TableHead>
                                <TableHead>Tên sản phẩm</TableHead>
                                <TableHead>Danh mục</TableHead>
                                <TableHead className="text-right">Giá</TableHead>
                                <TableHead>Đơn vị</TableHead>
                                <TableHead className="text-right">Tồn kho</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {product.barcode}
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                                            {product.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold text-primary">
                                        {formatCurrency(product.price)}
                                    </TableCell>
                                    <TableCell>{product.unit}</TableCell>
                                    <TableCell className="text-right">{product.stock}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(product)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Tên sản phẩm</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Mã vạch (SKU)</Label>
                                    <Input
                                        value={formData.barcode}
                                        onChange={(e) =>
                                            setFormData({ ...formData, barcode: e.target.value })
                                        }
                                        placeholder="8935001700012"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Giá (VNĐ)</Label>
                                    <Input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                price: parseInt(e.target.value) || 0,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Đơn vị</Label>
                                    <Input
                                        value={formData.unit}
                                        onChange={(e) =>
                                            setFormData({ ...formData, unit: e.target.value })
                                        }
                                        placeholder="kg, gói, chai..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Danh mục</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, category: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn danh mục" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.slice(1).map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tồn kho</Label>
                                    <Input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                stock: parseInt(e.target.value) || 0,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>URL Hình ảnh</Label>
                                    <Input
                                        value={formData.image_url}
                                        onChange={(e) =>
                                            setFormData({ ...formData, image_url: e.target.value })
                                        }
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Hủy
                            </Button>
                            <Button onClick={handleSave}>
                                {editingProduct ? "Lưu" : "Thêm"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

export default function ProductsPage() {
    return (
        <ProtectedRoute>
            <ProductsContent />
        </ProtectedRoute>
    );
}
