import { NotificationType } from "@/constants/notification";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export type Notification = {
  id: string;
  title: string;
  message?: string; // Optional çünkü image/video'da olmayabilir
  type: NotificationType;
  timestamp: number;
  read?: boolean;
  imageUrl?: string; // IMAGE type için
  youtubeUrl?: string; // VIDEO type için
  createdAt?: Date;
  updatedAt?: Date;
};

// FCM'den gelen mesajın data kısmının tipi
export type FCMNotificationData = {
  notification_id: string;
  pn_type: string;
  img_url?: string;
  youtube_url?: string;
};

// Firebase RemoteMessage'ı extend ederek kendi data tipimizi kullanıyoruz
export type CaskRemoteMessage = Omit<FirebaseMessagingTypes.RemoteMessage, 'data'> & {
  data?: FCMNotificationData;
};
