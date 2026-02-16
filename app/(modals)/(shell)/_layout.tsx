import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalShellLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <Slot />
    </SafeAreaView>
  );
}
