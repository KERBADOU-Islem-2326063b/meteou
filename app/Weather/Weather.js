import {useState} from "react";
import WeatherOptions from "../Header/Hamburger/Information/Information.js";

const WeatherDisplay = () => {
    const [selectedData, setSelectedData] = useState([]);

    return (
        <div>
            <WeatherOptions onselectionchange={setSelectedData}/>
            <h2>Prévision pour "ville":</h2>
            {selectedData.length>0 ? (
                selectedData.map((item)=><p key={item}>Affichage de {item}</p>)
            ) : (
                <p>Aucune donnée sélectionnée</p>
            )}
        </div>
    );
};

export default WeatherDisplay;