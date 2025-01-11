import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PokemonDetails from './components/pokemon-details/PokemonDetails.jsx';


function App() {
    const [error, toggleError] = useState(false);
    const [pokemonEndpoints, setPokemonEndpoints] = useState([]);


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function catchNames() {
            toggleError(false);

            try {
                // Pokémon lijst met endpoint urls
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`, {signal});
                const basicPokemonList = response.data.results;
                setPokemonEndpoints(basicPokemonList);
                console.log(basicPokemonList);

            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log("Request cancelled:", e.message);
                } else {
                    console.error("Something went wrong", e);
                    toggleError(true);
                }
            }
        }
        catchNames();

        return function cleanup(){
            controller.abort();
        }
    }, []);


  return (
    <div className="page-container">
        <h1>PoKéMoN</h1>
      <h2>Gotta catch em all!</h2>
        {pokemonEndpoints.length > 0 && (
        <ul className="all-pokemon-container">
            {pokemonEndpoints.map((pokemon, index) => (
                <li key={index}>
                <PokemonDetails name={pokemon.name}/>
                </li>
            ))}
        </ul>) }

    </div>
  );
}

export default App;

