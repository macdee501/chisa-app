import { View, Text } from 'react-native'
import React from 'react'
import ScreenHeader from '@/components/layout/ScreenHeader'

export default function index() {
  return (
    <>
      <ScreenHeader/>
    <View className="flex-1 items-center justify-center bg-white px-6">
  <Text className="text-xl font-semibold text-black/80">
    Coming Soon
  </Text>
  <Text className="mt-3 text-center text-black/50">
    This section will be available in the full release.
  </Text>
</View>
</>
  )
}