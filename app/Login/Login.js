import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import userData from "../../data/data.json";
import { useAuth } from "../Contexts/AuthContext";

export default function Login() {
  const { handleLoginSuccess } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = userData.utilisateur.find(
      (u) => u.user_name === username && u.mdp === password
    );

    if (user) {
      Alert.alert("Succès", "Connexion réussie!", [
        { text: "OK", onPress: () => handleLoginSuccess(true, user.user_name) }
      ]);
    } else {
      Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>MétéOù?</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Identification</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Identifiant</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Connexion" 
            onPress={handleLogin} 
            color="#6562DF"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#555",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },
  buttonContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
});