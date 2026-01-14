import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para saber qué link marcar como activo

  const items = [
    { key: '/', label: 'Inicio', icon: <HomeOutlined /> },
    { key: '/poke-search', label: 'Búsqueda', icon: <SearchOutlined /> },
    { key: '/poke-favorites', label: 'Favoritos', icon: <HeartOutlined /> }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white rounded-2xl border border-slate-400 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
              alt="Pokebola"
              className="w-8 h-8 group-hover:rotate-360 transition-transform duration-1500"
            />

            <span className="text-xl font-black tracking-tighter text-slate-800">
              POKÉ<span className="text-red-600">DEX</span>
            </span>
          </div>

          <div className="flex gap-1">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all hover:scale-102
                  ${location.pathname === item.key
                    ? 'bg-red-100 text-red-600 border-2 border-red-400'
                    : 'text-slate-600 border hover:bg-gray-200'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
          

        </div>
      </div>
    </nav>
  );
};

export default Navbar;