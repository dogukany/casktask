import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { styles } from './home-screen.styles'

export const HomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeTitle}>Welcome to Cask</ThemedText>
      <ThemedText style={styles.welcomeSubtitle}>Your notification center</ThemedText>
      <ThemedText style={styles.welcomeDescription}>
        Send and receive notifications with text, images, and videos
      </ThemedText>
    </ThemedView>
  )
}