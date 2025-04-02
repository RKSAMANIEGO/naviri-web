import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiMoon, FiSun, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  const menuItems = [
    { name: 'Inicio', path: '/admin/panel', icon: <FiHome /> },
    { name: 'Usuarios', path: '/admin/panel/products', icon: <FiUsers /> },
    { name: 'Configuración', path: '/admin/panel/customers', icon: <FiSettings /> },
  ];

  return (
    <div className={`h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} 
      bg-white dark:bg-gray-800 shadow-lg relative`}>
      
      {/* Botón de colapso */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-lg
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
        <h1 className={`text-xl font-bold overflow-hidden transition-all 
          ${isCollapsed ? 'text-center opacity-0 w-0' : 'opacity-100 w-full'}
          text-gray-800 dark:text-white`}>
          MiApp
        </h1>
      </div>

      {/* Menú */}
      <nav className="flex-1 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 rounded-lg mb-1 group transition-colors
              ${location.pathname === item.path 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}
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

      {/* Toggle de tema */}
      <div className={`p-4 border-t border-gray-200 dark:border-gray-700 flex ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
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
          <span className="text-sm text-gray-600 dark:text-gray-400 self-center">
            {isDarkMode ? 'Oscuro' : 'Claro'}
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;