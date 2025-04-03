import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6562DF",
    padding: 15,
    position: "relative", 
  },
  menuButton: {
    zIndex: 10, 
  },
  menuText: {
    fontSize: 30,
    color: "white",
  },
  titleContainer: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
});

export default styles;