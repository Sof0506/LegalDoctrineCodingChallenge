import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"; // Import arrow icons
import { FaSearch } from "react-icons/fa";
import { PiHeartbeatBold } from "react-icons/pi";
import Header from "../components/Header";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [threshold, setThreshold] = useState(""); // For searching by power threshold
  const [minPower, setMinPower] = useState(null); // Minimum power
  const [maxPower, setMaxPower] = useState(null); // Maximum power

  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch Pokémon data from your JSON file (or an API) here
    fetch("/public/pokemon.json") // Make sure this path is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response Error !");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    // Function to calculate and set min and max power values
    const updateMinMaxPower = () => {
      const currentItems = pokemonData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      if (currentItems.length > 0) {
        const powers = currentItems.map((pokemon) =>
          pokemon.hp +
          pokemon.attack +
          pokemon.defense +
          pokemon.special_attack +
          pokemon.special_defense +
          pokemon.speed
        );
        setMinPower(Math.min(...powers));
        setMaxPower(Math.max(...powers));
      } else {
        setMinPower(null);
        setMaxPower(null);
      }
    };

    updateMinMaxPower();
  }, [currentPage, pokemonData]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  // Filter Pokemon data based on search term
  const filteredPokemon = pokemonData.filter((pokemon) => {
    const power =
      pokemon.hp +
      pokemon.attack +
      pokemon.defense +
      pokemon.special_attack +
      pokemon.special_defense +
      pokemon.speed;

    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (threshold === "" || power >= parseInt(threshold))
    );
  });

  // Get the current items to display based on pagination
  const currentItems = filteredPokemon.slice(firstItemIndex, lastItemIndex);

  const nextPage = () => {
    if (lastItemIndex < filteredPokemon.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="src/index.css" />
      <Header/>
      <h1>Legal Doctrine <span>Coding Challenge</span> </h1>
      <div className="Conteneur">
      <div className="SearchFields">
        <div className="search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by Pokemon name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="threshold">
          <PiHeartbeatBold />
          <input
            type="text"
            placeholder="Search by Power Threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
        </div>
      </div>
      {/* Display Min and Max Power */}
      <div className="power_labels">
        <label>
          Min Power: {minPower !== null ? minPower : "N/A"}
        </label>
        <br />
        <br />
        <label>
          Max Power: {maxPower !== null ? maxPower : "N/A"}
        </label>
      </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Hp</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Special attack</th>
            <th>Special defense</th>
            <th>Speed</th>
            <th>Power</th> {/* Added column for Power */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td>{pokemon.hp}</td>
              <td>{pokemon.attack}</td>
              <td>{pokemon.defense}</td>
              <td>{pokemon.special_attack}</td>
              <td>{pokemon.special_defense}</td>
              <td>{pokemon.speed}</td>
              <td>
                {
                  // Calculate and display the Power
                  pokemon.hp +
                  pokemon.attack +
                  pokemon.defense +
                  pokemon.special_attack +
                  pokemon.special_defense +
                  pokemon.speed
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={prevPage}>
            <BsChevronCompactLeft /> {/* Left arrow icon */}
          </button>
        )}
        {lastItemIndex < filteredPokemon.length && (
          <button onClick={nextPage}>
            <BsChevronCompactRight /> {/* Right arrow icon */}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
