import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextProps {
  favorites: { [key: string]: boolean };
  toggleFavorite: (name: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>(
    JSON.parse(localStorage.getItem('favorites') || '{}')
  );

  const toggleFavorite = (name: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = {
        ...prevFavorites,
        [name]: !prevFavorites[name],
      };
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
