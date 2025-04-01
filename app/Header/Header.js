import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Hamburger from "./Hamburger"; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuToggle} onPress={handleMenuToggle}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.titleText}>MétéOù ?</Text>
        </View>
      </View>

      <Hamburger onClose={() => setIsMenuOpen(false)} isOpen={isMenuOpen} />
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
    fontWeight: "bold",
  },
});
