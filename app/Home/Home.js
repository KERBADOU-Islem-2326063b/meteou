import React from "react";
import { View, Text, Button } from "react-native";

export default function Home({ username, onLogout }) {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenue à la HomePage, {username}</Text>
      <Button title="Se déconnecter" onPress={onLogout} />
    </View>
  );
}