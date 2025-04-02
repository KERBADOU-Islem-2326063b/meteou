import React, { useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Graph({ data, selectedData }) {
  const screenWidth = Dimensions.get("window").width;
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  if (!data || !data.labels || !data.datasets || !data.dates) {
    return <Text>Chargement des données...</Text>;
  }

  const hoursPerDay = 24;
  const interval = 2;

  const legend = [
    { key: "temperature", label: "Température", color: "#1E90FF" },
    { key: "rain", label: "Pluie", color: "#4CAF50" },
    { key: "cloudCover", label: "Nuages", color: "#FF9800" },
    { key: "precipitationProbability", label: "Probabilité précip.", color: "#E91E63" },
  ];

  const getDayData = (dayIndex) => {
    const startIndex = dayIndex * hoursPerDay;
    const endIndex = startIndex + hoursPerDay;
    
    const filteredLabels = data.labels.slice(startIndex, endIndex).filter((_, i) => i % interval === 0);
    let datasets = [];

    if (selectedData.temperature) {
      datasets.push({ data: data.datasets[0].data.slice(startIndex, endIndex).filter((_, i) => i % interval === 0), color: () => `#1E90FF` });
    }
    if (selectedData.rain) {
      datasets.push({ data: data.datasets[1].data.slice(startIndex, endIndex).filter((_, i) => i % interval === 0), color: () => `#4CAF50` });
    }
    if (selectedData.cloudCover) {
      datasets.push({ data: data.datasets[2].data.slice(startIndex, endIndex).filter((_, i) => i % interval === 0), color: () => `#FF9800` });
    }
    if (selectedData.precipitationProbability) {
      datasets.push({ data: data.datasets[3].data.slice(startIndex, endIndex).filter((_, i) => i % interval === 0), color: () => `#E91E63` });
    }

    if (datasets.length === 0) {
      datasets = [{ data: new Array(filteredLabels.length).fill(0), color: () => `rgba(200, 200, 200, 1)` }];
    }

    return {
      labels: filteredLabels.map((label) => `${parseInt(label.split(":")[0], 10)}h`),
      datasets,
    };
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#1E90FF",
    },
    yAxisLabel: "°C",
    yAxisMin: -10,
    yAxisMax: 40,
    yAxisInterval: 5,
    style: {
      borderRadius: 10,
    },
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        {data.dates[selectedDateIndex] || "Date inconnue"}
      </Text>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setSelectedDateIndex(index);
        }}
        style={{ width: screenWidth }}
      >
        {data.dates.map((date, index) => {
          const dayData = getDayData(index);
          return (
            <View key={index} style={{ width: screenWidth }}>
              <LineChart
                data={dayData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{ borderRadius: 10 }}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {legend.map((item) => (
          selectedData[item.key] && (
            <View key={item.key} style={{ flexDirection: "row", alignItems: "center", marginRight: 10, marginBottom: 5 }}>
              <View style={{ width: 10, height: 10, backgroundColor: item.color, marginRight: 5 }} />
              <Text>{item.label}</Text>            
            </View>
          )
        ))}
      </View>

    </View>
  );
}
