import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#1A202C",
  },
  flatListContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexGrow: 1,
  },
  columnWrapperStyle: {
    gap: 12,
    marginBottom: 12,
  },
  userButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D3748",
    borderColor: "#63B3ED",
    height: 150,
    borderWidth: 2,
    borderRadius: 10,
  },
  greayButton: {
    backgroundColor: "#d3d3d3",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  name: {
    paddingTop: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  favouriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
