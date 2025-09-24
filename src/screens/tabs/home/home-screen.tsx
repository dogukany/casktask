import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

export const HomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeTitle}>Welcome to Cask</ThemedText>
      <ThemedText style={styles.welcomeSubtitle}>Your notification center</ThemedText>
      <ThemedText style={styles.welcomeDescription}>
        Send and receive different types of notifications{'\n'}
        including text, images, and videos
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 18,
    opacity: 0.7,
    marginBottom: 24,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 24,
  },
})
