import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  notificationItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  notificationTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationTypeEmoji: {
    fontSize: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  notificationTypeLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  imageContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  notificationImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  videoContainer: {
    marginTop: 8,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  videoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
  },
});