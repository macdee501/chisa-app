import { useState } from "react";
import { Alert, Button, Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import HeroCarousel from "@/components/home/HeroCarousel";
import SearchMenu from "@/components/home/SearchMenu";
import HomeHeader from "@/components/home/HomeHeader";
import Favourites from "@/components/home/Favourites";
import Deals from "@/components/home/Deals";
import CategoryList from "@/components/home/Categories/CategoryList";
import Footer from "@/components/layout/Footer";
import SideDrawer from "@/components/home/SideDrawer";

export default function Home() {
  const [mode, setMode] = useState<"deliver" | "collect">("deliver");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        
        <HomeHeader
          mode={mode}
          onChangeMode={setMode}
          onOpenMenu={() => setDrawerOpen(true)}
        />

        <HeroCarousel />
        <SearchMenu />
        <Favourites />
        <Deals />
        <CategoryList />
        <Footer />
      </ScrollView>

      {drawerOpen ? <SideDrawer onClose={() => setDrawerOpen(false)} /> : null}
    </SafeAreaView>
  );
}
