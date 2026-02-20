import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

export default function MapModal() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: "deliver" | "collect" }>();
  const mapRef = useRef<MapView>(null);

  const initialRegion: Region = {
    latitude: -26.2041,
    longitude: 28.0473,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  const [pin, setPin] = useState({
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude,
  });

  return (
    <View className="flex-1 bg-white">
      {/* Map */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onRegionChangeComplete={(r) => {
          setPin({ latitude: r.latitude, longitude: r.longitude });
        }}
      >
        <Marker coordinate={pin} />
      </MapView>

      {/* Top bar overlay */}
      <View className="absolute left-0 right-0 top-0 px-4 pt-4">
        <View className="flex-row items-center justify-between rounded-2xl bg-white px-4 py-3 border border-black/10">
          <Text className="text-sm font-semibold">
            {mode === "collect" ? "Choose collection store" : "Choose delivery address"}
          </Text>

          <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
            <Text className="text-sm font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer confirm overlay */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-6">
        <View className="rounded-2xl bg-white border border-black/10 p-3">
          <TouchableOpacity
            onPress={() => {
              // for now just log; later we’ll store + return
              console.log("Confirmed location:", pin);
              router.back();
            }}
            className="h-12 items-center justify-center rounded-xl bg-black"
          >
            <Text className="text-white font-semibold">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
