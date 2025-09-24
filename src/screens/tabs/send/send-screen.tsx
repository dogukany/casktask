import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { NotificationType } from "@/constants/notification";
import {
    NotificationFormData,
    notificationFormSchema,
} from "@/lib/types/validation";
import { useSendNotificationMutation } from "@/service/mutations/notification-mutations";
import { useNotificationPermissionsQuery } from "@/service/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    Linking,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./send-screen.styles";

const NotificationTypeButton = ({
  type,
  title,
  isActive,
  onPress,
}: {
  type: NotificationType;
  title: string;
  isActive: boolean;
  onPress: (type: NotificationType) => void;
}) => (
  <TouchableOpacity
    style={[styles.typeButton, isActive && styles.typeButtonSelected]}
    onPress={() => onPress(type)}
  >
    <ThemedText
      style={[styles.typeButtonText, isActive && styles.typeButtonTextSelected]}
    >
      {title}
    </ThemedText>
  </TouchableOpacity>
);

export const SendScreen = () => {
  const { top } = useSafeAreaInsets();
  const {
    data: fcmToken,
    isError,
    isLoading,
  } = useNotificationPermissionsQuery();

  const sendNotificationMutation = useSendNotificationMutation();

  const form = useForm<NotificationFormData>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      type: NotificationType.TEXT,
      delay: 0,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // FCM token durumunu kontrol et
  const hasValidToken = fcmToken && !isError;
  const canSendNotification = hasValidToken && !isLoading;
  const isSubmitting = sendNotificationMutation.isPending;

  const onSubmit = handleSubmit(async (data: NotificationFormData) => {
    if (!canSendNotification) {
      // Sistem ayarlarına yönlendir
      handleGoToSettings();
      return;
    }

    if (!fcmToken) {
      Alert.alert("Error", "FCM token is required to send notification.");
      return;
    }

    try {
      await sendNotificationMutation.mutateAsync({
        formData: data,
        fcmToken: fcmToken,
      });
      
      Alert.alert("Success", "Notification sent successfully!");
      reset();
    } catch (error) {
      console.error("Error sending notification:", error);
      Alert.alert("Error", "Failed to send notification. Please try again.");
    }
  });

  const handleGoToSettings = async () => {
    await Linking.openSettings();
  };

  return (
    <ThemedView style={[{ flex: 1 }, { paddingTop: top }]}>
      <ScreenHeader
        title="Send"
        subtitle="Send notifications to your devices"
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.form}>
          {/* Notification Type Selection */}
          <View style={styles.section}>
            <ThemedText style={styles.label}>Notification Type</ThemedText>
            <Controller
              name="type"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.typeContainer}>
                  <NotificationTypeButton
                    type={NotificationType.TEXT}
                    title="Text"
                    isActive={value === NotificationType.TEXT}
                    onPress={onChange}
                  />
                  <NotificationTypeButton
                    type={NotificationType.IMAGE}
                    title="Image"
                    isActive={value === NotificationType.IMAGE}
                    onPress={onChange}
                  />
                  <NotificationTypeButton
                    type={NotificationType.VIDEO}
                    title="Video"
                    isActive={value === NotificationType.VIDEO}
                    onPress={onChange}
                  />
                </View>
              )}
            />
          </View>



          {/* Delay Input */}
          <View style={styles.section}>
            <ThemedText style={styles.label}>Delay (miliseconds)</ThemedText>
            <Controller
              name="delay"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.delay && styles.inputError]}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={(text) => onChange(parseInt(text) || 0)}
                  value={value.toString()}
                />
              )}
            />
            {errors.delay && (
              <ThemedText style={styles.errorText}>
                {errors.delay.message}
              </ThemedText>
            )}
          </View>

          {/* Notification Status & Send Button */}
          {isLoading ? (
            <View style={styles.statusContainer}>
              <ThemedText style={styles.statusText}>
                Checking notification permissions...
              </ThemedText>
            </View>
          ) : isError ? (
            <View style={styles.statusContainer}>
              <ThemedText style={styles.errorStatusText}>
                ❌ Notification permissions denied
              </ThemedText>
              <ThemedText style={styles.statusDescription}>
                Notifications are required to send messages to your devices.
              </ThemedText>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={handleGoToSettings}
              >
                <ThemedText style={styles.settingsButtonText}>
                  Go to Settings
                </ThemedText>
              </TouchableOpacity>
            </View>
          ) : !fcmToken ? (
            <View style={styles.statusContainer}>
              <ThemedText style={styles.errorStatusText}>
                ⚠️ No FCM token available
              </ThemedText>
              <ThemedText style={styles.statusDescription}>
                Unable to get notification token. Please try again.
              </ThemedText>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={handleGoToSettings}
              >
                <ThemedText style={styles.settingsButtonText}>
                  Check Permissions
                </ThemedText>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.statusContainer}>
                <ThemedText style={styles.successStatusText}>
                  ✅ Ready to send notifications
                </ThemedText>
                <ThemedText style={styles.statusDescription}>
                  FCM Token: {fcmToken.substring(0, 20)}...
                </ThemedText>
              </View>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (isSubmitting || !canSendNotification) &&
                    styles.sendButtonDisabled,
                ]}
                onPress={onSubmit}
                disabled={isSubmitting || !canSendNotification}
              >
                <ThemedText style={styles.sendButtonText}>
                  {isSubmitting ? "Sending..." : "Send Notification"}
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};
