import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1A202C",
    justifyContent: "space-evenly",
  },
  topInformation: {
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
    alignItems: "center",
    gap: 12,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  loading: {
    flex: 1,
  },
  whiteText: {
    color: "#fff",
  },
  gitHubButton: {
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#2D3748",
    borderColor: "#63B3ED",
  },
  backArrow: {
    position: "absolute",
    top: 30,
    left: 30,
  },
});
