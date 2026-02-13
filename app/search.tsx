import { useMemo, useState } from "react";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES = [
  "Burgers",
  "Chicken",
  "Sides",
  "Drinks",
  "Desserts",
  "Combos",
  "Family Meals",
  "Sauces",
];

export default function SearchModal() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) => c.toLowerCase().includes(q));
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top section: input + cancel */}
      <View className="flex-row items-center gap-3 px-4 py-3">
        <View className="flex-1 flex-row items-center rounded-2xl bg-black/5 px-3 py-2">
          <Ionicons name="search" size={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            autoFocus
            placeholder="Search for an item..."
            placeholderTextColor="#666"
            className="ml-2 flex-1 py-2 text-sm"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery("")} hitSlop={10}>
              <Ionicons name="close-circle" size={18} color="#666" />
            </Pressable>
          ) : null}
        </View>

        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text className="text-sm font-semibold">Cancel</Text>
        </Pressable>
      </View>

      {/* Middle: categories list */}
      <View className="flex-1 px-4">
        <Text className="mb-2 text-base font-semibold">Categories</Text>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item }) => (
            <Pressable className="rounded-2xl bg-black/5 px-4 py-4">
              <Text className="text-base">{item}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* Bottom: footer back button */}
      <View className="border-t border-black/10 px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="items-center rounded-2xl bg-black py-4"
        >
          <Text className="text-base font-semibold text-white">Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
