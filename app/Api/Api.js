import { useEffect, useRef } from "react";

export default function Api({ city, onDataReceived }) {
  const fetchWeather = async (cityName) => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("Ville non trouvée !");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,cloud_cover&timezone=Europe/Paris&forecast_days=7`
      );
      const weatherData = await weatherRes.json();

      if (!weatherData.hourly) {
        alert("Données météo indisponibles !");
        return;
      }

      const { time, temperature_2m, relative_humidity_2m, precipitation, cloud_cover } = weatherData.hourly;

      if (!time || !temperature_2m || !relative_humidity_2m || !precipitation || !cloud_cover) {
        alert("Données météo incomplètes !");
        return;
      }

      // Traitement des données temporelles
      const timeData = {
        days: processDays(time),
        hours: Array.from({ length: 24 }, (_, i) => i),
        allTimes: time // Garder toutes les données temporelles
      };

      const dates = [...new Set(time.map((t) => t.split("T")[0]))];

      onDataReceived({
        labels: time.map((t) => t.split("T")[1]),
        datasets: [
          { data: temperature_2m, strokeWidth: 2, color: () => `rgba(255, 99, 132, 1)` }, // Température
          { data: precipitation, strokeWidth: 2, color: () => `rgba(75, 192, 192, 1)` }, // Précipitations
          { data: cloud_cover, strokeWidth: 2, color: () => `rgba(153, 102, 255, 1)` }, // Nuages
          { data: relative_humidity_2m, strokeWidth: 2, color: () => `rgba(255, 159, 64, 1)` }, // Humidité
        ],
        dates,
        humidity: relative_humidity_2m,
        precipitation,
        clouds: cloud_cover,
        timeData, // Ajout des données temporelles
        temperature: temperature_2m // Ajout des températures pour accès direct
      });
    } catch (error) {
      console.error("Erreur API météo :", error);
      alert("Une erreur est survenue lors de la récupération des données météo.");
    }
  };

  // Fonction pour formater les jours
  const processDays = (timeArray) => {
    const days = new Set();
    const dateFormat = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });

    timeArray.forEach(timeStr => {
      const date = new Date(timeStr);
      const formatted = dateFormat.format(date);
      days.add(formatted);
    });

    return Array.from(days);
  };

  const prevCityRef = useRef();

  useEffect(() => {
    if (city && city !== prevCityRef.current) {
      fetchWeather(city);
      prevCityRef.current = city;
    }
  }, [city]);

  return null;
}
