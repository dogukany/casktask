import { NotificationType } from "@/constants/notification";
import { CaskRemoteMessage, Notification } from "@/lib/types/notification";
import {
  FirebaseMessagingTypes,
  getMessaging,
  getToken,
} from "@react-native-firebase/messaging";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as Notifications from 'expo-notifications';

import { parseStoredArray, storage } from "./storage";
dayjs.extend(relativeTime);


/**
 * Request notification permissions and get FCM token
 * @returns Promise<string | null> - FCM token or null if failed
 */
export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  try {
    // Expo notifications ile permission iste
    const { status } = await Notifications.requestPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Notification permission not granted');
      return null;
    }

    // FCM token al
    const token = await getToken(getMessaging());
    return token;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

/**
 * Get notification type icon
 */
export const getTypeIcon = (type: any): string => {
  switch (type) {
    case 1: 
      return "💬";
    case 2: 
      return "🖼️";
    case 3: 
      return "🎥";
    default:
      return "📢";
  }
};

/**
 * Get notification type label
 */
export const getTypeLabel = (type: any): string => {
  switch (type) {
    case 1: 
      return "Text";
    case 2: 
      return "Image";
    case 3: 
      return "Video";
    default:
      return "Unknown";
  }
};

/**
 * Format timestamp to relative time
 */
export const formatTime = (timestamp: number): string => {
  return dayjs(timestamp).fromNow();
};

/**
 * Transforms FCM message to Notification type
 */
export const parseNotificationFromFCM = (fcmMessage: CaskRemoteMessage): Notification => {
  const pnType = parseInt(fcmMessage.data?.pn_type || "1");
  
  return {
    id: fcmMessage.data?.notification_id || fcmMessage.messageId || `notification_${Date.now()}`,
    title: fcmMessage.notification?.title || "No Title",
    message: fcmMessage.notification?.body,
    type: pnType as NotificationType,
    timestamp: fcmMessage.sentTime || Date.now(),
    read: false,
    imageUrl: fcmMessage.data?.img_url,
    youtubeUrl: fcmMessage.data?.youtube_url,
    createdAt: new Date(),
  };
};

/**
 * Notification'ı storage'a ekler
 */
export const addNotificationToStorage = (notification: Notification): void => {
  try{
  const stored = storage.getString("notifications");
  const existingNotifications = parseStoredArray<Notification>(stored);
  
  // Aynı ID'li notification varsa güncelle, yoksa ekle
  const existingIndex = existingNotifications.findIndex((n: Notification) => n.id === notification.id);
  
  if (existingIndex >= 0) {
    existingNotifications[existingIndex] = notification;
  } else {
    existingNotifications.unshift(notification);
  }
  
  storage.set("notifications", JSON.stringify(existingNotifications));
  } catch (error) {
    console.error("Error adding notification to storage:", error);
  }
};

/**
 * Handles incoming FCM message and adds it to storage
 */
export const handleIncomingNotification = (fcmMessage: FirebaseMessagingTypes.RemoteMessage): void => {
  
  try {
    // Runtime'da type safety için casting yapıyoruz
    const notification = parseNotificationFromFCM(fcmMessage as CaskRemoteMessage);
    addNotificationToStorage(notification);
  } catch (error) {
    console.error("Error processing FCM message:", error);
  }
};

/**
 * Clears all notifications
 */
export const clearAllNotifications = (): void => {
  storage.set("notifications", JSON.stringify([]));
};

/**
 * Extract YouTube video ID from URL
 * Supports both formats:
 * - https://www.youtube.com/watch?v=aqz-KE-bpKQ
 * - https://youtu.be/aqz-KE-bpKQ
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  try {
    const parsed = new URL(url);
    
    // youtu.be format (short URL)
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.replace('/', '') || null;
    }
    
    // youtube.com format (long URL)
    if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
      return parsed.searchParams.get('v') || null;
    }
    
    return null;
  } catch {
    return null;
  }
};

/**
 * Extract start time from YouTube URL
 */
export const extractYouTubeStartTime = (url: string): number | null => {
  if (!url) return null;
  
  try {
    const parsed = new URL(url);
    const time = parsed.searchParams.get("t");
    return time ? parseInt(time) : null;
  } catch {
    return null;
  }
};
