import React from "react";
import { View, Text, Button } from "react-native";

export default function Home({ username, onLogout }) {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bienvenue</Text>
      <Button title="Se déconnecter" onPress={onLogout} />
    </View>
  );
}