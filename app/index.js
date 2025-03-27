import React, { useState } from "react";
import Home from "./Home/Home";
import Login from "./Login/Login";

export default function Index() {
  const [logged, setLogged] = useState(true); //remettre false apres les tests
  const [username, setUsername] = useState("Utilisateur test");

  const handleLoginSuccess = (status, loggedInUsername) => {
    setLogged(status);
    setUsername(loggedInUsername);
  };

  const handleLogout = (status) => {
    setLogged(status);
    setUsername("");
  };

  if (logged) {
    return <Home username={username} onLogout={() => handleLogout(false)}/>; 
  }
  else {
    return (
      <Login onLoginSuccess={handleLoginSuccess}/> 
    );
  }
}