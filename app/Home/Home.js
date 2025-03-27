import React from "react";
import { View, Text, Button } from "react-native";
import MockHamburger from "../Header/Hamburger/MockHamburger";

export default function Home({ username, onLogout }) {
  // mock hamburger
  const [selectedData, setSelectedData] = useState([]);

  const handleSelect = (item) => {
    setSelectedData((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    /*
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenue à la HomePage, {username}</Text>
      <Button title="Se déconnecter" onPress={onLogout} />
    </View>*/

    <View style={{ flex: 1 }}>
    <MockMenu onSelect={handleSelect} /> {/* Affiche le menu temporaire */}

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenue, {username}</Text>
      <Button title="Se déconnecter" onPress={onLogout} />

      <Text>Affichage des données sélectionnées :</Text>
      {selectedData.length > 0 ? (
        selectedData.map((item) => <Text key={item}>📊 {item}</Text>)
      ) : (
        <Text>Aucune donnée sélectionnée</Text>
      )}
    </View>
  </View>
  );
}