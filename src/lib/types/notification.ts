import { NotificationType } from "@/constants/notification";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export type Notification = {
  id: string;
  title: string;
  message?: string; 
  type: NotificationType;
  timestamp: number;
  read?: boolean;
  imageUrl?: string; 
  youtubeUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FCMNotificationData = {
  notification_id: string;
  pn_type: string;
  img_url?: string;
  youtube_url?: string;
};

export type CaskRemoteMessage = Omit<FirebaseMessagingTypes.RemoteMessage, 'data'> & {
  data?: FCMNotificationData;
};
