import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuToggle}
          onPress={() => navigation.openDrawer()} // Ouvre le drawer lorsqu'on clique sur le menu
        >
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>MétéOù ?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
  },
  menuContainer: {
    paddingLeft: 10,
  },
  menuToggle: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
    color: "white",
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    color: "white",
  },
});
