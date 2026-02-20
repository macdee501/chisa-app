import { useCheckout, type TipOption } from "@/store/useCheckout";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TipSelector({ subtotal }: { subtotal: number }) {
  const tip = useCheckout((s) => s.tip);
  const setTip = useCheckout((s) => s.setTip);

  const options: TipOption[] = [0, 5, 10, 15, 20];

  return (
    <>
      <View className="px-4 mt-8">
        <Text className="text-xl font-extrabold tracking-wide">DRIVER TIP</Text>
        <Text className="mt-1 text-sm text-black/70">
          Add a tip to thank your driver.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-3"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {options.map((o) => {
          const selected = tip === o;
          const label =
            o === 0 ? "No Tip" : `${o}%\nR ${(subtotal * (o / 100)).toFixed(2)}`;

          return (
            <TouchableOpacity
              key={o}
              onPress={() => setTip(o)}
              className={[
                "mr-3 h-16 w-24 items-center justify-center rounded-xl",
                selected ? "bg-amber-500" : "bg-black/5",
              ].join(" ")}
            >
              <Text className={`text-center text-sm ${selected ? "font-bold" : ""}`}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
}
