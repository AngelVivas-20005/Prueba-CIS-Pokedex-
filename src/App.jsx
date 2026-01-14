import './App.css';
import './index.css';

import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokeFavoritesProvider } from './context/PokeContextFavorites';

import PokeHome from './pages/PokeHome';
import PokeData from './pages/PokeData';
import PokeFavorites from './pages/PokeFavorites';
import Navbar from './components/Navbar'

function App() {

  return (

    <PokeFavoritesProvider>
      <BrowserRouter>
        <Navbar />

        <div className="min-h-screen flex flex-col">


          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<PokeHome />} />
              <Route path="/poke-data/:id" element={<PokeData />} />
              <Route path="/poke-favorites" element={<PokeFavorites />} />
            </Routes>
          </main>

        </div>

        <footer className="text-center py-6 text-slate-500 text-sm">
          Pokédex App - Prueba Técnica {new Date().getFullYear()}
        </footer>

      </BrowserRouter>
    </PokeFavoritesProvider>
  );

}

export default App;
