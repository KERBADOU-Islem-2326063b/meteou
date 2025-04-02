import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, DrawerLayoutAndroid, Alert } from "react-native";
import Header from "../Header/Header";
import { useAuth } from "../Contexts/AuthContext";
import Graph from "../Graph/Graph";
import Api from "../Api/Api";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { styles } from "./HomeStyle"; 


export default function Home() {
  const { selectedCity, setSelectedCity, handleLogout, cities } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const drawerRef = useRef(null);
  const [currentWeather, setCurrentWeather] = useState(null);

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
                setSelectedCity(`${cityName}`);
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
              
              <Api 
                city={selectedCity} 
                onDataReceived={(data) => {
                  
                  if (data && data.datasets && data.datasets[0] && data.datasets[0].data) {
                    const temps = data.datasets[0].data;
                    const currentWeatherData = {
                      temperature: temps[0]?.toFixed(1) || "N/A",
                      precipitation: data.precipitation?.[0]?.toFixed(1) || "0",
                      humidity: data.humidity?.[0] || "N/A",
                      clouds: Array.isArray(data.clouds) && data.clouds.length > 0 ? data.clouds[0] : "N/A",

                    };
                    
                    setCurrentWeather(currentWeatherData);
                    setWeatherData(data);
                  }
                  setLoading(false);
                }}
              />

              {loading && <Text style={styles.loadingText}>Chargement...</Text>}
              {!loading && weatherData && (
                <>
                  <View style={styles.weatherSummary}>
                    <Text style={styles.weatherText}>🌡️ Température: {currentWeather?.temperature}°C</Text>
                    <Text style={styles.weatherText}>💧 Humidité: {currentWeather?.humidity}%</Text>
                    <Text style={styles.weatherText}>☁️ Nuages: {currentWeather?.clouds}%</Text>
                    <Text style={styles.weatherText}>🌧️ Précipitations: {currentWeather?.precipitation} mm</Text>
                  </View>
                  <Graph data={weatherData} />
                </>
              )}
              {!loading && !weatherData && (
                <Text style={styles.errorText}>Aucune donnée disponible.</Text>
              )}
              </>
          ) : (
            <Text style={styles.promptText}>
              Bienvenue sur notre application de météo !{'\n\n'}
              Vous trouvez ici les données météo pour la semaine. De plus, vous pourrez choisir 
              quelle données vous souhaitez afficher à votre guise.{'\n\n'}
              Il y a également un graphe permettant une meilleure visualisation des données.
            </Text>
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );

}

