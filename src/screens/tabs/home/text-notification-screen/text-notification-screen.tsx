import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { formatTime, getTypeIcon } from "@/lib/utils/notifications";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./text-notification-screen.styles";

export const TextNotificationScreen = () => {
  const { top } = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    notification: string;
  }>();

  const notification = useMemo(() => {
    if (!params.notification) return null;
    
    try {
      return JSON.parse(params.notification);
    } catch (error) {
      console.error('Failed to parse notification:', error);
      return null;
    }
  }, [params.notification]);



  if (!notification) {
    return (
      <ThemedView style={[styles.container, { paddingTop: top }]}>
        <ThemedText>No notification data</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: top }]}>
      {/* Header */}
      <ScreenHeader
        title="Text Notification"
        subtitle={notification.title}
        showBackButton
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification Card */}
        <ThemedView style={styles.notificationCard}>
          {/* Header Section */}
          <ThemedView style={styles.cardHeader}>
            <ThemedView style={styles.iconContainer}>
              <ThemedText style={styles.iconText}>
                {getTypeIcon(notification.type)}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.cardHeaderText}>
              <ThemedText style={styles.cardTitle}>
                {notification.title}
              </ThemedText>
              <ThemedText style={styles.cardSubtitle}>
                Text Notification • {formatTime(notification.timestamp)}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Message Section */}
          {notification.message && (
            <ThemedView style={styles.messageSection}>
              <ThemedText style={styles.messageText}>
                {notification.message}
              </ThemedText>
            </ThemedView>
          )}

          {/* Meta Information */}
          <ThemedView style={styles.metaSection}>
            <ThemedView style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Type:</ThemedText>
              <ThemedText style={styles.metaValue}>
                Text Notification
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Received:</ThemedText>
              <ThemedText style={styles.metaValue}>
                {new Date(notification.timestamp).toLocaleString()}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};
