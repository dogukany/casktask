import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { extractYouTubeVideoId, formatTime, getTypeIcon } from "@/lib/utils/notifications";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { styles } from "./video-notification-screen.styles";

export const VideoNotificationScreen = () => {
  const { top } = useSafeAreaInsets();
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const params = useLocalSearchParams<{
    notification: string;
  }>();

  // Get notification directly from params with error handling
  const notification = useMemo(() => {
    if (!params.notification) return null;
    try {
      return JSON.parse(params.notification);
    } catch (error) {
      console.error('Failed to parse notification:', error);
      return null;
    }
  }, [params.notification]);


  // Extract YouTube video ID
  const videoId = useMemo(() => {
    return notification?.youtubeUrl ? extractYouTubeVideoId(notification.youtubeUrl) : null;
  }, [notification?.youtubeUrl]);




  const onStateChange = (state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  };

  const onError = () => {
    setVideoError(true);
  };

  if (!notification) {
    return (
      <ThemedView style={[styles.container, { paddingTop: top }]}>
        <ThemedText>No notification data</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: top }]}>
      {/* Header */}
      <ScreenHeader
        title="Video Notification"
        subtitle={notification.title}
        showBackButton
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification Card */}
        <ThemedView style={styles.notificationCard}>
          {/* Header Section */}
          <ThemedView style={styles.cardHeader}>
            <ThemedView style={styles.iconContainer}>
              <ThemedText style={styles.iconText}>
                {getTypeIcon(notification.type)}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.cardHeaderText}>
              <ThemedText style={styles.cardTitle}>
                {notification.title}
              </ThemedText>
              <ThemedText style={styles.cardSubtitle}>
                Video Notification • {formatTime(notification.timestamp)}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Video Section */}
          {videoId && !videoError && (
            <ThemedView style={styles.videoSection}>
              <ThemedView style={styles.videoContainer}>
                <YoutubePlayer
                  height={200}
                  play={playing}
                  videoId={videoId}
                  onChangeState={onStateChange}
                  onError={onError}
                />
              </ThemedView>
            </ThemedView>
          )}

          {/* Video Error or No Video */}
          {(!videoId || videoError) && notification.youtubeUrl && (
            <ThemedView style={styles.videoSection}>
              <ThemedView style={styles.videoLoadError}>
                <ThemedText style={styles.videoErrorText}>
                  🎥{'\n'}
                  {videoError ? 'Video could not be loaded' : 'Invalid YouTube URL'}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          )}

          {/* Message Section */}
          {notification.message && (
            <ThemedView style={styles.messageSection}>
              <ThemedText style={styles.messageText}>
                {notification.message}
              </ThemedText>
            </ThemedView>
          )}

          {/* Meta Information */}
          <ThemedView style={styles.metaSection}>
            <ThemedView style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Type:</ThemedText>
              <ThemedText style={styles.metaValue}>
                Video Notification
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Received:</ThemedText>
              <ThemedText style={styles.metaValue}>
                {new Date(notification.timestamp).toLocaleString()}
              </ThemedText>
            </ThemedView>
            {notification.youtubeUrl && (
              <ThemedView style={styles.metaRow}>
                <ThemedText style={styles.metaLabel}>Video URL:</ThemedText>
                <ThemedText style={styles.metaValue} numberOfLines={1}>
                  {notification.youtubeUrl}
                </ThemedText>
              </ThemedView>
            )}
            {videoId && (
              <ThemedView style={styles.metaRow}>
                <ThemedText style={styles.metaLabel}>Video ID:</ThemedText>
                <ThemedText style={styles.metaValue}>
                  {videoId}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};