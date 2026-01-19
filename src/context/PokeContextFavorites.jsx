import { useState, useEffect, createContext } from 'react';

export const PokeFavoritesContext = createContext();

export const PokeFavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('poke_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('poke_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    if (!favorites.some(fav => fav.id === pokemon.id)) {
      setFavorites([...favorites, pokemon]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };
  
  return (
    <PokeFavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </PokeFavoritesContext.Provider>
  );
};