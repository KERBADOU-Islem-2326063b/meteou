import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Hamburger({ navigation }) {
  const handleVillesClick = () => {
    console.log("Naviguer vers Villes");
    // Logique pour naviguer vers le composant Villes ou afficher les informations
  };

  const handleInformationClick = () => {
    console.log("Naviguer vers Information");
    // Logique pour naviguer vers le composant Information ou afficher les informations
  };

  const handleLogoutClick = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            console.log("Utilisateur déconnecté");
            // Logique de déconnexion
          },
        },
      ]
    );
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.menuItem} onPress={handleVillesClick}>
        <Text style={styles.menuText}>Villes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleInformationClick}>
        <Text style={styles.menuText}>Information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleLogoutClick}>
        <Text style={styles.menuText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#333',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 18,
    color: 'white',
  },
});
