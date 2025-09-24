import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.8,
  },
  welcomeDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 26,
    opacity: 0.7,
    width: "100%",
    paddingHorizontal: 32,
  },
});

