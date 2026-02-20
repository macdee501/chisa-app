import { Text, View } from "react-native";

export default function OrderAmount({
  subtotal,
  deliveryFee,
  tipAmount,
  total,
}: {
  subtotal: number;
  deliveryFee: number;
  tipAmount: number;
  total: number;
}) {
  return (
    <View className="px-4 mt-8">
      <Text className="text-xl font-extrabold tracking-wide">ORDER AMOUNT</Text>

      <View className="mt-4">
        <Row label="Subtotal" value={`R ${subtotal.toFixed(2)}`} />
        <Row label="Delivery Fee" value={`R ${deliveryFee.toFixed(2)}`} />
        <Row label="Driver Tip" value={`R ${tipAmount.toFixed(2)}`} />

        {/* <TouchableOpacity onPress={() => {}} className="mt-3 flex-row items-center">
          <Ionicons name="gift-outline" size={18} color="#d97706" />
          <Text className="ml-2 text-base text-amber-600">Add Voucher or wiCode</Text>
        </TouchableOpacity> */}

        <View className="mt-4 flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Total</Text>
          <Text className="text-lg font-extrabold">{`R ${total.toFixed(2)}`}</Text>
        </View>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-1">
      <Text className="text-base text-black/70">{label}</Text>
      <Text className="text-base">{value}</Text>
    </View>
  );
}
