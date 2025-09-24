import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

const SendScreen = () => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <ThemedText>SendScreen</ThemedText>
    </ThemedView>
  )
}

export default SendScreen