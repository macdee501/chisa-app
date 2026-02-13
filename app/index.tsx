import CategoryList from "@/components/home/Categories/CategoryList";
import Favourites from "@/components/home/Favourites";
import HeroCarousel from "@/components/home/HeroCarousel";
import SearchMenu from "@/components/home/SearchMenu";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        <Header/>
        <HeroCarousel/>
        <SearchMenu/>
        <Favourites/>
        <CategoryList/>
        <Footer/>
      </ScrollView>
    </SafeAreaView>
    
  );
}
