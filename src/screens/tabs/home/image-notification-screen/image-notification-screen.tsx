import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { formatTime, getTypeIcon } from "@/lib/utils/notifications";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./image-notification-screen.styles";

export const ImageNotificationScreen = () => {
  const { top } = useSafeAreaInsets();
  const [imageLoadError, setImageLoadError] = useState(false);
  
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



  const handleImageError = () => {
    setImageLoadError(true);
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
        title="Image Notification"
        subtitle={notification.title}
        showBackButton
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
                Image Notification • {formatTime(notification.timestamp)}
              </ThemedText>
            </View>
          </View>

          {/* Image Section */}
          {notification.imageUrl && (
            <View style={styles.imageSection}>
              <View style={styles.imageContainer}>
                {!imageLoadError ? (
                  <Image
                    source={{ uri: notification.imageUrl }}
                    style={styles.notificationImage}
                    onError={handleImageError}
                  />
                ) : (
                  <View style={styles.imageLoadError}>
                    <ThemedText style={styles.imageErrorText}>
                      📷{'\n'}
                      Image could not be loaded
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
          )}

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
                Image Notification
              </ThemedText>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Received:</ThemedText>
              <ThemedText style={styles.metaValue}>
                {new Date(notification.timestamp).toLocaleString()}
              </ThemedText>
            </View>
            {notification.imageUrl && (
              <View style={styles.metaRow}>
                <ThemedText style={styles.metaLabel}>Image URL:</ThemedText>
                <ThemedText style={styles.metaValue} numberOfLines={1}>
                  {notification.imageUrl}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};