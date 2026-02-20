import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CATEGORIES } from "@/data/categories";
import { useMenuNav } from "@/store/useMenuNav";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const requestScrollTo = useMenuNav((s) => s.requestScrollTo);

  const filtered = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top: input + cancel */}
      <View className="flex-row items-center gap-3 px-4 py-3">
        <View className="flex-1 flex-row items-center rounded-2xl bg-black/5 px-3 py-2">
          <Ionicons name="search" size={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            autoFocus
            placeholder="Search categories"
            placeholderTextColor="#666"
            className="ml-2 flex-1 py-2 text-sm"
          />
        </View>

        <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
          <Text className="text-sm font-semibold">Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Middle: category list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 py-6"
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              requestScrollTo(item.id); // tell Home what to scroll to
              router.back(); // close modal
            }}
            className="py-2"
          >
            <Text className="text-center text-base text-black/60">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom: back button like Steers */}
      <View className="border-t border-black/10 px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center rounded-2xl bg-yellow-500 py-4"
        >
          <Text className="text-base font-semibold text-black">BACK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
