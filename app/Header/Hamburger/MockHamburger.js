import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function MockHamburger({ onSelect }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ position: "absolute", top: 50, left: 10, backgroundColor: "white", padding: 10, borderRadius: 5 }}>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text style={{ fontSize: 18 }}>☰ Menu</Text>
      </TouchableOpacity>

      {visible && (
        <View>
          <TouchableOpacity onPress={() => onSelect("temperature")}>
            <Text>🌡 Température</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelect("pluie")}>
            <Text>☔ Pluie</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelect("hydrometrie")}>
            <Text>💨 Vent</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
