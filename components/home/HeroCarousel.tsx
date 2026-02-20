import { HERO_SLIDES, HeroSlide } from "@/data/slide";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const listRef = useRef<FlatList<HeroSlide>>(null);

  const cardWidth = Math.round(width*0.85);
  const snapInterval = useMemo(() => cardWidth + 12, [cardWidth]);

  // Auto-advance (respects pause)
  useEffect(() => {
    if (HERO_SLIDES.length <= 1 || isPaused) return;

    const id = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % HERO_SLIDES.length;

        listRef.current?.scrollToOffset({
          offset: next * snapInterval,
          animated: true,
        });

        return next;
      });
    }, 3500);

    return () => clearInterval(id);
  }, [isPaused, snapInterval]);

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / snapInterval);
    setActive(index);
  };

  return (
    <View className="bg-white">
      <FlatList
        ref={listRef}
        data={HERO_SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 py-3"
        snapToInterval={snapInterval}
        decelerationRate="fast"
        bounces={false}
        ItemSeparatorComponent={() => <View className="w-3" />}
        onMomentumScrollEnd={handleMomentumEnd}
        onScrollBeginDrag={() => setIsPaused(true)}
        onScrollEndDrag={() => {
          // small delay so it doesn’t instantly resume
          setTimeout(() => setIsPaused(false), 1500);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {}}
            className="h-44 rounded-2xl overflow-hidden"
            style={{ width: cardWidth, backgroundColor: item.color }}
          >

            <View className="flex-1 justify-end p-4">
              <Text className="text-xl font-bold text-white">
                {item.title}
              </Text>
              {item.subtitle ? (
                <Text className="mt-1 text-sm text-white/90">
                  {item.subtitle}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Pagination dots */}
      <View className="flex-row justify-center pb-3">
        {HERO_SLIDES.map((_, i) => (
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
