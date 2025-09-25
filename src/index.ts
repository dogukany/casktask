import "expo-router/entry";

import { onMessage, setBackgroundMessageHandler } from "@react-native-firebase/messaging";
import { handleIncomingNotification } from "./lib/utils/notifications";
import { firebaseMessaging } from "./service/firebase";

setBackgroundMessageHandler(firebaseMessaging, async (remoteMessage) => {
  handleIncomingNotification(remoteMessage);
});

onMessage(firebaseMessaging, (remoteMessage) => {
  handleIncomingNotification(remoteMessage);
});
