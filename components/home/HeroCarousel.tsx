import { useRef, useState } from "react";
import { View, Text, FlatList, Dimensions, Pressable } from "react-native";

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  bgClass: string; // Tailwind class for placeholder color
};

const SLIDES: Slide[] = [
  { id: "1", title: "Burger Deal", subtitle: "Limited time", bgClass: "bg-orange-400" },
  { id: "2", title: "Chicken Combo", subtitle: "New", bgClass: "bg-red-500" },
  { id: "3", title: "Family Feast", subtitle: "Best value", bgClass: "bg-yellow-400" },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const cardWidth = width - 32; // px-4 on both sides = 16*2
  const snapInterval = cardWidth + 12; // spacing between cards

  return (
    <View className="bg-slate-500">
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 py-3 bg-red-100"
        snapToInterval={snapInterval}
        decelerationRate="fast"
        bounces={false}
        ItemSeparatorComponent={() => <View className="w-3 bg-red-400"/>}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const index = Math.round(x / snapInterval);
          setActive(index);
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {}}
            className={`h-44 rounded-2xl ${item.bgClass} overflow-hidden`}
            style={{ width: cardWidth }}
          >
            <View className="flex-1 p-4 justify-end">
              <Text className="text-white text-xl font-bold">{item.title}</Text>
              {item.subtitle ? (
                <Text className="text-white/90 text-sm mt-1">{item.subtitle}</Text>
              ) : null}
            </View>
          </Pressable>
        )}
      />

      {/* Pagination dots */}
      <View className="flex-row justify-center pb-3">
        {SLIDES.map((_, i) => (
          <View
            key={i}
            className={`mx-1 h-2 rounded-full ${
              i === active ? "w-6 bg-black/80" : "w-2 bg-black/20"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
