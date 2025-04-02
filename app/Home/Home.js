import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, DrawerLayoutAndroid, Alert } from "react-native";
import Header from "../Header/Header";
import { useAuth } from "../Contexts/AuthContext";
import Graph from "../Graph/Graph";
import Api from "../Api/Api";
import { styles } from "./HomeStyle"; 

export default function Home() {
  const { selectedCity, setSelectedCity, handleLogout, cities } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({
    temperature: true,
    rain: false,
    cloudCover: false,
    precipitationProbability: false,
  });

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
        text: "Oui",
        onPress: () => {
          handleLogout();
        },
      },
    ]);
  };

  const toggleDataSelection = (key) => {
    setSelectedData((prev) => ({ ...prev, [key]: !prev[key] }));
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

          return (
            <TouchableOpacity
              key={index}
              style={styles.cityItem}
              onPress={() => {
                setSelectedCity(cityName);
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

      <Text style={styles.sectionTitle}>Données affichées :</Text>
      {[
        { key: "temperature", label: "Température", color: "#1E90FF" },
        { key: "rain", label: "Pluie", color: "#4CAF50" },
        { key: "cloudCover", label: "Nuages", color: "#FF9800" },
        { key: "precipitationProbability", label: "Probabilité précip.", color: "#E91E63" },
      ].map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[
            styles.dataButton,
            { backgroundColor: selectedData[item.key] ? item.color : "#ddd" },
          ]}
          onPress={() => toggleDataSelection(item.key)}
        >
          <Text style={{ color: selectedData[item.key] ? "#fff" : "#000" }}>{item.label}</Text>
        </TouchableOpacity>
      ))}

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
            <>
              <Text style={styles.cityText}>Localisation: {selectedCity}</Text>
              
              <Api city={selectedCity} onDataReceived={(data) => {
                setWeatherData(data);
                setLoading(false);
              }} />

              {loading ? (
                <Text style={styles.loadingText}>Chargement des données météo...</Text>
              ) : weatherData ? (
                <Graph data={weatherData} selectedData={selectedData} />
              ) : (
                <Text style={styles.errorText}>Aucune donnée disponible.</Text>
              )}
            </>
          ) : (
            <Text style={styles.promptText}>
              Bienvenue sur notre application de météo !{'\n\n'}
              Vous pouvez choisir quelles données afficher en ouvrant le menu et en sélectionnant les types de données.{'\n\n'}
              Un graphe vous permettra une meilleure visualisation.
            </Text>
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}
