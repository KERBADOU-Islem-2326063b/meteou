import {useState} from "react";

const WeatherOptions = ({onselectionchange}) => {
    const mockOptions = [
        {id: "temperature", label: "Température"},
        {id: "pluie", label: "Pluie"},
        {id: "hydrometrie", label: "Hydrométrie"},
        {id: "couverture", label: "Couverture nuageuse"}
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleToggle = (optionId) => {
        const updatedSelection = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id=>id!==optionId)
        : [...selectedOptions,optionId];

        setSelectedOptions(updatedSelection);
        onselectionchange(updatedSelection);
    };

    return(
        <div>
            <h3>Informations</h3>
            {mockOptions.map(option => (
                <label key={option.id}>
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        onChange={()=>handleToggle(option.id)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default WeatherOptions;

