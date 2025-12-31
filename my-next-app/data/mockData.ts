import { Product, Order, OrderItem } from "@/types/pos";

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: "1",
    barcode: "8935001700012",
    name: "Phở Gà Ăn Liền",
    price: 15000,
    unit: "gói",
    category: "Mì & Phở",
    image_url: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=200&h=200&fit=crop",
    stock: 50,
  },
  {
    id: "2",
    barcode: "8935001700029",
    name: "Nước Mắm Phú Quốc",
    price: 45000,
    unit: "chai",
    category: "Gia Vị",
    image_url: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop",
    stock: 30,
  },
  {
    id: "3",
    barcode: "8935001700036",
    name: "Gạo ST25",
    price: 120000,
    unit: "kg",
    category: "Gạo",
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
    stock: 100,
  },
  {
    id: "4",
    barcode: "8935001700043",
    name: "Bánh Tráng Trộn",
    price: 25000,
    unit: "gói",
    category: "Bánh",
    image_url: "https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop",
    stock: 45,
  },
  {
    id: "5",
    barcode: "8935001700050",
    name: "Trà Ô Long",
    price: 65000,
    unit: "hộp",
    category: "Đồ Uống",
    image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop",
    stock: 25,
  },
  {
    id: "6",
    barcode: "8935001700067",
    name: "Cà Phê Rang Xay",
    price: 85000,
    unit: "gói",
    category: "Đồ Uống",
    image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
    stock: 40,
  },
  {
    id: "7",
    barcode: "8935001700074",
    name: "Mì Quảng Khô",
    price: 18000,
    unit: "gói",
    category: "Mì & Phở",
    image_url: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&h=200&fit=crop",
    stock: 60,
  },
  {
    id: "8",
    barcode: "8935001700081",
    name: "Đường Phèn",
    price: 35000,
    unit: "kg",
    category: "Gia Vị",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    stock: 35,
  },
  {
    id: "9",
    barcode: "8935001700098",
    name: "Nước Cốt Dừa",
    price: 28000,
    unit: "lon",
    category: "Gia Vị",
    image_url: "https://images.unsplash.com/photo-1560713781-d00f6c18f388?w=200&h=200&fit=crop",
    stock: 55,
  },
  {
    id: "10",
    barcode: "8935001700105",
    name: "Bánh Pía",
    price: 75000,
    unit: "hộp",
    category: "Bánh",
    image_url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop",
    stock: 20,
  },
  {
    id: "11",
    barcode: "8935001700112",
    name: "Mắm Ruốc",
    price: 55000,
    unit: "hũ",
    category: "Gia Vị",
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&h=200&fit=crop",
    stock: 28,
  },
  {
    id: "12",
    barcode: "8935001700129",
    name: "Bún Khô",
    price: 22000,
    unit: "gói",
    category: "Mì & Phở",
    image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop",
    stock: 70,
  },
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    created_at: "2024-12-30T10:30:00Z",
    total_amount: 195000,
    user_id: "user-1",
  },
  {
    id: "ORD-002",
    created_at: "2024-12-30T11:15:00Z",
    total_amount: 320000,
    user_id: "user-1",
  },
  {
    id: "ORD-003",
    created_at: "2024-12-29T14:45:00Z",
    total_amount: 85000,
    user_id: "user-1",
  },
  {
    id: "ORD-004",
    created_at: "2024-12-29T16:20:00Z",
    total_amount: 450000,
    user_id: "user-1",
  },
  {
    id: "ORD-005",
    created_at: "2024-12-28T09:00:00Z",
    total_amount: 175000,
    user_id: "user-1",
  },
];

// Mock Order Items
export const mockOrderItems: Record<string, OrderItem[]> = {
  "ORD-001": [
    { id: "1", order_id: "ORD-001", product_id: "1", quantity: 3, price_at_sale: 15000 },
    { id: "2", order_id: "ORD-001", product_id: "2", quantity: 2, price_at_sale: 45000 },
    { id: "3", order_id: "ORD-001", product_id: "4", quantity: 2, price_at_sale: 25000 },
  ],
  "ORD-002": [
    { id: "4", order_id: "ORD-002", product_id: "3", quantity: 2, price_at_sale: 120000 },
    { id: "5", order_id: "ORD-002", product_id: "5", quantity: 1, price_at_sale: 65000 },
  ],
  "ORD-003": [
    { id: "6", order_id: "ORD-003", product_id: "6", quantity: 1, price_at_sale: 85000 },
  ],
  "ORD-004": [
    { id: "7", order_id: "ORD-004", product_id: "10", quantity: 4, price_at_sale: 75000 },
    { id: "8", order_id: "ORD-004", product_id: "9", quantity: 5, price_at_sale: 28000 },
  ],
  "ORD-005": [
    { id: "9", order_id: "ORD-005", product_id: "7", quantity: 5, price_at_sale: 18000 },
    { id: "10", order_id: "ORD-005", product_id: "8", quantity: 2, price_at_sale: 35000 },
  ],
};

// Categories
export const categories = [
  "Tất cả",
  "Mì & Phở",
  "Gia Vị",
  "Gạo",
  "Bánh",
  "Đồ Uống",
];
