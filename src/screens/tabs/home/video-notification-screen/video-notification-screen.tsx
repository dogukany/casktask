import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { extractYouTubeVideoId, formatTime, getTypeIcon } from "@/lib/utils/notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { styles } from "./video-notification-screen.styles";

export const VideoNotificationScreen = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
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


  const handleBack = () => {
    router.back();
  };

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
        leftElement={
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ThemedText style={styles.backIcon}>←</ThemedText>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification Card */}
        <View style={styles.notificationCard}>
          {/* Header Section */}
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <ThemedText style={styles.iconText}>
                {getTypeIcon(notification.type)}
              </ThemedText>
            </View>
            <View style={styles.cardHeaderText}>
              <ThemedText style={styles.cardTitle}>
                {notification.title}
              </ThemedText>
              <ThemedText style={styles.cardSubtitle}>
                Video Notification • {formatTime(notification.timestamp)}
              </ThemedText>
            </View>
          </View>

          {/* Video Section */}
          {videoId && !videoError && (
            <View style={styles.videoSection}>
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  height={200}
                  play={playing}
                  videoId={videoId}
                  onChangeState={onStateChange}
                  onError={onError}
                />
              </View>
            </View>
          )}

          {/* Video Error or No Video */}
          {(!videoId || videoError) && notification.youtubeUrl && (
            <View style={styles.videoSection}>
              <View style={styles.videoLoadError}>
                <ThemedText style={styles.videoErrorText}>
                  🎥{'\n'}
                  {videoError ? 'Video could not be loaded' : 'Invalid YouTube URL'}
                </ThemedText>
              </View>
            </View>
          )}

          {/* Message Section */}
          {notification.message && (
            <View style={styles.messageSection}>
              <ThemedText style={styles.messageText}>
                {notification.message}
              </ThemedText>
            </View>
          )}

          {/* Meta Information */}
          <View style={styles.metaSection}>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Type:</ThemedText>
              <ThemedText style={styles.metaValue}>
                Video Notification
              </ThemedText>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Received:</ThemedText>
              <ThemedText style={styles.metaValue}>
                {new Date(notification.timestamp).toLocaleString()}
              </ThemedText>
            </View>
            {notification.youtubeUrl && (
              <View style={styles.metaRow}>
                <ThemedText style={styles.metaLabel}>Video URL:</ThemedText>
                <ThemedText style={styles.metaValue} numberOfLines={1}>
                  {notification.youtubeUrl}
                </ThemedText>
              </View>
            )}
            {videoId && (
              <View style={styles.metaRow}>
                <ThemedText style={styles.metaLabel}>Video ID:</ThemedText>
                <ThemedText style={styles.metaValue}>
                  {videoId}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};