import { useState } from 'react'

import { Card, Button } from 'antd';
import { HeartOutlined, HeartFilled, SwapOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokeFavoritesContext } from '../context/PokeContextFavorites';

const PaginationBar = ({ pokemon }) => {

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center px-2 z-50">
      <div className="flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-slate-300 shadow-lg max-w-full overflow-x-auto no-scrollbar">

        <button
          onClick={lastPage}
          disabled={currentIndex === 0}
          className="px-3 sm:px-4 py-2 bg-white border rounded-lg text-sm font-bold disabled:opacity-30 transition-colors text-slate-600 hover:bg-gray-200 flex items-center justify-center"
        >

          <span className="sm:hidden">←</span>

          <span className="hidden sm:block">Anterior</span>
        </button>

        <div className="flex gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentIndex(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-bold transition-all ${currentIndex === page
                ? 'bg-red-100 text-red-600 border border-red-300'
                : 'text-slate-600 border hover:bg-gray-100'
                }`}
            >
              {page + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentIndex === 25}
          className="px-3 sm:px-4 py-2 bg-white border rounded-lg text-sm font-bold disabled:opacity-30 transition-colors text-slate-600 hover:bg-gray-200 flex items-center justify-center"
        >
          <span className="sm:hidden">→</span>
          <span className="hidden sm:block">Siguiente</span>
        </button>
      </div>
    </div>
  );
}

export default PaginationBar;