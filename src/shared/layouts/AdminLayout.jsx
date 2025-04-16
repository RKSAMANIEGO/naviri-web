import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../shared/components/Sidebar/Sidebar';
import UserSettings from "../../components/AdminPanel/AdminConfi";

const AdminLayout = () => { 
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <div className="flex h-screen">
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 flex flex-col overflow-hidden">

        <header className={`sticky top-0 h-14 z-10 duration-300
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="flex items-center h-full px-6">
            <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} `}>Panel Admin</h1>
            <UserSettings/>
          </div>
        </header>

        {/* Contenido */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;