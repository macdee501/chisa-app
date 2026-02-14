// app/(main)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import SideDrawerContent from "@/components/home/SideDrawerContent";

export default function MainLayout() {
  return (
    <Drawer
      drawerContent={(props) => <SideDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition:"right"
        // Keep your existing feel; add these only if you want to match the 65% panel vibe:
        // drawerStyle: { width: "65%" },
      }}
    >
      {/* Only list screens that exist right now to keep this incremental */}
      <Drawer.Screen name="home" options={{ title: "Home" }} />

      {/* Add these only when the files exist (orders.tsx, inbox.tsx, etc.) */}
      {/* <Drawer.Screen name="orders" options={{ title: "Orders" }} /> */}
      {/* <Drawer.Screen name="inbox" options={{ title: "Inbox" }} /> */}
      {/* <Drawer.Screen name="account" options={{ title: "Account" }} /> */}
      {/* <Drawer.Screen name="help" options={{ title: "Help" }} /> */}
      {/* <Drawer.Screen name="contact" options={{ title: "Contact" }} /> */}
      {/* <Drawer.Screen name="about" options={{ title: "About" }} /> */}
    </Drawer>
  );
}
