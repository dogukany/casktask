import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { formatTime, getTypeIcon } from "@/lib/utils/notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./text-notification-screen.styles";

export const TextNotificationScreen = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
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

  const handleBack = () => {
    router.back();
  };

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
        leftElement={
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ThemedText style={styles.backIcon}>←</ThemedText>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification Card */}
        <View style={styles.notificationCard}>
          {/* Header Section */}
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <ThemedText style={styles.iconText}>
                {getTypeIcon(notification.type)}
              </ThemedText>
            </View>
            <View style={styles.cardHeaderText}>
              <ThemedText style={styles.cardTitle}>
                {notification.title}
              </ThemedText>
              <ThemedText style={styles.cardSubtitle}>
                Text Notification • {formatTime(notification.timestamp)}
              </ThemedText>
            </View>
          </View>

          {/* Message Section */}
          {notification.message && (
            <View style={styles.messageSection}>
              <ThemedText style={styles.messageText}>
                {notification.message}
              </ThemedText>
            </View>
          )}

          {/* Meta Information */}
          <View style={styles.metaSection}>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Type:</ThemedText>
              <ThemedText style={styles.metaValue}>
                Text Notification
              </ThemedText>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Received:</ThemedText>
              <ThemedText style={styles.metaValue}>
                {new Date(notification.timestamp).toLocaleString()}
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};
