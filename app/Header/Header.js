import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({ onMenuToggle }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuToggle} onPress={onMenuToggle}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>MétéOù?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6562DF",
    padding: 15,
  },
  menuText: {
    fontSize: 30,
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
    fontWeight: "bold",
  },
});
