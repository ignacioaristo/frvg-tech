import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  topInformation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  heartIcon: {
    position: "absolute",
    top: 30,
    right: 30,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
  bottomInformation: {
    flex: 1,
    alignItems: "center",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  loading: {
    flex: 1,
  },
});
