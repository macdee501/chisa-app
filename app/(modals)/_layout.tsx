// app/(modals)/_layout.tsx
import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // presentation handled by root stack screen for (modals)
      }}
    >
      <Stack.Screen name="product" />
      <Stack.Screen name="order" />
      <Stack.Screen name="search" />
    </Stack>
  );
}
