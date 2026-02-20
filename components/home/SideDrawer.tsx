import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  onClose: () => void;
  name?: string;
};

const LINKS = ["Home", "Orders", "Inbox", "Account", "Help", "Contact", "About"] as const;
type LinkLabel = (typeof LINKS)[number];

// Only wire what exists right now (add more as you create those screens)
const ROUTES = {
  Home: "/home",
  Orders: "/orders",
  Inbox: "/inbox",
  Account: "/account",
  Help: "/help",
  Contact: "/contact",
  About: "/about",
} as const;


export default function SideDrawer({ onClose, name }: Props) {
  const handlePress = (label: LinkLabel) => {
    const href = ROUTES[label];
    if (!href) return; // safe: do nothing if not wired yet
    router.navigate(href);
    onClose();
  };

  return (
    <View className="absolute inset-0 z-50 flex-row">
      <TouchableOpacity onPress={onClose} className="flex-1 bg-black/40" />

      <View className="h-full w-[65%] bg-white px-4 pt-12">
        <View className="mb-6 flex-row justify-end">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={26} />
          </TouchableOpacity>
        </View>

        <View className="mb-6 h-14 w-32 rounded-xl bg-black/10" />

        {LINKS.map((label) => {
          const enabled = !!ROUTES[label];
          return (
            <TouchableOpacity
              key={label}
              className="py-3"
              onPress={() => handlePress(label)}
              disabled={!enabled}
            >
              <Text className={`text-base ${enabled ? "" : "text-black/30"}`}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View className="mt-auto pb-6">
          <Text className="text-sm text-black/60">
            {name ? `Hi, ${name}` : "Hi, Guest"}
          </Text>
        </View>
      </View>
    </View>
  );
}
