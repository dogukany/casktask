import { NotificationType } from "@/constants/notification";

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp?: number;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
