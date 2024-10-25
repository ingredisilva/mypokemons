import React from 'react';
import PokemonCard from '../../components/Cards/PokemonCard';
import './Favorites.css';
import { useFavorites } from '../../context/FavoritesContext';
import { usePokemons } from '../../hooks/usePokemon';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { pokemons } = usePokemons();

  const favoritePokemons = pokemons?.filter((pokemon) => favorites[pokemon.name]);

  if (favoritePokemons?.length === 0) {
    return <p>No favorites yet. Start adding some Pokémon!</p>;
  }

  return (
    <div className="favorites-list">
      <h2>Your Favorite Pokémon</h2>
      <div className="favorite-pokemons">
        {favoritePokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
            isFavorite={true}
            onAddFavorite={() => toggleFavorite(pokemon.name)}
            onShowDetails={() => console.log(`Showing details for ${pokemon.name}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
