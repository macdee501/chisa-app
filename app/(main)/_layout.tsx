import { Drawer } from "expo-router/drawer";
import SideDrawerContent from "@/components/home/SideDrawerContent";

export default function MainLayout() {
  return (
    <Drawer
      drawerContent={(props) => <SideDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: { width: "65%" },
      }}
    >
      <Drawer.Screen name="(shell)" options={{ headerShown: false }} />
    </Drawer>
  );
}
