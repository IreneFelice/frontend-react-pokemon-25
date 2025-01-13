import './PokemonDetail.css';
import axios from "axios";
import {useEffect, useState} from "react";

function PokemonDetails({name}) {
    // error useState
    const [pokemonData, setPokemonData] = useState({});
    const namePretty = name.charAt(0).toUpperCase() + name.slice(1);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function catchPokemon() {
            // reset error
            try {
                // const response = await axios.get(`${url}`);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, {signal});
                console.log(response.data);
                setPokemonData(response.data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log("Request cancelled:", e.message);
                } else {
                    console.error("Something went wrong", e);
                    //     error toggle
                }
            }
        }

        catchPokemon();

        return function cleanup() {
            controller.abort();
        };
    }, [name]);


    return (
        <section className="single-pokemon-container">
            <h3>{namePretty}</h3>

            <div>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
                    alt={pokemonData.name}/>
            </div>

                <p className="bold">Moves: <span className="normal">{pokemonData.moves ? pokemonData.moves.length : 'Loading...'}</span></p>
                <p className="bold">Weigth: <span className="normal">{pokemonData.weight}</span></p>

           <div className="abilities-container">
            <p className="bold">Abilities:</p>
            <ul> {pokemonData.abilities && pokemonData.abilities.map((abilityObj, index) => (
                <li key={index}>{abilityObj.ability.name}</li>
            ))}
            </ul>
        </div>
        </section>
    )
}

export default PokemonDetails;