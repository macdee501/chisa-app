import { View, Text, Pressable } from "react-native";

export default function PlaceOrderBar({
  total,
  quantity,
  onPlaceOrder,
}: {
  total: number;
  quantity: number;
  onPlaceOrder: () => void;
}) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-amber-500 px-4 py-4">
      <Pressable
        onPress={onPlaceOrder}
        className="flex-row items-center justify-between rounded-xl"
      >
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-black/10">
          <Text className="font-bold">{quantity}</Text>
        </View>

        <Text className="text-base font-extrabold tracking-wide">PLACE ORDER</Text>

        <Text className="text-base font-extrabold">{`R ${total.toFixed(2)}`}</Text>
      </Pressable>
    </View>
  );
}
