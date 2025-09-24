import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

export const HomeScreen = () => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <ThemedText>HomeScreen</ThemedText>
    </ThemedView>
  )
}
