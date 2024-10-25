import React from 'react';
import './PokemonDetails.css';

interface PokemonDetailsProps {
  pokemon: any;
  getPokemonImageUrl: (id: number) => string;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, getPokemonImageUrl }) => {
  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img
        src={getPokemonImageUrl(pokemon.id)}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <p>Type(s): {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
      <p>Abilities: {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</p>
      <p>Stats:</p>
      <ul className="stats-list">
        {pokemon.stats.map((stat: any) => (
          <li key={stat.stat.name} className="stat-item">
            <span>
              <strong>
                {stat.stat.name}:</strong> {stat.base_stat}</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
              >
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
