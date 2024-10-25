import { useState, useEffect } from 'react';
import { fetchPokemonDetails } from '../services/pokeapi/pokemons';

export const usePokemonDetails = (url: string) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonDetails(url);
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [url]);

  return { details, loading, error };
};
