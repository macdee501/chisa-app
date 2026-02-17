import type { CartLine } from "@/store/useCart";
import type { TipOption } from "@/store/useCheckout";

export function calcSubtotal(lines: CartLine[]) {
  return round2(
    lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0)
  );
}

export function calcTipAmount(subtotal: number, tip: TipOption) {
  return round2(subtotal * (tip / 100));
}

export function calcTotal(
  subtotal: number,
  deliveryFee: number,
  tipAmount: number
) {
  return round2(subtotal + deliveryFee + tipAmount);
}

export function calcQuantity(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
