import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import userData from "../../data/data.json";

export default function Login({ logMe }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = userData.utilisateur.find(
      (u) => u.user_name === username && u.mdp === password
    );

    if (user) {
      Alert.alert("Succès", "Connexion réussie!", [
        { text: "OK", onPress: () => logMe(true) }
      ]);
    } else {
      Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Connexion</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        style={{ width: "100%", padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: "100%", padding: 10, borderWidth: 1, marginBottom: 20, borderRadius: 5 }}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}