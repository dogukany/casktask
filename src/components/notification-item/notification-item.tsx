import { ThemedText } from "@/components/themed-text";
import { NotificationType } from "@/constants/notification";
import { Notification } from "@/lib/types/notification";
import { formatTime, getTypeIcon, getTypeLabel } from "@/lib/utils/notifications";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
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

      {notification.type === NotificationType.IMAGE && notification.imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: notification.imageUrl }}
            style={styles.notificationImage}
            resizeMode="cover"
          />
        </View>
      )}

      {notification.type === NotificationType.VIDEO && notification.youtubeUrl && (
        <View style={styles.videoContainer}>
          <ThemedText style={styles.videoLabel}>
            🎥 Tap to watch video
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};
