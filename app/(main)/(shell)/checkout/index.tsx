import { useMemo } from "react";
import { View, ScrollView } from "react-native";

import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import DeliveryCard from "@/components/checkout/DeliveryCard";
import DriverNotesCard from "@/components/checkout/DriverNotesCard";
import InfoPill from "@/components/checkout/InfoPill";
import TipSelector from "@/components/checkout/TipSelector";
import OrderAmount from "@/components/checkout/OrderAmount";
import PaymentMethodCard from "@/components/checkout/PaymentMethodCard";
import PlaceOrderBar from "@/components/checkout/PlaceOrderBar";

import { useCart } from "@/store/useCart";
import { useCheckout } from "@/store/useCheckout";
import { mockCheckoutData } from "@/data/checkout";

export default function Checkout() {
  const { store, delivery } = mockCheckoutData;

  const lines = useCart((s) => s.lines);
  const totalFn = useCart((s) => s.total);

  const tip = useCheckout((s) => s.tip);

  const quantity = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const subtotal = useMemo(() => round2(totalFn()), [totalFn, lines]);

  // simple delivery rule for now (swap later when you have store rules / distance)
  const deliveryFee = useMemo(() => (lines.length > 0 ? 15 : 0), [lines.length]);

  const tipAmount = useMemo(
    () => round2(subtotal * (tip / 100)),
    [subtotal, tip]
  );

  const total = useMemo(
    () => round2(subtotal + deliveryFee + tipAmount),
    [subtotal, deliveryFee, tipAmount]
  );

  const hasItems = lines.length > 0;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <CheckoutHeader storeName={store.name} />

        <DeliveryCard
          addressTitle={delivery.addressTitle}
          addressLine={delivery.addressLine}
          phone={delivery.phone}
        />

        <DriverNotesCard />

        <InfoPill text="Drivers are available" />

        <TipSelector subtotal={subtotal} />

        <OrderAmount
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tipAmount={tipAmount}
          total={total}
        />

        <PaymentMethodCard />
      </ScrollView>

      <PlaceOrderBar
        total={total}
        quantity={quantity}
        disabled={!hasItems}
        onPlaceOrder={() => {
          if (!hasItems) return;
          // next step: build payload + submit
          // for now, just keep it noop
        }}
      />
    </View>
  );
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
