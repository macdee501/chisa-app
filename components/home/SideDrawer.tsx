import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onClose: () => void;
  name?: string;
};

const LINKS = ["Home", "Orders", "Inbox", "Account", "Help", "Contact", "About"];

export default function SideDrawer({ onClose, name }: Props) {
  return (
    <View className="absolute inset-0 z-50 flex-row">
      {/* Backdrop */}
      <Pressable onPress={onClose} className="flex-1 bg-black/40" />

      {/* Drawer panel (RIGHT side) */}
      <View className="h-full w-[65%] bg-white px-4 pt-12">
        
        {/* Close button aligned RIGHT */}
        <View className="mb-6 flex-row justify-end">
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={26} />
          </Pressable>
        </View>

        {/* Logo placeholder */}
        <View className="mb-6 h-14 w-32 rounded-xl bg-black/10" />

        {/* Links */}
        {LINKS.map((label) => (
          <Pressable key={label} className="py-3">
            <Text className="text-base">{label}</Text>
          </Pressable>
        ))}

        {/* Footer greeting */}
        <View className="mt-auto pb-6">
          <Text className="text-sm text-black/60">
            {name ? `Hi, ${name}` : "Hi, Guest"}
          </Text>
        </View>
      </View>
    </View>
  );
}
