import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

import HeroCarousel from "@/components/home/HeroCarousel";
import HomeHeader from "@/components/home/HomeHeader";
import MenuSections from "@/components/home/MenuSections";
import SearchMenu from "@/components/home/SearchMenu";
import Footer from "@/components/layout/Footer";

import { useMenuNav } from "@/store/useMenuNav";

export default function Home() {
  const [mode, setMode] = useState<"deliver" | "collect">("deliver");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigation = useNavigation();

  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});

  const target = useMenuNav((s) => s.scrollToCategoryId);
  const clearRequest = useMenuNav((s) => s.clearRequest);

  useEffect(() => {
    if (!target) return;
    const y = sectionY.current[target];
    if (y != null) {
      scrollRef.current?.scrollTo({ y: Math.max(y - 10, 0), animated: true });
    }
    clearRequest();
  }, [target, clearRequest]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 110 }}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y;
          setShowScrollTop(y > 500);
        }}
      >
        <HomeHeader
          mode={mode}
          onChangeMode={setMode}
          onOpenMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <HeroCarousel />
        <SearchMenu />

        <MenuSections
          registerSection={(id, y) => {
            sectionY.current[id] = y;
          }}
        />
      </ScrollView>

      <Footer />

      {showScrollTop ? (
        <TouchableOpacity
          onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
          className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-white shadow"
          style={{ elevation: 6 }}
        >
          <Ionicons name="chevron-up" size={26} />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}
