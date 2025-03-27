import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Hamburger from "./Hamburger";  // Assure-toi que le chemin d'importation est correct

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);  // Inverse l'état pour ouvrir/fermer le menu
  };

  return (
    <View style={styles.header}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuToggle} onPress={handleMenuToggle}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>MétéOù ?</Text>
      </View>

      {/* Afficher ou masquer le menu hamburger en fonction de isMenuOpen */}
      {isMenuOpen && <Hamburger />}
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
