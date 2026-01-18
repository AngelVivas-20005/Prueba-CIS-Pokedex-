import { useState } from 'react'

const PaginationBar = ({ currentIndex, setCurrentIndex, totalPages }) => {

  const lastPage = (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    };
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentIndex < 25) {
      setCurrentIndex(currentIndex + 1)
    };
  };

  const getPageNumbers = () => {
    let start = Math.max(0, currentIndex - 2);
    let end = Math.min(totalPages - 1, start + 4);

    if (end - start < 4) {
      start = Math.max(0, end - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (

    <div className="fixed bottom-4 left-0 right-0 flex justify-center px-2 z-50">

      {(totalPages > 1) ? (
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



      ) : (

        <>

        </>


      )}
    </div>
  );
}

export default PaginationBar;