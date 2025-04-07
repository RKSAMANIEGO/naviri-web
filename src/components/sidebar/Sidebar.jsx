import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/image/logo-navi.png';
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiMoon, 
  FiSun, 
  FiChevronLeft, 
  FiChevronRight 
} from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedMode = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const menuItems = [
    { name: 'Inicio', path: '/admin/panel', icon: <FiHome /> },
    { name: 'Productos', path: '/admin/panel/products', icon: <FiUsers /> },
    { name: 'Categoria', path: '/admin/panel/categories', icon: <FiSettings /> },
    { name: 'Clientes', path: '/admin/panel/customers', icon: <FiUsers /> },
    { name: 'Comentarios', path: '/admin/panel/comentary', icon: <FiSettings /> },
    { name: 'Blogs', path: '/admin/panel/blogs', icon: <FiSettings /> },
  ];

  return (
    <div className={`h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-55'} 
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg relative`}>
      
      {/* Botón de colapso */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-14 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-lg
                  border-2 border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform"
      >
        {isCollapsed ? (
          <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Logo */}
      <div className="p-4 pb-2">
        <div className="flex justify-center">
          <img src={logo} alt='logo' width='80px' />
        </div>
        <h1 className={`text-x font-bold overflow-hidden transition-all text-center
          ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-full'}
          ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Panel Administrativo
        </h1>
      </div>

      {/* Menú */}
      <nav className="flex-1 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 rounded-lg mb-1 group transition-colors text-xs
              ${location.pathname === item.path 
                ? 'bg-blue-500 text-white' 
                : isDarkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100 text-gray-700'}
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`ml-3 transition-all ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}>
              {item.name}
            </span>
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded
                opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                {item.name}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* Toggle de tema del Sidebar */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? (
            <FiSun className="w-6 h-6 text-yellow-400" />
          ) : (
            <FiMoon className="w-6 h-6 text-gray-600" />
          )}
        </button>
        
        {!isCollapsed && (
          <span className={`text-sm self-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isDarkMode ? 'Oscuro' : 'Claro'}
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
