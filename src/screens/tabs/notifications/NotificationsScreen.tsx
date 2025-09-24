import { NotificationItem } from "@/components/notification-item";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { Notification } from "@/lib/types/notification";
import { clearAllNotifications } from "@/lib/utils/notifications";
import { parseStoredArray } from "@/lib/utils/storage";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo } from "react";
import { Alert, RefreshControl } from "react-native";
import { useMMKVString } from "react-native-mmkv";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./NotificationsScreen.styles";

export const NotificationsScreen = () => {
  const { top } = useSafeAreaInsets();
  const [notifications] = useMMKVString("notifications");

  const notificationsArray = useMemo(() => {
    return parseStoredArray<Notification>(notifications);
  }, [notifications]);

  const handleClearNotifications = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to clear all notifications? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear All", 
          style: "destructive",
          onPress: () => clearAllNotifications()
        },
      ]
    );
  };




  return (
    <ThemedView style={[styles.container, { paddingTop: top }]}>
      {/* Header */}
      <ScreenHeader 
        title="Notifications" 
        subtitle={`${notificationsArray.length} notifications`}
        rightElement={notificationsArray.length > 0 ? (
          <IconButton
            icon="delete-sweep"
            iconColor="#666"
            size={20}
            onPress={handleClearNotifications}
            style={styles.clearIconButton}
          />
        ) : undefined}
      />

      {/* Content */}
      {notificationsArray.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>
            No notifications yet{'\n'}
            You&apos;ll see your notifications here when they arrive
          </ThemedText>
        </ThemedView>
      ) : (
        <FlashList
          data={notificationsArray}
          keyExtractor={(item) => item.id}
          style={styles.list}
          //Page is already dynamic with useMMKVString hook but kept for user clarity
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
          renderItem={({ item }) => (
            <NotificationItem notification={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
};
