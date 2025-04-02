import React from "react";
import { View, Dimensions, ScrollView, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Graph({ data }) {
  const screenWidth = Dimensions.get("window").width;
  const hoursPerDay = 24;

  if (!data || !data.labels || !data.datasets || !data.dates) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Données indisponibles</Text>;
  }

  const days = [];
  for (let i = 0; i < data.labels.length; i += hoursPerDay) {
    days.push({
      date: data.dates[Math.floor(i / hoursPerDay)] || "Date inconnue",
      labels: data.labels.slice(i, i + hoursPerDay),
      datasets: [{ data: data.datasets[0].data.slice(i, i + hoursPerDay) }],
    });
  }

  return (
    <View style={{ marginTop: 20 }}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {days.map((dayData, index) => (
          <View key={index} style={{ width: screenWidth, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              {dayData.date}
            </Text>

            <LineChart
              data={dayData}
              width={screenWidth - 40}
              height={220}
              yAxisLabel="°C "
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={{ borderRadius: 10 }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
