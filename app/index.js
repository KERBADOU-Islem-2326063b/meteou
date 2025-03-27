import React, { useState } from "react";
import Home from "./Home/Home";
import Login from "./Login/Login";

export default function Connexion() {
  const [logged, setLogged] = useState(false);

  if (logged) {
    return <Home logMe={setLogged}/>;
  } 
  else {
    return (
      <Login logMe={setLogged}/>
    );
  }
}