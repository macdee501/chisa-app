// app/(main)/_layout.tsx
import SideDrawer from "@/components/home/SideDrawer";
import { Drawer } from "expo-router/drawer";

export default function MainLayout() {
  return (
    <Drawer
      drawerContent={(props) => <SideDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Names match the route folders inside (main) */}
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="menu" options={{ title: "Menu" }} />
      <Drawer.Screen name="account" options={{ title: "Account" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
