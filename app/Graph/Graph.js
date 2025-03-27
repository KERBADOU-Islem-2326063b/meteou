import React from "react";
import { View } from "react-native";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Graph() {

  const data = {
    labels: ["27/03 17h", "27/03 18h", "27/03 19h", "27/03 20h", "27/03 21h"], //crénaux : date et horaire
    datasets: [
      {
        label: "Température",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        display: true,
        position: 'bottom'
       },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Line data={data} options={options} />
    </View>

  );
}
