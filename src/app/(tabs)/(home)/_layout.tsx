import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="text-notification"
        options={{
          title: 'Text Notification',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="image-notification"
        options={{
          title: 'Image Notification',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="video-notification"
        options={{
          title: 'Video Notification',
          headerShown: false,
        }}
      />
    </Stack>
  );
}