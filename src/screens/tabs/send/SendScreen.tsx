import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { ScreenHeader } from '@/components/ui/screen-header'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const SendScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ThemedView style={[{ flex: 1 }, { paddingTop: top }]}>
      <ScreenHeader 
        title="Send" 
        subtitle="Send notifications to your devices"
      />
      
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText style={{ fontSize: 16, opacity: 0.7 }}>
          Send functionality coming soon...
        </ThemedText>
      </ThemedView>
    </ThemedView>
  )
}