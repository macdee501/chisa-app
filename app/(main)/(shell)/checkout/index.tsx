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

import { useCheckout } from "@/store/useCheckout";
import { mockCheckoutData } from "@/data/checkout";

export default function Checkout() {
  const { store, delivery, pricing } = mockCheckoutData;

  const tip = useCheckout((s) => s.tip);

  const tipAmount = useMemo(
    () => +(pricing.subtotal * (tip / 100)).toFixed(2),
    [pricing.subtotal, tip]
  );

  const total = useMemo(
    () =>
      +(pricing.subtotal + pricing.deliveryFee + tipAmount).toFixed(2),
    [pricing.subtotal, pricing.deliveryFee, tipAmount]
  );

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
        <TipSelector subtotal={pricing.subtotal} />

        <OrderAmount
          subtotal={pricing.subtotal}
          deliveryFee={pricing.deliveryFee}
          tipAmount={tipAmount}
          total={total}
        />

        <PaymentMethodCard />
      </ScrollView>

      <PlaceOrderBar total={total} quantity={1} onPlaceOrder={() => {}} />
    </View>
  );
}
