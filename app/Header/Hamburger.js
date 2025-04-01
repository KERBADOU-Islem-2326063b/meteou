import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from "react-native";
import { useAuth } from "../Contexts/AuthContext";

export default function Hamburger({ onClose, isOpen }) {
  const translateX = useRef(new Animated.Value(-300)).current;
  const { handleLogout, cities } = useAuth();

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!isOpen) onClose();
    });
  }, [isOpen]);

  const handleLogoutClick = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Oui", onPress: () => {
        handleLogout();
      }},
    ]);
  };

  return (
    <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
      <Animated.View style={[styles.overlay, { transform: [{ translateX }] }]}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Mes villes:</Text>
          {cities && cities.length > 0 ? (
            cities.map((city, index) => {
              const cityName = Object.keys(city)[0];
              return (
                <View key={index} style={styles.cityPlaceholder}>
                  <Text style={styles.cityName}>📍 {cityName}</Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.cityPlaceholder}>Aucune ville trouvée</Text>
          )}

          <TouchableOpacity style={styles.addCityButton}>
            <Text style={styles.addCityText}>+</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Informations:</Text>
          <View style={styles.infoPlaceholder} />
          <View style={styles.infoPlaceholder} />
          <View style={styles.infoPlaceholder} />
          <View style={styles.infoPlaceholder} />

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutClick}>
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "75%",
    height: "100%",
    backgroundColor: "rgba(101, 98, 223, 0.95)",
    zIndex: 15,
  },
  menu: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  cityPlaceholder: {
    height: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  cityName: {
    color: "white",
    fontSize: 16,
  },
  addCityButton: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  addCityText: {
    fontSize: 30,
    color: "#6562DF",
    fontWeight: "bold",
  },
  infoPlaceholder: {
    height: 20,
    backgroundColor: "#BBB",
    marginVertical: 5,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#5048E5",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
