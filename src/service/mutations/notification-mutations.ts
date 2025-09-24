import { NotificationFormData } from "@/lib/types/validation";
import { useMutation } from "@tanstack/react-query";

type SendNotificationRequest = {
  formData: NotificationFormData;
  fcmToken: string;
};

type ApiNotificationPayload = {
  v: number;
  platform: string;
  admmdlid: string;
  scope: string;
  fcm_token: string;
  pn_type: number;
  pn_delay: number;
};

export const useSendNotificationMutation = () => {
  return useMutation({
    mutationKey: ["send-notification"],
    mutationFn: async ({ formData, fcmToken }: SendNotificationRequest) => {
      const payload: ApiNotificationPayload = {
        v: 1,
        platform: "app",
        admmdlid: "12f3894ed72fc7d4e3b98688b20513e20a3fa1adbd08b9662412322138d26533",
        scope: "8fbff85cb7a2b8cbd53b3086c0b16d4c1e96a5d748cbf8761bace32ab294e83a",
        fcm_token: fcmToken,
        pn_type: formData.type,
        pn_delay: formData.delay,
      };

      const response = await fetch("https://challenges.cask.com.tr/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send notification: ${errorText}`);
      }

      return response.json();
    },
  });
};
