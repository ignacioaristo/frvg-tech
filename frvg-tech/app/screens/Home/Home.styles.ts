import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  greayButton: {
    backgroundColor: "#d3d3d3",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  name: {
    padding: 20,
  },
});
