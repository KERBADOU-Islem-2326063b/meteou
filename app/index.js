import React from "react";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import Home from "./Home/Home";
import Login from "./Login/Login";

export default function Index() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}

function AuthContent() {
  const { logged, username, handleLoginSuccess } = useAuth();

  return logged ? (
    <Home username={username} />
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}
