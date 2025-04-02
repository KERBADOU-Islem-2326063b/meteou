import { useEffect } from "react";

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
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,cloud_cover&timezone=Europe/Paris&forecast_days=1`
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
      });
    } catch (error) {
      console.error("Erreur API météo :", error);
      alert("Une erreur est survenue lors de la récupération des données météo.");
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  return null;
}
