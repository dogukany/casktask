import { ThemedText } from "@/components/themed-text";
import { Notification } from "@/lib/types/notification";
import { formatTime, getTypeIcon, getTypeLabel } from "@/lib/utils/notifications";
import React from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import { styles } from "./notification-item.styles";

type NotificationItemProps = {
  notification: Notification;
  onPress?: (notification: Notification) => void;
};

export const NotificationItem = ({
  notification,
  onPress,
}: NotificationItemProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress(notification);
    } else {
      // Default handling
      if (notification.type === 2 && notification.imageUrl) {
        // Image notification - burada resmi büyütecek modal açabilirsin
        console.log("Image notification clicked:", notification.imageUrl);
      } else if (notification.type === 3 && notification.youtubeUrl) {
        // Video notification - YouTube'da aç
        Linking.openURL(notification.youtubeUrl);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.notificationItem} onPress={handlePress}>
      <View style={styles.notificationHeader}>
        <View style={styles.notificationTypeIcon}>
          <ThemedText style={styles.notificationTypeEmoji}>
            {getTypeIcon(notification.type)}
          </ThemedText>
        </View>
        <View style={styles.notificationContent}>
          <ThemedText style={styles.notificationTitle}>
            {notification.title}
          </ThemedText>
          <ThemedText style={styles.notificationTypeLabel}>
            {getTypeLabel(notification.type)}
          </ThemedText>
        </View>
        <ThemedText style={styles.notificationTime}>
          {formatTime(notification.timestamp)}
        </ThemedText>
      </View>

      {notification.message && (
        <ThemedText style={styles.notificationMessage}>
          {notification.message}
        </ThemedText>
      )}

      {notification.type === 2 && notification.imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: notification.imageUrl }}
            style={styles.notificationImage}
            resizeMode="cover"
          />
        </View>
      )}

      {notification.type === 3 && notification.youtubeUrl && (
        <View style={styles.videoContainer}>
          <ThemedText style={styles.videoLabel}>
            🎥 Tap to watch video
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};
