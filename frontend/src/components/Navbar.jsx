import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const items = [
    { key: '/', label: 'Inicio', icon: <HomeOutlined /> },
    { key: '/poke-search' , label: 'Busqueda', icon: <SearchOutlined />},
    { key: '/poke-favorites', label: 'Favoritos', icon: <HeartOutlined /> }
  ];

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" style={{ color: 'white', marginRight: '20px', fontWeight: 'bold' }}>
        POKÉDEX
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        onClick={({ key }) => navigate(key)}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default Navbar;