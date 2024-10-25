import React, { useEffect, useState } from 'react';
import PokemonCard from '../../components/Cards/PokemonCard';
import { usePokemons } from '../../hooks/usePokemon';
import { fetchPokemonDetails, getPokemonImageUrl, fetchPokemonTypes } from '../../services/pokeapi/pokemons';
import Modal from '../../components/Globals/Modal';
import './PokemonList.css';
import Button from '../../components/Globals/Button';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import Loader from '../../components/Loader/Loader';
import { useFavorites } from '../../context/FavoritesContext';
import NotFound from '../../assets/not-found.png';

const PokemonList: React.FC = () => {
  const { pokemons, loading, error, nextPageUrl, fetchData } = usePokemons(10);
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [pokemonTypes, setPokemonTypes] = useState<{ name: string }[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(20);

  useEffect(() => {
    const getTypes = async () => {
      const types = await fetchPokemonTypes();
      setPokemonTypes(types);
    };
    getTypes();
  }, []);

  useEffect(() => {
    if (selectedType) {
      const fetchPokemonsByType = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
          const data = await response.json();
          const pokemonsByType = data.pokemon.map((p: any) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
          }));
          setFilteredPokemons(pokemonsByType.slice(0, displayLimit));
        } catch (error) {
          console.error('Error fetching Pokémon by type:', error);
          setFilteredPokemons([]);
        }
      };
      fetchPokemonsByType();
    } else {
      let filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered.slice(0, displayLimit));
    }
  }, [selectedType, displayLimit, pokemons]);

  useEffect(() => {
    if (!selectedType) {
      let filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered.slice(0, displayLimit));
    }
  }, [searchTerm, displayLimit, pokemons, selectedType]);

  const loadMore = () => {
    if (nextPageUrl && !selectedType) {
      const offset = new URL(nextPageUrl).searchParams.get('offset');
      fetchData(Number(offset));
    } else {
      setDisplayLimit((prevLimit) => prevLimit + 20);
    }
  };

  const showPokemonDetails = async (url: string) => {
    setDetailsLoading(true);
    try {
      const details = await fetchPokemonDetails(url);
      setSelectedPokemon(details);
      setModalOpen(true);
    } catch (err) {
      console.error('Error fetching Pokémon details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const filterByType = (type: string) => {
    setSelectedType(type === selectedType ? null : type);
    setDisplayLimit(20);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPokemon(null);
  };

  if (loading && pokemons.length === 0) return <Loader />;
  if (error) return <p>Error loading Pokémon: {error}</p>;

  return (
    <div className='home-items'>
      <div className='poke-filters'>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedType(null);
          }}
          className="search-bar"
        />
        <div className="pokemon-buttons">
          {pokemonTypes.map((type, index) => (
            <button
              key={`${type.name}-${index}`}
              onClick={() => filterByType(type.name)}
              className={`type-button ${selectedType === type.name ? 'selected' : ''}`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
      <div className="pokemon-list">
        {filteredPokemons.length === 0 && !loading && (
          <><p className="no-results">No Pokémon match your search criteria.</p>
          <span className='not-found'>
            <img src={NotFound} alt="Sad Pikachu not found" />
          </span>
          </>
        )}
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard
            key={`${pokemon.name}-${index}`}
            name={pokemon.name}
            url={pokemon.url}
            isFavorite={favorites[pokemon.name] || false}
            onAddFavorite={() => toggleFavorite(pokemon.name)}
            onShowDetails={() => showPokemonDetails(pokemon.url)}
          />
        ))}
        {modalOpen && (
          <Modal onClose={closeModal}>
            {detailsLoading ? (
              <Loader />
            ) : selectedPokemon ? (
              <PokemonDetails pokemon={selectedPokemon} getPokemonImageUrl={getPokemonImageUrl} />
            ) : (
              <p>No details available.</p>
            )}
          </Modal>
        )}
        <div className='loadmore'>
          {(nextPageUrl || displayLimit < filteredPokemons.length) && (
            <Button
              onClick={loadMore}
              disabled={loading}
              label={loading ? 'Loading...' : 'Load More'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
