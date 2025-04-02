import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, DrawerLayoutAndroid, TextInput, Alert } from "react-native";
import Header from "../Header/Header";
import { useAuth } from "../Contexts/AuthContext";
import Graph from "../Graph/Graph";
import Api from "../Api/Api";
import { styles } from "./HomeStyle";

export default function Home() {
  const { selectedCity, setSelectedCity, handleLogout, cities, setCities } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newCity, setNewCity] = useState(""); 
  const [selectedData, setSelectedData] = useState({
    temperature: true,
    precipitations: false,
    nuages: false,
    humidites: false,
  });

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

  const toggleDataSelection = (key) => {
    setSelectedData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddCity = () => {
    if (!newCity.trim()) return;

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=1&language=fr&format=json`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          alert("Ville non trouvée !");
          return;
        }

        setCities((prevCities) => [...prevCities, { [newCity]: {} }]);
        setNewCity("");
        setShowForm(false);
      })
      .catch((error) => console.error("Erreur lors du géocodage :", error));
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

      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ajouter une ville..."
            placeholderTextColor="#ddd"
            value={newCity}
            onChangeText={setNewCity}
          />

          <TouchableOpacity style={styles.validateButton} onPress={handleAddCity}>
            <Text style={styles.validateText}>Valider</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity 
        style={styles.addCityButton} 
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.addCityText}>{showForm ? "✕" : "+"}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Données affichées :</Text>
      {[
        { key: "temperature", label: "Température", color: "#1E90FF" },
        { key: "precipitations", label: "Pluie", color: "#4CAF50" },
        { key: "nuages", label: "Nuages", color: "#FF9800" },
        { key: "humidites", label: "Humidités", color: "#E91E63" },
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
              
              <Api 
                city={selectedCity} 
                onDataReceived={(data) => {
                  if (data?.datasets?.[0]?.data) {
                    const temps = data.datasets[0].data;
                    const currentWeatherData = {
                      temperature: temps[0]?.toFixed(1) || "N/A",
                      precipitation: data.precipitation?.[0]?.toFixed(1) || "0",
                      humidity: data.humidity?.[0] || "N/A",
                      clouds: data.clouds?.[0] || "N/A",
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
                  <Graph data={weatherData} selectedData={selectedData} />
                </>
              )}
              </>
          ) : (
            <Text style={styles.promptText}>
              Bienvenue sur notre application de météo !{'\n\n'}
              Vous pouvez ajouter une ville pour voir ses prévisions.
            </Text>
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}
