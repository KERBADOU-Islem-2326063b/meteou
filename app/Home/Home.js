import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, DrawerLayoutAndroid, TextInput, Alert, ActivityIndicator, StyleSheet, Switch } from "react-native";
import Slider from '@react-native-community/slider';
import Header from "../Header/Header";
import { useAuth } from "../Contexts/AuthContext";
import Graph from "../Graph/Graph";
import Api from "../Api/Api";
import { styles } from "./HomeStyle";

export default function Home() {
  const { selectedCity, setSelectedCity, handleLogout, cities, setCities } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [selectedData, setSelectedData] = useState({
    temperature: true,
    precipitations: false,
    nuages: false,
    humidites: false,
  });

  const [showGraph, setShowGraph] = useState(false); 

  const drawerRef = useRef(null);
  const [weatherState, setWeatherState] = useState({
    currentWeather: null,
    weatherData: null,
    timeData: null,
  });
  const [timeRange, setTimeRange] = useState({
    day: 0,
    hour: new Date().getHours(),
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackIntervalRef = useRef(null);
  const playbackSpeed = 2500;

  useEffect(() => {
    if (isMenuOpen) {
      drawerRef.current?.openDrawer();
    } else {
      drawerRef.current?.closeDrawer();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    } else {
      playbackIntervalRef.current = setInterval(() => {
        setTimeRange(prev => {
          const newHour = prev.hour + 1;
          if (newHour >= 24) {
            const newDay = prev.day + 1;
            if (newDay >= weatherState.timeData.days.length) {
              clearInterval(playbackIntervalRef.current);
              playbackIntervalRef.current = null;
              setIsPlaying(false);
              return { day: 0, hour: 0 };
            }
            return { day: newDay, hour: 0 };
          }
          return { day: prev.day, hour: newHour };
        });
      }, playbackSpeed);
    }
    setIsPlaying(!isPlaying);
  };

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

    setLoading(true);
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=1&language=fr&format=json`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          alert("Ville non trouvée !");
          setLoading(false);
          return;
        }

        setCities((prevCities) => [...prevCities, { [newCity]: {} }]);
        setNewCity("");
        setShowForm(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du géocodage :", error);
        setLoading(false);
      });
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

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSliderChange = useCallback(debounce((value) => {
    setLoading(true);
    const day = Math.floor(value / 24);
    const hour = Math.floor(value % 24);
    setTimeRange({ day, hour });

    const index = day * 24 + hour;
    const currentWeatherData = {
      temperature: weatherState.weatherData.temperature?.[index]?.toFixed(1) || "N/A",
      precipitation: weatherState.weatherData.precipitation?.[index]?.toFixed(1) || "0",
      humidity: weatherState.weatherData.humidity?.[index] || "N/A",
      clouds: weatherState.weatherData.clouds?.[index] || "N/A",
    };
    setWeatherState((prev) => ({ ...prev, currentWeather: currentWeatherData }));
    setLoading(false);
  }, 200), [weatherState.weatherData]);

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

                    setWeatherState({
                      currentWeather: currentWeatherData,
                      weatherData: data,
                      timeData: data.timeData,
                    });
                  }
                  setLoading(false);
                }}
              />

              {loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={styles.loadingText}>Chargement...</Text>
                </View>
              )}
              {!loading && weatherState.weatherData && weatherState.timeData && (
                <>
                  <View style={styles.weatherSummary}>
                    <Text style={styles.weatherText}>🌡️ Température: {weatherState.currentWeather?.temperature}°C</Text>
                    <Text style={styles.weatherText}>💧 Humidité: {weatherState.currentWeather?.humidity}%</Text>
                    <Text style={styles.weatherText}>☁️ Nuages: {weatherState.currentWeather?.clouds}%</Text>
                    <Text style={styles.weatherText}>🌧️ Précipitations: {weatherState.currentWeather?.precipitation} mm</Text>
                  </View>

                  <View style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>
                      Jour: {weatherState.timeData.days[timeRange.day]} | Heure: {timeRange.hour}:00
                    </Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={weatherState.timeData.days.length * 24 - 1}
                      step={1}
                      value={timeRange.day * 24 + timeRange.hour}
                      onValueChange={handleSliderChange}
                      minimumTrackTintColor="#1E90FF"
                      maximumTrackTintColor="#ddd"
                      thumbTintColor="#1E90FF"
                    />
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => {
                        setLoading(true);
                        togglePlayback();
                        setLoading(false);
                      }}
                    >
                      <Text style={styles.playButtonText}>
                        {isPlaying ? '⏸ Pause' : '▶️ Lecture'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Switch
                      value={showGraph}
                      onValueChange={setShowGraph}
                    />
                    <Text style={{ marginLeft: 8 }}>Afficher le graphique</Text>
                  </View>

                  {showGraph && (
                    <Graph data={weatherState.weatherData} selectedData={selectedData} />
                  )}
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
      {loading && <View style={styles.blurOverlay} />}
    </DrawerLayoutAndroid>
  );
}
