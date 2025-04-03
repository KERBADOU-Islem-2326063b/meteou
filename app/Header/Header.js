import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./HeaderStyle";

export default function Header({ onMenuToggle }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuToggle}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Image source={require("./logo.png")} style={styles.logo} />
        <Text style={styles.titleText}>MétéOù?</Text>
      </View>
    </View>
  );
}
