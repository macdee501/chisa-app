import { FavouriteItem, FAVOURITES } from "@/data/favourite";
import { View, Text, FlatList, Pressable } from "react-native";

export default function Favourites() {
  return (
    <View className="bg-white px-4 py-3">
      {/* Header row */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold">Favourites</Text>
        <Pressable onPress={() => {}}>
          <Text className="text-sm font-semibold text-black/60">See all</Text>
        </Pressable>
      </View>

      {/* Horizontal list */}
      <FlatList
        data={FAVOURITES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => <FavouriteCard item={item} />}
      />
    </View>
  );
}

function FavouriteCard({ item }: { item: FavouriteItem }) {
  return (
    <Pressable
      onPress={() => {}}
      className="w-44 overflow-hidden rounded-2xl bg-black/5"
    >
      {/* Image placeholder */}
      <View style={{ backgroundColor: item.color }} className="h-24 w-full" />

      {/* Text */}
      <View className="p-3">
        <Text className="text-sm font-semibold" numberOfLines={1}>
          {item.name}
        </Text>
        {item.description ? (
          <Text className="mt-1 text-xs text-black/60" numberOfLines={1}>
            {item.description}
          </Text>
        ) : null}

        <Text className="mt-2 text-sm font-semibold">
          R{item.price.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}
