"use client";
import { CartItem } from "@/types/pos";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface ReceiptProps {
  items: CartItem[];
  total: number;
  orderId: string;
}

export const Receipt = ({ items, total, orderId }: ReceiptProps) => {
  return (
    <div id="receipt-to-print" className="print-receipt">
      <h1>LUA - Chợ Á Đông</h1>
      <div className="receipt-date">
        <div>Mã đơn: {orderId}</div>
        <div>{formatDate(new Date().toISOString())}</div>
      </div>

      <div style={{ borderTop: "1px dashed #000", marginBottom: "8px" }} />

      {items.map((item) => (
        <div key={item.product.id} className="receipt-item">
          <span>
            {item.product.name} x{item.quantity}
          </span>
          <span>{formatCurrency(item.product.price * item.quantity)}</span>
        </div>
      ))}

      <div className="receipt-total">
        <span>TỔNG CỘNG:</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <div className="receipt-footer">
        <div>Cảm ơn quý khách!</div>
        <div>Hẹn gặp lại</div>
      </div>
    </div>
  );
};
