import React, { useState } from "react";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Graph from "./Graph/Graph";

export default function Connexion() {
  const [logged, setLogged] = useState(true);

  if (logged) {
    //return <Home logMe={setLogged}/>;
    return <Graph logMe={setLogged}/>;
  } 
  else {
    return (
      <Login logMe={setLogged}/>
    );
  }
}