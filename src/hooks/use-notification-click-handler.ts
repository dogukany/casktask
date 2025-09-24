import { NotificationType } from "@/constants/notification";
import { CaskRemoteMessage } from "@/lib/types";
import { parseNotificationFromFCM } from "@/lib/utils/notifications";
import { firebaseMessaging } from "@/service/firebase";
import {
    FirebaseMessagingTypes,
    getInitialNotification,
    onNotificationOpenedApp,
} from "@react-native-firebase/messaging";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

/**
 * Hook for handling notification clicks when app opens from background/quit state
 */
export const useNotificationClickHandler = () => {
  const router = useRouter();

  // Notification click handler
  const handleNotificationClick = useCallback(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      try {
        // Parse notification from FCM message
        const notification = parseNotificationFromFCM(
          remoteMessage as CaskRemoteMessage
        );

        // Route based on notification type
        const routeMap = {
          [NotificationType.TEXT]: "/(tabs)/(home)/text-notification",
          [NotificationType.IMAGE]: "/(tabs)/(home)/image-notification",
          [NotificationType.VIDEO]: "/(tabs)/(home)/video-notification",
        } as const;

        const pathname = routeMap[notification.type];

        if (pathname) {
          router.push({
            pathname,
            params: {
              notification: JSON.stringify(notification),
            },
          });
        } else {
          console.warn(
            "Unknown notification type for routing:",
            notification.type
          );
        }
      } catch (error) {
        console.error("Error handling notification click:", error);
      }
    },
    [router]
  );

  useEffect(() => {
    // Handle notification that opened app from background state
    const unsubscribeBackground = onNotificationOpenedApp(
      firebaseMessaging,
      (remoteMessage) => {
        handleNotificationClick(remoteMessage);
      }
    );

    // Handle notification when app was opened from quit state
    getInitialNotification(firebaseMessaging).then((remoteMessage) => {
      if (remoteMessage) {
        handleNotificationClick(remoteMessage);
      }
    });

    // Cleanup
    return () => {
      unsubscribeBackground();
    };
  }, [handleNotificationClick]);
};
