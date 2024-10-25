import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokeapi/pokemons';

interface Pokemon {
  name: string;
  url: string;
}

export const usePokemons = (limit: number = 20) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  const fetchData = async (offset: number = 0) => {
    try {
      setLoading(true);
      const data = await fetchPokemonList(limit, offset);
      setPokemons((prev) => [...prev, ...data.results]); 
      setNextPageUrl(data.next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  return { pokemons, loading, error, nextPageUrl, fetchData };
};
