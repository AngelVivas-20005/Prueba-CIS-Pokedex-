import './App.css';

import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokeFavoritesProvider } from './context/PokeContextFavorites';

import PokeHome from './pages/PokeHome';
import PokeData from './pages/PokeData';
import PokeFavorites from './pages/PokeFavorites';
import PokeSearch from './pages/PokeRegexSearch';
import Navbar from './components/Navbar'

function App() {

  return (
    
    <PokeFavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<PokeHome />} />
          <Route path="/poke-data/:id" element={<PokeData />} />
          <Route path="/poke-favorites" element={<PokeFavorites />} />
          <Route path="/poke-search" element={<PokeSearch />} />

        </Routes>

      </BrowserRouter>
    </PokeFavoritesProvider>
  );

}

export default App
