import { z } from 'zod';
import { NotificationType } from '../../constants/notification';

export const notificationFormSchema = z.object({
  type: z.enum(NotificationType),
  delay: z
    .number()
    .min(0, 'Delay cannot be negative'),
});

export type NotificationFormData = z.infer<typeof notificationFormSchema>;