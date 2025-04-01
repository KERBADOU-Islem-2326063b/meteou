import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, DrawerLayoutAndroid, Alert } from "react-native";
import Header from "../Header/Header";
import { useAuth } from "../Contexts/AuthContext";

export default function Home() {
  const { selectedCity, setSelectedCity, handleLogout, cities } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      drawerRef.current?.openDrawer();
    } else {
      drawerRef.current?.closeDrawer();
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui", onPress: () => {
          handleLogout();
        }
      },
    ]);
  };

  const navigationView = () => (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.closeButton} onPress={() => drawerRef.current?.closeDrawer()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Mes villes:</Text>
      {cities && cities.length > 0 ? (
        cities.map((city, index) => {
          const cityName = Object.keys(city)[0];
          const cityCoordinates = city[cityName];

          return (
            <TouchableOpacity
              key={index}
              style={styles.cityItem}
              onPress={() => {
                setSelectedCity(`${cityName} (${cityCoordinates})`);
                drawerRef.current?.closeDrawer();
                setIsMenuOpen(false);
              }}
            >
              <Text style={styles.cityName}>📍 {cityName}</Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.cityPlaceholder}>Ajoutez une ville</Text>
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
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
      onDrawerClose={() => {
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }}
    >
      <View style={styles.container}>
        <Header onMenuToggle={handleMenuToggle} />
        <View style={styles.content}>
          {selectedCity ? (
            <Text style={styles.cityText}>Localisation: {selectedCity}</Text>
          ) : (
            <Text style={styles.promptText}>Bienvenue sur notre application de météo !

            Vous trouvez ici les données météo pour la semaine. De plus, vous pourrez choisir quelle données vous souhaitez afficher à votre guise.
            Il y a également un graphe permettant une meilleur visualisation des données.

            Veuillez vous connecter avant d’ajouter une ville.</Text>
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    marginTop: 20,
    alignItems: "center",
    zIndex: 1,
  },
  cityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  promptText: {
    fontSize: 16,
    color: "gray",
  },
  menu: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(101, 98, 223, 0.95)",
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
  cityItem: {
    paddingVertical: 8,
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
