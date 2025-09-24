import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Notification } from "@/lib/types/notification";
import { parseStoredArray } from "@/lib/utils/storage";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo } from "react";
import { RefreshControl } from "react-native";
import { useMMKVString } from "react-native-mmkv";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./notification-screen.styles";

const NotificationsScreen = () => {
  const { top } = useSafeAreaInsets();
  const [notifications] = useMMKVString("notifications");

  const notificationsArray = useMemo(() => {
    return parseStoredArray<Notification>(notifications);
  }, [notifications]);


  return (
    <ThemedView style={[styles.container, { paddingTop: top }]}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
      </ThemedView>

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
            <ThemedView style={styles.notificationItem}>
              <ThemedText style={styles.notificationTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.notificationMessage}>
                {item.message}
              </ThemedText>
            </ThemedView>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
};

export default NotificationsScreen;
