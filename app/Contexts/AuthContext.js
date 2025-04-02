import React, { createContext, useState, useContext } from "react";
import userData from "../../data/data.json";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Fonction pour ajouter une ville
  const addCity = (newCity) => {
    // Vérification que la ville n'est pas vide et qu'elle n'est pas déjà ajoutée
    if (!newCity || cities.some((city) => Object.keys(city)[0] === newCity)) {
      alert("Cette ville est déjà ajoutée ou invalide !");
      return;
    }

    // Ajout de la ville avec un objet pour les données météo plus tard
    setCities((prevCities) => [...prevCities, { [newCity]: { weatherData: null } }]);
  };

  const handleLoginSuccess = (status, loggedInUsername) => {
    setLogged(status);
    setUsername(loggedInUsername);

    // Charger les villes de l'utilisateur
    const currentUser = userData.utilisateur.find(
      (user) => user.user_name === loggedInUsername
    );
    setCities(currentUser ? currentUser.ville : []);
  };

  const handleLogout = () => {
    setLogged(false);
    setUsername("");
    setCities([]);
  };

  return (
    <AuthContext.Provider value={{ logged, username, cities, setCities, selectedCity, setSelectedCity, addCity, handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
