import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  onClose: () => void;
  name?: string;
};

// Map labels to real routes (clean URLs, no group names)
const LINKS: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },          // app/(main)/index/index.tsx
  { label: "Orders", href: "/orders" },  // app/(main)/orders/index.tsx (create when ready)
  { label: "Inbox", href: "/inbox" },    // app/(main)/inbox/index.tsx (create when ready)
  { label: "Account", href: "/account" },// app/(main)/account/index.tsx
  { label: "Help", href: "/help" },      // app/(main)/help/index.tsx
  { label: "Contact", href: "/contact" },// app/(main)/contact/index.tsx
  { label: "About", href: "/about" },    // app/(main)/about/index.tsx
];

export default function SideDrawer({ onClose, name }: Props) {
  const go = (href: string) => {
    router.navigate(href);
    onClose(); // close drawer/backdrop after navigating
  };

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
        {LINKS.map(({ label, href }) => (
          <Pressable key={href} className="py-3" onPress={() => go(href)}>
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
