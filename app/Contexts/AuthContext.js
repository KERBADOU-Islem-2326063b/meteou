import React, { createContext, useState, useContext } from "react";
import userData from "../../data/data.json";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [cities, setCities] = useState([]);

  const handleLoginSuccess = (status, loggedInUsername) => {
    setLogged(status);
    setUsername(loggedInUsername);

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
    <AuthContext.Provider value={{ logged, username, cities, handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
