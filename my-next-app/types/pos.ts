export interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image_url: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  user_id: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_sale: number;
}

export interface Profile {
  id: string;
  email: string;
  role: "admin" | "cashier";
  avatar_url?: string;
  full_name?: string;
}
