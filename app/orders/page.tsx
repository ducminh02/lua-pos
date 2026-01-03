"use client";

import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { mockOrders, mockOrderItems, mockProducts } from "@/data/mockData";
import { Order, OrderItem } from "@/types/pos";
import { formatCurrency, formatDate } from "@/lib/formatters";
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
} from "@/components/ui/dialog";
import { Calendar, Search, Eye } from "lucide-react";

function OrdersContent() {
    const [orders] = useState<Order[]>(mockOrders);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openOrderDetail = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    const getOrderItems = (orderId: string): OrderItem[] => {
        return mockOrderItems[orderId] || [];
    };

    const getProductName = (productId: string): string => {
        const product = mockProducts.find((p) => p.id === productId);
        return product?.name || "Sản phẩm không xác định";
    };

    const getProductBarcode = (productId: string): string => {
        const product = mockProducts.find((p) => p.id === productId);
        return product?.barcode || "-";
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Đơn Hàng</h1>
                        <p className="text-muted-foreground">
                            Xem lịch sử các đơn hàng đã thanh toán
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Tìm theo mã đơn hàng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Lọc theo ngày
                    </Button>
                </div>

                {/* Table */}
                <div className="border border-border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mã đơn hàng</TableHead>
                                <TableHead>Ngày tạo</TableHead>
                                <TableHead className="text-right">Tổng tiền</TableHead>
                                <TableHead className="w-20"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono font-medium">
                                        {order.id}
                                    </TableCell>
                                    <TableCell>{formatDate(order.created_at)}</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">
                                        {formatCurrency(order.total_amount)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openOrderDetail(order)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Không tìm thấy đơn hàng nào</p>
                    </div>
                )}

                {/* Order Detail Dialog */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                Chi tiết đơn hàng
                                <span className="font-mono text-primary">
                                    {selectedOrder?.id}
                                </span>
                            </DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Ngày tạo:</span>
                                    <span>{formatDate(selectedOrder.created_at)}</span>
                                </div>

                                <div className="border border-border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Sản phẩm</TableHead>
                                                <TableHead>SKU</TableHead>
                                                <TableHead className="text-right">Đơn giá</TableHead>
                                                <TableHead className="text-right">SL</TableHead>
                                                <TableHead className="text-right">Thành tiền</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {getOrderItems(selectedOrder.id).map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">
                                                        {getProductName(item.product_id)}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {getProductBarcode(item.product_id)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {formatCurrency(item.price_at_sale)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {item.quantity}
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold">
                                                        {formatCurrency(item.price_at_sale * item.quantity)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-border">
                                    <span className="text-lg font-medium">Tổng cộng</span>
                                    <span className="text-2xl font-bold text-primary">
                                        {formatCurrency(selectedOrder.total_amount)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

export default function OrdersPage() {
    return (
        <ProtectedRoute>
            <OrdersContent />
        </ProtectedRoute>
    );
}
