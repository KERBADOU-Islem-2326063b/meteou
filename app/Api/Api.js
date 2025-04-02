import { useEffect } from "react";

export default function Api({ city, onDataReceived }) {
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        alert("Ville non trouvée !");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      const weatherRes = await fetch(

        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,cloud_cover&timezone=Europe/Paris&forecast_days=1`

      );
      const weatherData = await weatherRes.json();

      const temps = weatherData.hourly.time;
      const temperatures = weatherData.hourly.temperature_2m;

      const humidites = weatherData.hourly.relative_humidity_2m;
      const precipitations = weatherData.hourly.precipitation;
      const nuages = weatherData.hourly.cloud_cover;

      const dates = [...new Set(temps.map((t) => t.split("T")[0]))];

      onDataReceived({
        labels: temps.map((t) => t.split("T")[1]), 
        datasets: [
          { data: temperatures, strokeWidth: 2, color: () => `rgba(255, 99, 132, 1)` }, 
          { data: precipitations, strokeWidth: 2, color: () => `rgba(75, 192, 192, 1)` }, 
          { data: nuages, strokeWidth: 2, color: () => `rgba(153, 102, 255, 1)` }, 
          { data: humidites, strokeWidth: 2, color: () => `rgba(255, 159, 64, 1)` }, 
        ],
        dates,
        humidity: humidites, 
        precipitation: precipitations,  
        clouds: nuages,  
      });
    } catch (error) {
      console.error("Erreur API météo :", error);
    }
  };

  return null;
}
