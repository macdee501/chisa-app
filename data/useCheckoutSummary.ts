import { useMemo } from "react";
import { useCart } from "@/store/useCart";
import { useCheckout } from "@/store/useCheckout";

export function useCheckoutSummary() {
  const lines = useCart((s) => s.lines);
  const cartTotalFn = useCart((s) => s.total);

  const tip = useCheckout((s) => s.tip);

  // mock for now (later move to profile store / API)
  const phone = "+27849198928";
  const address = {
    title: "Bridges Road",
    line: "13 Bridges Road, Orkney, North West 2619, South Africa",
  };

  // simple rule for now
  const deliveryFee = lines.length ? 15 : 0;

  return useMemo(() => {
    const subtotal = round2(cartTotalFn());
    const quantity = lines.reduce((sum, l) => sum + l.qty, 0);

    const tipAmount = round2(subtotal * (tip / 100));
    const total = round2(subtotal + deliveryFee + tipAmount);

    return {
      delivery: { phone, address },
      pricing: { subtotal, deliveryFee, tipAmount, total },
      quantity,
      hasItems: lines.length > 0,
    };
  }, [lines, cartTotalFn, tip, deliveryFee]);
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
