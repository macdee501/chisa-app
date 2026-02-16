import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCheckout } from "@/store/useCheckout";

export default function DriverNotesCard() {
  const driverNotes = useCheckout((s) => s.driverNotes);
  const setDriverNotes = useCheckout((s) => s.setDriverNotes);

  return (
    <View className="mx-4 mt-4 rounded-2xl bg-black/5 px-4 py-3">
      <View className="flex-row items-center">
        <Ionicons name="add" size={18} />
        <Text className="ml-2 text-base font-semibold">Add Driver notes</Text>
      </View>

      <TextInput
        value={driverNotes}
        onChangeText={setDriverNotes}
        placeholder="e.g. Ring bell, leave at door..."
        placeholderTextColor="#666"
        className="mt-3 rounded-xl bg-white px-3 py-3 text-sm"
      />
    </View>
  );
}
