import { API_BASE_URL } from "../config";

export const fetchPokemonList = async (
  limit: number = 20,
  offset: number = 0
) => {
  const response = await fetch(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }
  return response.json();
};

export const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }
  return response.json();
};

export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const fetchPokemonTypes = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    if (!response.ok) {
      throw new Error(`Error fetching Pokémon types: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
    return [];
  }
};
