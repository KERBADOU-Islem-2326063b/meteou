import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import userData from "../../data/data.json";
import { useAuth } from "../Contexts/AuthContext";
import { styles } from "./LoginStyle"; 

export default function Login() {
  const { handleLoginSuccess } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = userData.utilisateur.find(
      (u) => u.user_name === username && u.mdp === password
    );

    if (user) {
      handleLoginSuccess(true, user.user_name);
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