import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { handleIncomingNotification } from "@/lib/utils/notifications";
import { firebaseMessaging } from "@/service/firebase";
import queryClient from "@/service/query-client";
import { onMessage, setBackgroundMessageHandler } from "@react-native-firebase/messaging";
import { QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "react-native";

// FCM arka planda mesaj dinleme
setBackgroundMessageHandler(firebaseMessaging, async (remoteMessage) => {
    handleIncomingNotification(remoteMessage);
});

// FCM ön planda mesaj dinleme
onMessage(firebaseMessaging, (remoteMessage) => {
    handleIncomingNotification(remoteMessage);
}); 

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
